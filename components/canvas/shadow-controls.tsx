'use client';

export function ShadowControls() {
  const handleBlurChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueEl = document.getElementById('blur-val');
    if (valueEl) valueEl.textContent = e.target.value;
  };

  return (
    <div id="shadow-controls" className="shadow-controls visible">
      <div className="slider-row">
        <label className="slider-label" htmlFor="shadow-blur"><span>Blur</span><span id="blur-val">8</span></label>
        <input id="shadow-blur" type="range" min="0" max="30" defaultValue="8" onChange={handleBlurChange} />
      </div>
      <div className="slider-row">
        <label className="slider-label" htmlFor="shadow-offset-x"><span>Offset X</span><span>4</span></label>
        <input id="shadow-offset-x" type="range" min="-20" max="20" defaultValue="4" />
      </div>
      <div className="slider-row">
        <label className="slider-label" htmlFor="shadow-offset-y"><span>Offset Y</span><span>6</span></label>
        <input id="shadow-offset-y" type="range" min="-20" max="20" defaultValue="6" />
      </div>
      <div className="slider-row">
        <label className="slider-label" htmlFor="shadow-opacity"><span>Opacity</span><span>50%</span></label>
        <input id="shadow-opacity" type="range" min="0" max="100" defaultValue="50" />
      </div>
    </div>
  );
}
