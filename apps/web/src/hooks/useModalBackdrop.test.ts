import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useModalBackdrop } from './useModalBackdrop';

const createMouseEvent = (target: EventTarget | null, currentTarget: EventTarget | null): React.MouseEvent =>
  ({
    target,
    currentTarget,
  }) as unknown as React.MouseEvent;

const dispatchKey = (key: string) => {
  document.dispatchEvent(new KeyboardEvent('keydown', { key }));
};

describe('useModalBackdrop', () => {
  it('ESC 키 입력 시 onClose가 호출된다', () => {
    const onClose = vi.fn();
    renderHook(() => useModalBackdrop(onClose));
    dispatchKey('Escape');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('ESC 외 다른 키는 onClose를 호출하지 않는다', () => {
    const onClose = vi.fn();
    renderHook(() => useModalBackdrop(onClose));
    dispatchKey('Enter');
    dispatchKey('a');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('언마운트 후에는 keydown 이벤트가 onClose를 호출하지 않는다', () => {
    const onClose = vi.fn();
    const { unmount } = renderHook(() => useModalBackdrop(onClose));
    unmount();
    dispatchKey('Escape');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('배경에서 mouseDown → click이 같이 발생하면 onClose가 호출된다', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useModalBackdrop(onClose));
    const backdrop = {} as EventTarget;

    result.current.backdropProps.onMouseDown(createMouseEvent(backdrop, backdrop));
    result.current.backdropProps.onClick(createMouseEvent(backdrop, backdrop));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('내부 컨텐츠에서 click이 발생하면 onClose가 호출되지 않는다', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useModalBackdrop(onClose));
    const backdrop = {} as EventTarget;
    const inside = {} as EventTarget;

    result.current.backdropProps.onMouseDown(createMouseEvent(inside, backdrop));
    result.current.backdropProps.onClick(createMouseEvent(inside, backdrop));

    expect(onClose).not.toHaveBeenCalled();
  });

  it('내부에서 mouseDown 후 배경에서 떼는 드래그는 onClose를 호출하지 않는다', () => {
    const onClose = vi.fn();
    const { result } = renderHook(() => useModalBackdrop(onClose));
    const backdrop = {} as EventTarget;
    const inside = {} as EventTarget;

    result.current.backdropProps.onMouseDown(createMouseEvent(inside, backdrop));
    result.current.backdropProps.onClick(createMouseEvent(backdrop, backdrop));

    expect(onClose).not.toHaveBeenCalled();
  });
});
