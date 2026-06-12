/* eslint-disable @next/next/no-img-element */
// Illustrated avatars: DiceBear "big-smile" style (https://www.dicebear.com)
// Art by Ashley Seo, CC BY 4.0 — attribution kept in README.

interface AvatarProps {
  /** Either a DiceBear seed (e.g. "luna") or a legacy emoji */
  value: string
  size?: number
  className?: string
}

const isEmoji = (v: string) => /\p{Extended_Pictographic}/u.test(v)

export function avatarUrl(seed: string, size = 96) {
  return `https://api.dicebear.com/9.x/big-smile/svg?seed=${encodeURIComponent(seed)}&size=${size}&backgroundColor=transparent`
}

export default function Avatar({ value, size = 64, className = '' }: AvatarProps) {
  if (isEmoji(value)) {
    return (
      <span className={`flex items-center justify-center ${className}`} style={{ fontSize: size * 0.62, width: size, height: size }}>
        {value}
      </span>
    )
  }
  return (
    <img
      src={avatarUrl(value, size * 2)}
      alt="avatar"
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size }}
    />
  )
}
