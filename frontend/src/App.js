
import React, { useState } from 'react';
import './App.css';


import Toolbar from './Toolbar';
import PromptForm from './PromptForm';
import PromptList from './PromptList';
import { usePrompts, now, uid } from './hooks';


function App() {
  const { prompts, setPrompts, upsert, remove, reset } = usePrompts();

  const [current, setCurrent] = useState(null); // aktueller Prompt im Formular
  const [status, setStatus] = useState({ label: 'Entwurf', kind: 'neutral' });
  const [search, setSearch] = useState('');
  const [filterModel, setFilterModel] = useState('');
  const [sort, setSort] = useState('updated_desc');

  // Toolbar-Handler
  const handleExport = () => {
    const data = JSON.stringify(prompts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'prompts.json';
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;
      const text = await file.text();
      try {
        const arr = JSON.parse(text);
        const nowIso = now();
        const items = Array.isArray(arr) ? arr : [];
        const existing = prompts;
        for (const it of items) {
          const dup = existing.find(x => x.title === it.title && x.prompt === it.prompt);
          it.id = dup ? dup.id : uid();
          it.createdAt = dup ? dup.createdAt : nowIso;
          it.updatedAt = nowIso;
          upsert(it);
        }
        setStatus({ label: `Import abgeschlossen (${items.length}) ✅`, kind: 'ok' });
      } catch {
        setStatus({ label: 'Ungültige Datei ❌', kind: 'warn' });
      }
    };
    input.click();
  };
  const handleNew = () => {
    setCurrent(null);
    setStatus({ label: 'Entwurf', kind: 'neutral' });
  };

  // PromptForm-Handler
  const handleSave = (item) => {
    upsert(item);
    setCurrent(item);
    setStatus({ label: 'Gespeichert', kind: 'ok' });
  };
  const handleDelete = (id) => {
    if (!id) return;
    if (window.confirm('Diesen Prompt wirklich löschen?')) {
      remove(id);
      setCurrent(null);
      setStatus({ label: 'Gelöscht', kind: 'warn' });
    }
  };
  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => setStatus({ label: 'Prompt kopiert ✅', kind: 'ok' }));
  };
  const handleShare = (item) => {
    if (!item.title || !item.prompt) {
      setStatus({ label: 'Bitte Titel & Prompt ausfüllen.', kind: 'warn' });
      return;
    }
    const payload = encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(item)))));
    const url = window.location.origin + window.location.pathname + '#share=' + payload;
    navigator.clipboard?.writeText(url).then(() => setStatus({ label: 'Link in Zwischenablage.', kind: 'ok' }));
  };
  const handleReset = () => {
    setCurrent(null);
    setStatus({ label: 'Entwurf', kind: 'neutral' });
  };

  // Handler für PromptCard
  const handleOpenPrompt = (id) => {
    const it = prompts.find(x => x.id === id);
    if (it) setCurrent(it);
    setStatus({ label: 'Bearbeitung', kind: 'neutral' });
  };

  // Modell-Filter-Optionen aus Prompts ableiten
  const modelOptions = Array.from(new Set(prompts.map(p => p.model))).filter(Boolean);

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
            <strong id="form-title">{current ? 'Prompt bearbeiten' : 'Prompt erstellen'}</strong>
            <div className="pill"><span id="status-dot" style={{ color: status.kind === 'ok' ? 'var(--ok)' : status.kind === 'warn' ? 'var(--danger)' : 'var(--brand)' }}>●</span><span id="status-text">{status.label}</span></div>
          </div>
          <div className="card-body">
            <PromptForm
              value={current}
              onChange={setCurrent}
              onSave={handleSave}
              onDelete={handleDelete}
              onCopy={handleCopy}
              onShare={handleShare}
              onReset={handleReset}
              status={status}
              setStatus={setStatus}
            />
            <div className="footer">Tipp: Mit <strong>Export JSON</strong> kannst du eine Datei sichern & mit anderen teilen. Über den <strong>Teilen</strong>-Button lässt sich ein einzelner Prompt als URL teilen (Hash‑Link).</div>
          </div>
        </section>

        {/* Prompt-Liste rechts */}
        <section className="card">
          <div className="card-header">
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap',width:'100%'}}>
              <input
                type="search"
                id="q"
                placeholder="Suchen nach Titel, Tags, Text… (⌘/Ctrl+K)"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <select
                id="filter-model"
                title="Nach Modell filtern"
                value={filterModel}
                onChange={e => setFilterModel(e.target.value)}
              >
                <option value="">Modell: alle</option>
                {modelOptions.map(opt => <option key={opt} value={opt}>Modell: {opt}</option>)}
              </select>
              <select
                id="sort"
                title="Sortierung"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                <option value="updated_desc">Neueste zuerst</option>
                <option value="title_asc">Titel A–Z</option>
                <option value="model_asc">Modell A–Z</option>
              </select>
              <button
                className="btn secondary"
                id="btn-clear-filters"
                onClick={() => { setSearch(''); setFilterModel(''); setSort('updated_desc'); }}
              >Filter zurücksetzen</button>
            </div>
          </div>
          <div className="card-body">
            <PromptList
              prompts={prompts}
              onOpen={handleOpenPrompt}
              onCopy={handleCopy}
              search={search}
              filterModel={filterModel}
              sort={sort}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
