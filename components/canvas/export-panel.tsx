'use client';

import { Button } from '../ui';

export function ExportPanel() {
  return (
      <div className="export-section">
        <div className="panel-label">Export</div>
        <Button variant="ghost" id="btn-export-png">
          🖼 PNG
        </Button>
        <Button variant="ghost" id="btn-export-svg">
          📐 SVG
        </Button>
        <Button variant="ghost" id="btn-export-pdf">
          📄 PDF
        </Button>
      </div>
  );
}
