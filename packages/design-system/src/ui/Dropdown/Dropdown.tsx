'use client';

import { useEffect, useRef, useState } from 'react';
import CaretDownIcon from '../../assets/icons/CaretDownIcon';
import { caret, caretOpen, optionItem, panel, trigger, wrapper } from './Dropdown.css';

export interface DropdownOption<T> {
  value: T;
  label: string;
}

export interface DropdownProps<T> {
  options: Array<DropdownOption<T>>;
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Dropdown = <T,>({
  options,
  value,
  onChange,
  placeholder = '선택',
  className,
  disabled,
}: DropdownProps<T>) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`${wrapper}${className ? ` ${className}` : ''}`}>
      <button
        type="button"
        className={trigger}
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selected?.label ?? placeholder}</span>
        <CaretDownIcon className={`${caret}${open ? ` ${caretOpen}` : ''}`} width={24} height={24} />
      </button>
      {open && (
        <ul className={panel} role="listbox">
          {options.map((opt) => (
            <li
              key={String(opt.value)}
              className={optionItem}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
