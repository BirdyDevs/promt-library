import React from 'react';

export default function Toolbar({ onExport, onImport, onNew }) {
  return (
    <div className="toolbar">
      <button className="btn secondary" onClick={onExport} title="Alle Prompts als JSON exportieren">Export JSON</button>
      <button className="btn secondary" onClick={onImport} title="Prompts aus JSON importieren">Import JSON</button>
      <button className="btn" onClick={onNew}>Neuer Prompt</button>
    </div>
  );
}
