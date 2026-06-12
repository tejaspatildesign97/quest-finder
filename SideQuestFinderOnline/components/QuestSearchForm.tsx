'use client';

import { useState } from 'react';
import { Input } from './ui/Input';
import Button from './ui/Button';
import Badge from './ui/Badge';

const categories = ['All', 'Outdoor', 'Creative', 'Social', 'Learning', 'Fitness', 'Food'];
const difficulties = ['Any', 'Easy', 'Medium', 'Hard', 'Legendary'];

interface QuestSearchFormProps {
  onSearch: (params: { query: string; category: string; difficulty: string }) => void;
  loading?: boolean;
}

export default function QuestSearchForm({ onSearch, loading }: QuestSearchFormProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('Any');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, category, difficulty });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="What adventure do you seek?"
        placeholder="e.g. explore a hidden park, learn pottery..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        icon={<span>🔍</span>}
      />

      <div className="space-y-2">
        <p className="text-xs font-bold tracking-wide uppercase text-[var(--ink)]">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 text-xs font-bold rounded-sm border-2 transition-all duration-150
                ${category === cat
                  ? 'bg-[var(--quest-gold)] border-[var(--ink)] text-[var(--ink)]'
                  : 'bg-transparent border-[var(--stone)] text-[var(--stone)] hover:border-[var(--quest-gold)]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-bold tracking-wide uppercase text-[var(--ink)]">Difficulty</p>
        <div className="flex flex-wrap gap-2">
          {difficulties.map(d => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`px-3 py-1 text-xs font-bold rounded-sm border-2 transition-all duration-150
                ${difficulty === d
                  ? 'bg-[var(--ink)] border-[var(--ink)] text-[var(--parchment)]'
                  : 'bg-transparent border-[var(--stone)] text-[var(--stone)] hover:border-[var(--ink)]'
                }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading} icon="⚔️">
        Find My Quest
      </Button>
    </form>
  );
}
