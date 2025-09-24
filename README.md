# Todo App

Welcome to the Todo App! This project is a modern, responsive React application for managing tasks. This guide will help you get started as a developer and understand the design principles used in the app.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

### Installation

Download Node.js from [https://nodejs.org/en/download]

Open the installer and follow the instructions

Verify the Node.js version:

```sh
node -v
```

Verify npm version:

```sh
npm -v
```

Clone the repository and install dependencies:

```sh
git clone <repo-url>
cd todo-app
npm install
```

### Running the App

Start the development server:

```sh
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```sh
npm run build
```

The production build will be in the `build/` directory.

## Project Structure

- `src/` — Main source code
  - `components/` — Reusable UI components (TaskCard, Button, Toolbar, etc.)
  - `containers/` — Stateful containers for app sections
  - `state/` — Context, reducer, and actions for global state management
  - `styles/` — Global styles, theme, and design tokens
- `public/` — Static files and HTML template

## Design Principles

- **Responsive UI:** Uses CSS Grid, Flexbox, and media queries for mobile-friendly layouts. All major components adapt to different screen sizes.
- **Reusable Components:** Common UI elements like `Button` are abstracted for consistency and maintainability.
- **Accessibility:** Buttons and inputs use proper aria-labels and keyboard navigation is supported.
- **State Management:** Uses React Context and Reducer for predictable state updates.
- **Theming:** Supports light and dark themes via styled-components and design tokens.

## Contributing & Development Notes

- Follow the existing component and container structure for new features.
- Add new styles to `GlobalStyle.js` or use design tokens from `styles/tokens.js`.
- Test UI changes on multiple device sizes for responsiveness.
- Commit changes with clear messages and follow code style (Prettier, ESLint).

## Troubleshooting

- If you encounter issues, check your Node.js and npm versions.
- For style or build errors, run `npm run lint` and `npm run format`.
