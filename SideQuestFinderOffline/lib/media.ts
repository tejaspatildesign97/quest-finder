'use client'

// Quest media (photos/videos) lives in IndexedDB — localStorage can't hold blobs.

const DB_NAME = 'sqf-media'
const STORE = 'media'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE, { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveMedia(blob: Blob): Promise<string> {
  const db = await openDB()
  const id = crypto.randomUUID()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.objectStore(STORE).put({ id, blob, type: blob.type })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  return id
}

export async function getMedia(id: string): Promise<{ blob: Blob; type: string } | null> {
  const db = await openDB()
  return new Promise(resolve => {
    const req = db.transaction(STORE, 'readonly').objectStore(STORE).get(id)
    req.onsuccess = () => resolve(req.result ? { blob: req.result.blob, type: req.result.type } : null)
    req.onerror = () => resolve(null)
  })
}

export async function getMediaURL(id: string): Promise<{ url: string; type: string } | null> {
  const m = await getMedia(id)
  return m ? { url: URL.createObjectURL(m.blob), type: m.type } : null
}

export async function deleteMedia(ids: string[]): Promise<void> {
  if (!ids.length) return
  const db = await openDB()
  await new Promise<void>(resolve => {
    const tx = db.transaction(STORE, 'readwrite')
    ids.forEach(id => tx.objectStore(STORE).delete(id))
    tx.oncomplete = () => resolve()
    tx.onerror = () => resolve()
  })
}

/** Downscale + JPEG-compress an image so the diary stays lightweight. */
export async function compressImage(file: File, maxDim = 1400, quality = 0.82): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  return new Promise(resolve =>
    canvas.toBlob(b => resolve(b ?? file), 'image/jpeg', quality)
  )
}

export const MAX_VIDEO_MB = 40
export const MAX_FILES = 4
