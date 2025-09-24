import React from 'react';
import { AppContext } from '../state/context';
import { SET_THEME, SET_LAYOUT, SET_SEARCH } from '../state/actions';
import Toolbar from '../components/Toolbar';

export default function ToolbarContainer() {
  const { state, dispatch } = React.useContext(AppContext);
  const { theme, layout, searchQuery } = state.prefs;

  const [value, setValue] = React.useState(searchQuery);

  React.useEffect(() => {
    const id = setTimeout(() => {
      const trimmed = value.trim();
      if (trimmed !== searchQuery) {
        dispatch({ type: SET_SEARCH, payload: trimmed });
      }
    }, 150);
    return () => clearTimeout(id);
  }, [value, searchQuery, dispatch]);

  return (
    <Toolbar
      themeMode={theme}
      layoutMode={layout}
      searchValue={value}
      onToggleTheme={() =>
        dispatch({
          type: SET_THEME,
          payload: theme === 'dark' ? 'light' : 'dark',
        })
      }
      onToggleLayout={() =>
        dispatch({
          type: SET_LAYOUT,
          payload: layout === 'list' ? 'grid' : 'list',
        })
      }
      onSearch={(q) => setValue(q)}
    />
  );
}
