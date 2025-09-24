import React from 'react';
import styled from 'styled-components';
import ToolbarContainer from './ToolbarContainer';
import TaskFormContainer from './TaskFormContainer';
import TaskListContainer from './TaskListContainer';
import { AppProvider, AppContext } from '../state/context';
import { SPACING } from '../styles/tokens';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../styles/GlobalStyle';
import { lightTheme, darkTheme } from '../styles/theme';

export default function AppContainer() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

function App() {
  const { state } = React.useContext(AppContext);
  const theme = state?.prefs?.theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Shell>
        <ToolbarContainer />
        <TaskFormContainer />
        <TaskListContainer />
      </Shell>
    </ThemeProvider>
  );
}

const Shell = styled.main`
  height: --toolbar-height;
  max-width: 800px;
  margin: 0 auto;
  padding: ${SPACING['1x']};
`;
