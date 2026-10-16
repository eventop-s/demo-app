'use client';

import { useEventopControls } from '@eventop/sdk/react';

export function TourStatusBar() {
  const { state, resume, cancel } = useEventopControls();
  const isPaused = state === 'paused';
  const isActive = !['idle', 'completed', 'cancelled', 'failed'].includes(state);

  if (!isActive && !isPaused) return null;

  return (
    <div className="tour-bar">
      <span>
        {isPaused ? '⏸ Tour paused' : '▶ Tour running'}
      </span>
      {isPaused && (
        <button className="tour-bar-btn resume" onClick={resume}>
          Resume
        </button>
      )}
      <button className="tour-bar-btn cancel" onClick={cancel}>
        End tour
      </button>
    </div>
  );
}
