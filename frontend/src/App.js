
import React, { useState } from 'react';
import './App.css';
import Toolbar from './Toolbar';
import { usePrompts } from './hooks';

function App() {
  // Prompts-Logik (wird später erweitert)
  const { prompts, setPrompts, upsert, remove, reset } = usePrompts();

  // Toolbar-Handler (Platzhalter)
  const handleExport = () => {
    // TODO: Export-Logik
    alert('Export!');
  };
  const handleImport = () => {
    // TODO: Import-Logik
    alert('Import!');
  };
  const handleNew = () => {
    // TODO: Formular leeren
    alert('Neuer Prompt!');
  };

  return (
    <div className="wrap">
      <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,marginBottom:16}}>
        <div>
          <h1>🗂️ AI Prompt Katalog</h1>
          <div className="muted">Katalogisiere, durchsuche und <strong>teile</strong> Prompts. Alles läuft lokal im Browser (LocalStorage).</div>
        </div>
        <Toolbar onExport={handleExport} onImport={handleImport} onNew={handleNew} />
      </header>

      <div className="grid">
        {/* Editor links */}
        <section className="card" id="editor">
          <div className="card-header">
            <strong id="form-title">Prompt erstellen</strong>
            <div className="pill"><span id="status-dot">●</span><span id="status-text">Entwurf</span></div>
          </div>
          <div className="card-body">
            {/* PromptForm-Komponente folgt */}
            <div className="footer">Tipp: Mit <strong>Export JSON</strong> kannst du eine Datei sichern & mit anderen teilen. Über den <strong>Teilen</strong>-Button lässt sich ein einzelner Prompt als URL teilen (Hash‑Link).</div>
          </div>
        </section>

        {/* Prompt-Liste rechts */}
        <section className="card">
          <div className="card-header">
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',width:'100%'}}>
              {/* Suchfeld, Filter, Sortierung folgen */}
              <input type="search" id="q" placeholder="Suchen nach Titel, Tags, Text… (⌘/Ctrl+K)" />
              <select id="filter-model" title="Nach Modell filtern"><option value="">Modell: alle</option></select>
              <select id="sort" title="Sortierung">
                <option value="updated_desc">Neueste zuerst</option>
                <option value="title_asc">Titel A–Z</option>
                <option value="model_asc">Modell A–Z</option>
              </select>
              <button className="btn secondary" id="btn-clear-filters">Filter zurücksetzen</button>
            </div>
          </div>
          <div className="card-body">
            {/* PromptList-Komponente folgt */}
            <div id="list" className="list"></div>
            <div id="empty" className="empty" style={{display:'none'}}>Noch keine Prompts. Lege links den ersten an! ✨</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
