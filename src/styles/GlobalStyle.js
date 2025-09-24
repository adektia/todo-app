import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${(p) => (p.theme.mode === 'dark' ? 'dark' : 'light')};
  }

  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: ${(p) => p.theme.fonts.body};
    background: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a { color: ${(p) => p.theme.colors.primary}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  

  @media (max-width: 600px) {
    html, body, #root {
      font-size: 16px;
    }
    body {
      padding: 0 4px;
    }
    h1, h2, h3, h4 {
      font-size: clamp(1.2rem, 5vw, 2rem);
    }
    button, input, textarea {
      font-size: 1rem;
      min-width: 44px;
      min-height: 36px;
    }
    .task-card, .toolbar, .container {
      padding: 8px;
      flex-direction: column !important;
      gap: 8px !important;
    }
    .task-list, .task-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;
