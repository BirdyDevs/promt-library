import React from 'react';

function escapeHtml(s) {
  return s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
}

function tagChips(tags) {
  if (!tags) return null;
  return tags.split(',').map(t => t.trim()).filter(Boolean).slice(0,10)
    .map(t => <span className="tag" key={t}>{t}</span>);
}

export default function PromptCard({ prompt, onOpen, onCopy }) {
  return (
    <article className="prompt-card">
      <div style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'flex-start'}}>
        <div>
          <h3>{escapeHtml(prompt.title)}</h3>
          <div className="meta">
            <span className="pill">{escapeHtml(prompt.model || '–')}</span>
            <span className="pill">{escapeHtml((prompt.lang || '').toUpperCase())}</span>
            {prompt.usecase ? <span className="pill">{escapeHtml(prompt.usecase)}</span> : null}
          </div>
        </div>
        <div className="row-inline">
          <button className="btn secondary" onClick={() => onOpen(prompt.id)}>Öffnen</button>
          <button className="btn" onClick={() => onCopy(prompt.prompt)}>Kopieren</button>
        </div>
      </div>
      <div className="code" title="Prompt">{escapeHtml(prompt.prompt)}</div>
      {prompt.notes ? <div className="muted">{escapeHtml(prompt.notes)}</div> : null}
      <div className="row-inline">{tagChips(prompt.tags)}</div>
      <div className="muted" style={{fontSize:'.8rem'}}>Zuletzt aktualisiert: {new Date(prompt.updatedAt || prompt.createdAt).toLocaleString()}</div>
    </article>
  );
}
