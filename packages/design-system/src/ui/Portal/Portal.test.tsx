import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Portal } from './Portal';

describe('Portal', () => {
  it('renders children into document body by default', () => {
    render(
      <Portal>
        <div>portal content</div>
      </Portal>
    );

    expect(screen.getByText('portal content').parentElement).toBe(document.body);
  });

  it('renders children into custom container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <div>custom portal content</div>
      </Portal>
    );

    expect(container).toContainElement(screen.getByText('custom portal content'));
    container.remove();
  });
});
