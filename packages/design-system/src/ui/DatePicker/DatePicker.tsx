'use client';

import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { panel, trigger, triggerOpen, wrapper } from './DatePicker.css';

registerLocale('ko', ko);

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export interface DatePickerProps {
  startDate?: Date;
  endDate?: Date;
  onChange?: (start: Date, end: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DatePicker = ({
  startDate,
  endDate,
  onChange,
  placeholder = '날짜를 선택하세요',
  className,
  disabled,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayText = startDate
    ? endDate
      ? `${formatDate(startDate)} ~ ${formatDate(endDate)}`
      : `${formatDate(startDate)} ~ `
    : placeholder;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (disabled) {setOpen(false);}
  }, [disabled]);

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (!start) {
      return;
    }
    onChange?.(start, end ?? undefined);
    if (end) {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className={`${wrapper}${className ? ` ${className}` : ''}`}>
      <button
        type="button"
        className={`${trigger}${open ? ` ${triggerOpen}` : ''}`}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {displayText}
      </button>

      {open && (
        <div className={panel} role="dialog" aria-label="날짜 선택">
          <ReactDatePicker
            inline
            selectsRange
            startDate={startDate ?? null}
            endDate={endDate ?? null}
            onChange={handleChange}
            locale="ko"
          />
        </div>
      )}
    </div>
  );
};
