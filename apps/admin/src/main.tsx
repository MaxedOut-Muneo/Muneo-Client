import { lightTheme } from '@muneo/design-system';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryProvider } from './providers/QueryProvider';
import '@muneo/design-system/styles/global.css';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
);

document.documentElement.classList.add(lightTheme);
