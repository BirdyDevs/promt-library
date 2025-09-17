// Prompt-Model und LocalStorage-Hooks für die App
import { useState, useCallback } from 'react';
import examplePrompts from './examples';

const LS_KEY = 'promptVault.v1';

export function usePrompts() {
  const [prompts, setPrompts] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(LS_KEY));
      if (stored && stored.length > 0) {
        return stored;
      }
      // If no stored prompts, load examples on first run
      localStorage.setItem(LS_KEY, JSON.stringify(examplePrompts));
      return examplePrompts;
    } catch {
      // If error parsing, load examples
      localStorage.setItem(LS_KEY, JSON.stringify(examplePrompts));
      return examplePrompts;
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
