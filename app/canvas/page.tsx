'use client';

import { useState }         from 'react';
import { CanvasToolbar }    from '../../components/canvas/canvas-toolbar';
import { CanvasStage }      from '../../components/canvas/canvas-stage';
import { EffectsPanel }     from '../../components/canvas/effects-panel';
import { ExportPanel }      from '../../components/canvas/export-panel';

export default function CanvasPage() {
  const [selectedEl,  setSelectedEl]  = useState<string | null>(null);
  const [effectsOpen, setEffectsOpen] = useState(false);
  const [shadowOn,    setShadowOn]    = useState(false);
  const [blurOn,      setBlurOn]      = useState(false);

  const handleSelectEl = (id: string | null) => {
    setSelectedEl(id);
    if (!id) {
      setEffectsOpen(false);
      setShadowOn(false);
    }
  };

  const handleEffectsClick = () => {
    if (selectedEl) setEffectsOpen(prev => !prev);
  };

  const handleShadowToggle = () => {
    setShadowOn(prev => {
      const next = !prev;
      setTimeout(() => {
        document.getElementById('shadow-controls')
          ?.classList.toggle('visible', next);
      }, 0);
      return next;
    });
  };

  return (
      <div className="canvas-screen">
        <h1 className="sr-only">Canvas</h1>
        <CanvasToolbar
          effectsOpen={effectsOpen}
          onEffectsClick={handleEffectsClick}
        />

        <div className="canvas-body">
          <CanvasStage
            selectedEl={selectedEl}
            onSelect={handleSelectEl}
          />

          <div className="canvas-panel">
            {!selectedEl ? (
              <div className="no-selection">
                Click a shape to select it.
              </div>
            ) : (
              <EffectsPanel
                open={effectsOpen}
                shadowOn={shadowOn}
                blurOn={blurOn}
                onShadowToggle={handleShadowToggle}
                onBlurToggle={() => setBlurOn(prev => !prev)}
              />
            )}

            <ExportPanel />
          </div>
        </div>
      </div>
  );
}
