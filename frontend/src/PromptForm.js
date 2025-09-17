import React, { useState, useEffect } from 'react';
import { now, uid } from './hooks';

const initialState = {
  id: '',
  title: '',
  prompt: '',
  notes: '',
  tags: '',
  model: 'GPT‑4o',
  lang: 'de',
  usecase: '',
  source: '',
  createdAt: '',
  updatedAt: ''
};

const modelOptions = [
  'GPT‑4o',
  'GPT‑5 Thinking',
  'Claude',
  'Llama',
  'Sonstiges'
];
const langOptions = ['de', 'en', 'es', 'fr'];

export default function PromptForm({
  value,
  onChange,
  onSave,
  onDelete,
  onCopy,
  onShare,
  onReset,
  status,
  setStatus
}) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (value) setForm(value);
    else setForm(initialState);
  }, [value]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (onChange) onChange({ ...form, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.prompt) {
      setStatus && setStatus({ label: 'Fehlende Pflichtfelder', kind: 'warn' });
      return;
    }
    const item = {
      ...form,
      id: form.id || uid(),
      createdAt: form.createdAt || now(),
      updatedAt: now()
    };
    onSave && onSave(item);
    setStatus && setStatus({ label: 'Gespeichert', kind: 'ok' });
  };

  const handleReset = () => {
    setForm(initialState);
    onReset && onReset();
    setStatus && setStatus({ label: 'Entwurf', kind: 'neutral' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={form.id} />
      <label htmlFor="title">Titel</label>
      <input type="text" name="title" id="title" required placeholder="z.B. Blogpost-Gliederung aus Stichpunkten" value={form.title} onChange={handleChange} />

      <div className="row">
        <div>
          <label htmlFor="model">Modell</label>
          <select name="model" id="model" value={form.model} onChange={handleChange}>
            {modelOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="lang">Sprache</label>
          <select name="lang" id="lang" value={form.lang} onChange={handleChange}>
            {langOptions.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <label htmlFor="tags">Tags (Komma‑getrennt)</label>
      <input type="text" name="tags" id="tags" placeholder="blog, marketing, ideation" value={form.tags} onChange={handleChange} />

      <label htmlFor="prompt">Prompt</label>
      <textarea name="prompt" id="prompt" placeholder="Schreibe hier deinen Prompt…" required value={form.prompt} onChange={handleChange} />

      <label htmlFor="notes">Notizen / Kontext (optional)</label>
      <textarea name="notes" id="notes" placeholder="Beispiel-Input, Einschränkungen, Personas…" value={form.notes} onChange={handleChange} />

      <div className="row">
        <div>
          <label htmlFor="usecase">Use‑Case</label>
          <input type="text" name="usecase" id="usecase" placeholder="z.B. Content, Code Review, Datenanalyse" value={form.usecase} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="source">Quelle (URL o.ä.)</label>
          <input type="text" name="source" id="source" placeholder="https://…" value={form.source} onChange={handleChange} />
        </div>
      </div>

      <div className="row-inline" style={{marginTop:10}}>
        <button className="btn ok" type="submit">Speichern</button>
        <button className="btn ghost" type="button" onClick={handleReset}>Leeren</button>
        <button className="btn warn" type="button" onClick={() => onDelete && onDelete(form.id)} title="Prompt löschen">Löschen</button>
        <button className="btn secondary" type="button" onClick={() => onCopy && onCopy(form.prompt)} title="Prompt in Zwischenablage">Prompt kopieren</button>
        <button className="btn" type="button" onClick={() => onShare && onShare(form)} title="Diesen Prompt als Link teilen">Teilen</button>
      </div>
    </form>
  );
}
