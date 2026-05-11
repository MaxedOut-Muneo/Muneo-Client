import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useDelayedUnmount } from './useDelayedUnmount';

describe('useDelayedUnmount', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('active가 true면 mounted를 true로 시작한다', () => {
    const { result } = renderHook(() => useDelayedUnmount(true, 200));
    expect(result.current).toBe(true);
  });

  it('active가 false면 mounted를 false로 시작한다', () => {
    const { result } = renderHook(() => useDelayedUnmount(false, 200));
    expect(result.current).toBe(false);
  });

  it('active가 true → false로 바뀌면 exitDurationMs 후에 mounted가 false가 된다', () => {
    const { result, rerender } = renderHook(({ active }) => useDelayedUnmount(active, 200), {
      initialProps: { active: true },
    });
    expect(result.current).toBe(true);

    rerender({ active: false });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(false);
  });

  it('active가 false → true로 바뀌면 즉시 mounted가 true가 된다', () => {
    const { result, rerender } = renderHook(({ active }) => useDelayedUnmount(active, 200), {
      initialProps: { active: false },
    });
    expect(result.current).toBe(false);

    rerender({ active: true });
    expect(result.current).toBe(true);
  });

  it('exit 중 다시 active가 true가 되면 타이머가 취소된다', () => {
    const { result, rerender } = renderHook(({ active }) => useDelayedUnmount(active, 200), {
      initialProps: { active: true },
    });

    rerender({ active: false });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe(true);

    rerender({ active: true });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe(true);
  });
});
