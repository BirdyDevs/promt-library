// Prompt-Model und LocalStorage-Hooks für die App
import { useState, useCallback } from 'react';

const LS_KEY = 'promptVault.v1';

export function usePrompts() {
  const [prompts, setPrompts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY)) || [];
    } catch {
      return [];
    }
  });

  // Hilfsfunktionen
  const writeAll = useCallback((items) => {
    setPrompts(items);
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, []);

  const upsert = useCallback((item) => {
    let items = [...prompts];
    const i = items.findIndex(x => x.id === item.id);
    if (i > -1) items[i] = item;
    else items.unshift(item);
    writeAll(items);
    return item;
  }, [prompts, writeAll]);

  const remove = useCallback((id) => {
    writeAll(prompts.filter(x => x.id !== id));
  }, [prompts, writeAll]);

  const reset = useCallback(() => {
    writeAll([]);
  }, [writeAll]);

  return { prompts, setPrompts: writeAll, upsert, remove, reset };
}

// Hilfsfunktionen für IDs und Zeitstempel
export function now() {
  return new Date().toISOString();
}
export function uid() {
  return window.crypto?.randomUUID ? window.crypto.randomUUID() : 'id-' + Math.random().toString(36).slice(2);
}
