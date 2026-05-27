import { render } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useInView } from './useInView';

type ObserverCallback = (entries: IntersectionObserverEntry[]) => void;

interface ObserverHandle {
  callback: ObserverCallback;
  observe: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
}

const observers: ObserverHandle[] = [];

class MockIntersectionObserver {
  callback: ObserverCallback;
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds = [];

  constructor(callback: ObserverCallback) {
    this.callback = callback;
    observers.push({ callback, observe: this.observe, disconnect: this.disconnect });
  }
}

const trigger = (index: number, isIntersecting: boolean) => {
  const entry = { isIntersecting } as IntersectionObserverEntry;
  act(() => {
    observers[index].callback([entry]);
  });
};

interface TestProps {
  triggerOnce?: boolean;
}

const Target = ({ triggerOnce = true }: TestProps) => {
  const { ref, inView } = useInView<HTMLDivElement>({ triggerOnce });
  return <div ref={ref} data-testid="target" data-in-view={inView ? 'true' : 'false'} />;
};

describe('useInView', () => {
  beforeEach(() => {
    observers.length = 0;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('마운트 시 IntersectionObserver가 ref 요소를 observe한다', () => {
    const { getByTestId } = render(<Target />);
    expect(observers).toHaveLength(1);
    expect(observers[0].observe).toHaveBeenCalledWith(getByTestId('target'));
    expect(getByTestId('target').dataset.inView).toBe('false');
  });

  it('intersect 시 inView가 true가 된다', () => {
    const { getByTestId } = render(<Target />);
    trigger(0, true);
    expect(getByTestId('target').dataset.inView).toBe('true');
  });

  it('triggerOnce=true (default)면 intersect 후 observer가 disconnect된다', () => {
    render(<Target />);
    trigger(0, true);
    expect(observers[0].disconnect).toHaveBeenCalled();
  });

  it('triggerOnce=false면 intersect 토글에 따라 inView가 바뀐다', () => {
    const { getByTestId } = render(<Target triggerOnce={false} />);
    trigger(0, true);
    expect(getByTestId('target').dataset.inView).toBe('true');
    trigger(0, false);
    expect(getByTestId('target').dataset.inView).toBe('false');
  });

  it('언마운트 시 observer가 disconnect된다', () => {
    const { unmount } = render(<Target />);
    unmount();
    expect(observers[0].disconnect).toHaveBeenCalled();
  });
});
