import React, { useMemo } from 'react';
import PromptCard from './PromptCard';

export default function PromptList({
  prompts,
  onOpen,
  onCopy,
  search,
  filterModel,
  sort
}) {
  // Filter, Suche, Sortierung
  const filtered = useMemo(() => {
    let items = prompts;
    if (search) {
      const q = search.trim().toLowerCase();
      items = items.filter(it => {
        const hay = [it.title, it.prompt, it.tags, it.notes, it.usecase, it.model, it.lang].join(' ').toLowerCase();
        return hay.includes(q);
      });
    }
    if (filterModel) {
      items = items.filter(it => it.model === filterModel);
    }
    if (sort === 'title_asc') items = [...items].sort((a,b) => a.title.localeCompare(b.title));
    else if (sort === 'model_asc') items = [...items].sort((a,b) => (a.model||'').localeCompare(b.model||''));
    else items = [...items].sort((a,b) => new Date(b.updatedAt||b.createdAt) - new Date(a.updatedAt||a.createdAt));
    return items;
  }, [prompts, search, filterModel, sort]);

  if (!filtered.length) {
    return <div className="empty">Noch keine Prompts. Lege links den ersten an! ✨</div>;
  }

  return (
    <div className="list">
      {filtered.map(prompt => (
        <PromptCard key={prompt.id} prompt={prompt} onOpen={onOpen} onCopy={onCopy} />
      ))}
    </div>
  );
}
