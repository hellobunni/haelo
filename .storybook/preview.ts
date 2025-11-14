import React from 'react'
import type { Preview } from '@storybook/nextjs-vite'
import '../src/styles/globals.css'
import { ThemeProvider } from '../src/components/providers/theme-provider'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: '', color: '#ffffff' },
        { name: 'dark', class: 'dark', color: '#000000' },
      ],
    },
  },
  decorators: [
    (Story) => (
      React.createElement(ThemeProvider, { attribute: "class", defaultTheme: "light", enableSystem: false },
        React.createElement('div', { className: "min-h-screen bg-background text-foreground" },
          React.createElement(Story)
        )
      )
    ),
  ],
};

export default preview;