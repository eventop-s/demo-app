'use client';


interface CanvasStageProps {
  selectedEl: string | null;
  onSelect: (id: string | null) => void;
}

const canvasElements = [
  {
    id: 'el-rect',
    style: {
      top: 120,
      left: 160,
      width: 160,
      height: 90,
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      borderRadius: 8,
    },
  },
  {
    id: 'el-circle',
    style: {
      top: 70,
      left: 380,
      width: 90,
      height: 90,
      background: 'linear-gradient(135deg, #10b981, #06b6d4)',
      borderRadius: '50%',
    },
  },
] as const;

export function CanvasStage({ selectedEl, onSelect }: CanvasStageProps) {
  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onSelect(null);
    }
  };

  const handleElementClick = (id: string) => {
    onSelect(id);
  };

  return (
      <div
        id="canvas-stage"
        className="canvas-stage"
        onClick={handleStageClick}
      >
        {canvasElements.map(el => (
          <div
            key={el.id}
            id={el.id}
            className={`canvas-el ${selectedEl === el.id ? 'selected' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={el.id === 'el-rect' ? 'Rectangle on canvas' : 'Circle on canvas'}
            aria-pressed={selectedEl === el.id}
            style={{
              position: 'absolute',
              cursor: 'pointer',
              border: '2px solid transparent',
              transition: 'border-color 0.15s',
              ...(selectedEl === el.id && { borderColor: '#6366f1' }),
              ...el.style,
            }}
            onClick={() => handleElementClick(el.id)}
            onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleElementClick(el.id); } }}
          />
        ))}
      </div>
  );
}
