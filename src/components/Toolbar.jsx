import React from 'react';
import styled from 'styled-components';
import { SPACING } from '../styles/tokens';
import { List, Grid } from 'lucide-react';
import Button from './Button';

export default function Toolbar({
  themeMode,
  layoutMode,
  searchValue,
  onToggleTheme,
  onToggleLayout,
  onSearch,
}) {
  return (
    <Bar>
      <Title>To Do</Title>
      <Controls>
        <SearchInput
          aria-label="Search tasks"
          placeholder="Search…"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Button onClick={onToggleLayout} aria-label="Toggle list/grid view">
          {layoutMode === 'list' ? <List size={18} /> : <Grid size={18} />}
        </Button>
        <Button onClick={onToggleTheme} aria-label="Toggle color theme">
          {themeMode === 'dark' ? 'Dark' : 'Light'}
        </Button>
      </Controls>
    </Bar>
  );
}

const Bar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${SPACING['1x']};
  padding: 0 ${SPACING['0.5x']};
  height: var(--toolbar-h);
  position: sticky;
  top: 0;
  background: ${(p) => p.theme.colors.background};
  z-index: 10;
`;

const Title = styled.h1`
  margin: 0;
  color: ${(p) => p.theme.colors.text};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${SPACING['0.5x']};
`;

const SearchInput = styled.input`
  height: 27px;
  padding: ${SPACING['0.5x']};
  padding-left: ${SPACING['1x']};
  border-radius: ${(p) => p.theme.radii.md};
  border: 1px solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.surface};
  color: ${(p) => p.theme.colors.text};
  min-width: 160px;

  &:focus {
    outline: 2px solid ${(p) => p.theme.colors.primary};
  }
`;
