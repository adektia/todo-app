export const SPACING = {
  '0.5x': '4px',
  '1x': '8px',
  '1.5x': '12px',
  '2x': '16px',
  '3x': '24px',
  '4x': '32px',
};

export const RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
};

export const PALETTE = {
  light: {
    background: '#f8f9fa',
    surface: '#ffffff',
    text: '#212529',
    muted: '#6c757d',
    primary: '#007bff',
    secondary: '#6c757d',
    border: '#e5e7eb',
  },
  dark: {
    background: '#0b0f16',
    surface: '#121826',
    text: '#e5e7eb',
    muted: '#9ca3af',
    primary: '#60a5fa',
    secondary: '#94a3b8',
    border: '#1f2937',
  },
};

export const STATUS = {
  light: {
    todo: {
      bg: 'hsl(0 0% 96%)',
      fg: 'hsl(0 0% 30%)',
      bd: 'hsl(0 0% 85%)',
    },
    inProgress: {
      bg: 'hsl(34 100% 93%)',
      fg: 'hsl(30 70% 25%)',
      bd: 'hsl(34 80% 70%)',
    },
    done: {
      bg: 'hsl(120 50% 90%)',
      fg: 'hsl(120 40% 25%)',
      bd: 'hsl(120 40% 60%)',
    },
  },
  dark: {
    todo: {
      bg: 'hsl(0 0% 18%)',
      fg: 'hsl(0 0% 85%)',
      bd: 'hsl(0 0% 30%)',
    },
    inProgress: {
      bg: 'hsl(34 35% 22%)',
      fg: 'hsl(34 85% 80%)',
      bd: 'hsl(34 45% 35%)',
    },
    done: {
      bg: 'hsl(140 25% 20%)',
      fg: 'hsl(140 65% 80%)',
      bd: 'hsl(140 35% 35%)',
    },
  },
};

export const FONTS = {
  body: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  heading: 'Georgia, serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

export const FONT_SIZES = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
};
