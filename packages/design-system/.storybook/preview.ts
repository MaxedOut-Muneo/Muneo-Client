import { lightTheme } from '../src/styles/theme.css';
import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => {
      if (typeof document !== 'undefined' && !document.documentElement.classList.contains(lightTheme)) {
        document.documentElement.classList.add(lightTheme);
      }
      return Story();
    },
  ],
};

export default preview;
