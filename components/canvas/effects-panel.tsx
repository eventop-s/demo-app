'use client';

import { Toggle } from '../ui';
import { ShadowControls } from './shadow-controls';

interface EffectsPanelProps {
  open: boolean;
  shadowOn: boolean;
  blurOn: boolean;
  onShadowToggle: () => void;
  onBlurToggle: () => void;
}

export function EffectsPanel({
  open,
  shadowOn,
  blurOn,
  onShadowToggle,
  onBlurToggle,
}: EffectsPanelProps) {
  if (!open) return null;

  return (
    <div id="effects-panel" className="effects-panel open">
      <div className="panel-label">Effects</div>

      <div className="effect-row">
        <span className="effect-name">Drop Shadow</span>
        <Toggle id="shadow-toggle" label="Drop Shadow" on={shadowOn} onToggle={onShadowToggle} />
      </div>

      {/* Shadow controls: step 3 with nested sub-steps */}
      {shadowOn && <ShadowControls />}

      {/* Background blur */}
      <div className="effect-row" style={{ marginTop: 12 }}>
        <span className="effect-name">Background Blur</span>
        <Toggle id="blur-toggle" label="Background Blur" on={blurOn} onToggle={onBlurToggle} />
      </div>
    </div>
  );
}
