import React from 'react';
import { reducer, initialState } from './reducer';

const STORAGE_KEY = 'todoapp.v1';

export const AppContext = React.createContext();

function readLocal() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    const prefs = parsed?.prefs ?? {};
    const clean = {
      tasks: Array.isArray(parsed?.tasks) ? parsed.tasks : [],
      prefs: {
        theme: prefs.theme,
        layout: prefs.layout,
        searchQuery: '',
      },
    };
    return clean;
  } catch {
    return null;
  }
}

function writeLocal(state) {
  if (typeof window === 'undefined') return;
  const toPersist = {
    tasks: state.tasks,
    prefs: {
      theme: state.prefs.theme,
      layout: state.prefs.layout,
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toPersist));
}

export function AppProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState,
    (init) => readLocal() ?? init
  );

  React.useEffect(() => {
    writeLocal(state);
  }, [state.tasks, state.prefs.theme, state.prefs.layout]);

  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
