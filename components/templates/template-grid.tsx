'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from '../ui';

const templates = [
  { id: 'social',       emoji: '📱', name: 'Social Post',  size: '1080×1080' },
  { id: 'banner',       emoji: '🏷', name: 'Web Banner',   size: '1200×628'  },
  { id: 'logo',         emoji: '✦',  name: 'Logo Kit',     size: 'Multi'     },
  { id: 'presentation', emoji: '📊', name: 'Presentation', size: '16:9'      },
] as const;

export function TemplateGrid() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleApply = () => {
    if (selected) {
      router.push('/canvas');
    }
  };

  return (
    <>
        <div id="template-grid" className="grid">
          {templates.map(t => (
            <Card
              key={t.id}
              thumb={t.emoji}
              title={t.name}
              subtitle={t.size}
              selected={selected === t.id}
              onClick={() => setSelected(t.id)}
            />
          ))}
        </div>

      {selected && (
          <Button id="btn-apply-template" onClick={handleApply}>
            Apply template →
          </Button>
      )}
    </>
  );
}
