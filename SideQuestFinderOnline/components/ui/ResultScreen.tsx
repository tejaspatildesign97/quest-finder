'use client';

import { ReactNode } from 'react';
import Button from './Button';
import Badge from './Badge';

type ResultType = 'success' | 'failure' | 'reward' | 'empty';

interface Quest {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Legendary';
  category: string;
  xp: number;
  icon: string;
}

interface ResultScreenProps {
  type: ResultType;
  title: string;
  message: string;
  quests?: Quest[];
  onRetry?: () => void;
  onAccept?: (quest: Quest) => void;
  children?: ReactNode;
}

const difficultyBadge: Record<Quest['difficulty'], 'forest' | 'gold' | 'danger' | 'magic'> = {
  Easy:      'forest',
  Medium:    'gold',
  Hard:      'danger',
  Legendary: 'magic',
};

const resultConfig: Record<ResultType, { icon: string; bg: string; titleColor: string }> = {
  success: { icon: '🏆', bg: 'bg-[var(--forest)]/10 border-[var(--forest)]',    titleColor: 'text-[var(--forest)]' },
  failure: { icon: '💀', bg: 'bg-[var(--danger)]/10 border-[var(--danger)]',    titleColor: 'text-[var(--danger)]' },
  reward:  { icon: '✨', bg: 'bg-[var(--quest-gold)]/10 border-[var(--quest-gold)]', titleColor: 'text-[var(--ink)]' },
  empty:   { icon: '🗺️', bg: 'bg-[var(--stone)]/10 border-[var(--stone)]',      titleColor: 'text-[var(--stone)]' },
};

export default function ResultScreen({ type, title, message, quests = [], onRetry, onAccept, children }: ResultScreenProps) {
  const cfg = resultConfig[type];

  return (
    <div className={`border-2 rounded-sm p-5 ${cfg.bg}`}>
      <div className="text-center mb-4">
        <div className="text-5xl mb-2 float inline-block">{cfg.icon}</div>
        <h2 className={`text-xl font-bold ${cfg.titleColor}`}>{title}</h2>
        <p className="text-sm text-[var(--stone)] mt-1">{message}</p>
      </div>

      {quests.length > 0 && (
        <div className="space-y-3 mt-4">
          <div className="quest-divider text-xs uppercase tracking-widest">Available Quests</div>
          {quests.map((quest, i) => (
            <div key={i} className="bg-[var(--parchment)] border-2 border-[var(--parchment-dark)] rounded-sm p-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl float">{quest.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    <span className="font-bold text-sm">{quest.title}</span>
                    <Badge variant={difficultyBadge[quest.difficulty]}>{quest.difficulty}</Badge>
                  </div>
                  <p className="text-xs text-[var(--stone)] leading-relaxed">{quest.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="gold" icon="⚡">+{quest.xp} XP</Badge>
                    {onAccept && (
                      <Button size="sm" variant="secondary" onClick={() => onAccept(quest)}>
                        Accept
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {children}

      {onRetry && (
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm" onClick={onRetry}>
            🔄 Search Again
          </Button>
        </div>
      )}
    </div>
  );
}
