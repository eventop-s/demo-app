'use client';

import { Button, IconButton } from '../ui';

interface CanvasToolbarProps {
  effectsOpen: boolean;
  onEffectsClick: () => void;
}

export function CanvasToolbar({ effectsOpen, onEffectsClick }: CanvasToolbarProps) {
  return (
    <div className="canvas-toolbar" id="canvas-toolbar">
      <IconButton icon="T" label="Add text" id="btn-add-text" />

      <IconButton icon="🖼" label="Insert image" id="btn-insert-image" />

      <IconButton
        icon="✨"
        label="Effects"
        id="btn-effects"
        active={effectsOpen}
        onClick={onEffectsClick}
      />

      <div className="toolbar-sep" />

      <Button id="btn-export">Export</Button>

        <Button id="btn-share" variant="ghost">
          Share
        </Button>
    </div>
  );
}
