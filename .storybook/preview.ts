import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    a11y: {
      // Automatically run accessibility tests on every story
      test: 'todo',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark',  value: '#0f0f0f' },
        { name: 'surface', value: 'var(--surface)' },
      ],
    },
    layout: 'padded',
  },
}

export default preview
