import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTypingEffect } from './useTypingEffect';

describe('useTypingEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('enabled가 false면 즉시 전체 텍스트가 표시된다', () => {
    const { result } = renderHook(() => useTypingEffect('안녕하세요', false));
    expect(result.current.displayText).toBe('안녕하세요');
    expect(result.current.isTyping).toBe(false);
  });

  it('빈 문자열이면 isTyping이 false다', () => {
    const { result } = renderHook(() => useTypingEffect('', true));
    expect(result.current.displayText).toBe('');
    expect(result.current.isTyping).toBe(false);
  });

  it('enabled가 true면 시간 경과에 따라 점진적으로 텍스트가 표시된다', () => {
    const { result } = renderHook(() => useTypingEffect('hello', true));
    expect(result.current.displayText).toBe('');
    expect(result.current.isTyping).toBe(true);

    act(() => {
      vi.advanceTimersByTime(16);
    });
    expect(result.current.displayText).toBe('he');

    act(() => {
      vi.advanceTimersByTime(16);
    });
    expect(result.current.displayText).toBe('hell');

    act(() => {
      vi.advanceTimersByTime(16);
    });
    expect(result.current.displayText).toBe('hello');
    expect(result.current.isTyping).toBe(false);
  });

  it('타이핑이 완료되면 isTyping이 false가 된다', () => {
    const { result } = renderHook(() => useTypingEffect('hi', true));
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.displayText).toBe('hi');
    expect(result.current.isTyping).toBe(false);
  });

  it('text가 바뀌면 처음부터 다시 타이핑한다', () => {
    const { result, rerender } = renderHook(({ text }) => useTypingEffect(text, true), {
      initialProps: { text: 'abcd' },
    });
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current.displayText).toBe('abcd');

    rerender({ text: 'xyz' });
    expect(result.current.displayText).toBe('');
    act(() => {
      vi.advanceTimersByTime(16);
    });
    expect(result.current.displayText).toBe('xy');
  });

  it('언마운트 시 타이머가 정리된다', () => {
    const { result, unmount } = renderHook(() => useTypingEffect('abcdefg', true));
    act(() => {
      vi.advanceTimersByTime(16);
    });
    const snapshot = result.current.displayText;
    unmount();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.displayText).toBe(snapshot);
  });
});
