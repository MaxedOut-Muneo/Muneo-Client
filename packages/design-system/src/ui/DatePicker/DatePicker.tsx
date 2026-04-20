'use client';

import { useEffect, useRef, useState } from 'react';
import {
  calendarHeader,
  dayButton,
  dayButtonEmpty,
  dayButtonSelected,
  dayButtonToday,
  dayWrapper,
  dayWrapperInRange,
  dayWrapperRangeEnd,
  dayWrapperRangeStart,
  daysGrid,
  monthLabel,
  navButton,
  panel,
  trigger,
  triggerOpen,
  weekDay,
  weekDays,
  wrapper,
} from './DatePicker.css';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

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
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(startDate?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(startDate?.getMonth() ?? today.getMonth());
  const [selectingEnd, setSelectingEnd] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | undefined>();
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
        setSelectingEnd(false);
        setHoverDate(undefined);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = () => {
    if (disabled) {
      return;
    }
    setOpen((prev) => !prev);
    setSelectingEnd(false);
    setHoverDate(undefined);
  };

  const handleDayClick = (date: Date) => {
    if (!selectingEnd) {
      onChange?.(date, undefined);
      setSelectingEnd(true);
    } else {
      const [start, end] = startDate && date < startDate ? [date, startDate] : [startDate!, date];
      onChange?.(start, end);
      setSelectingEnd(false);
      setHoverDate(undefined);
      setOpen(false);
    }
  };

  const getDays = (): Array<Date | null> => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const days: Array<Date | null> = Array(firstDay).fill(null);
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(viewYear, viewMonth, i));
    }
    return days;
  };

  const getEffectiveEnd = () => (selectingEnd && hoverDate ? hoverDate : endDate);

  const isStart = (date: Date) => startDate !== undefined && isSameDay(date, startDate);
  const isEnd = (date: Date) => {
    const end = getEffectiveEnd();
    return end !== undefined && isSameDay(date, end);
  };
  const isInRange = (date: Date) => {
    const end = getEffectiveEnd();
    if (!startDate || !end) {
      return false;
    }
    const [from, to] = startDate <= end ? [startDate, end] : [end, startDate];
    return date > from && date < to;
  };

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const days = getDays();

  return (
    <div ref={ref} className={`${wrapper}${className ? ` ${className}` : ''}`}>
      <button
        type="button"
        className={`${trigger}${open ? ` ${triggerOpen}` : ''}`}
        onClick={handleOpen}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {displayText}
      </button>

      {open && (
        <div className={panel} role="dialog" aria-label="날짜 선택">
          <div className={calendarHeader}>
            <button type="button" className={navButton} onClick={prevMonth} aria-label="이전 달">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className={monthLabel}>
              {viewYear}년 {viewMonth + 1}월
            </span>
            <button type="button" className={navButton} onClick={nextMonth} aria-label="다음 달">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className={weekDays}>
            {WEEK_DAYS.map((d) => (
              <div key={d} className={weekDay}>
                {d}
              </div>
            ))}
          </div>

          <div className={daysGrid}>
            {days.map((date, i) => {
              if (!date) {
                return (
                  <div key={`empty-${i}`} className={dayWrapper}>
                    <button type="button" className={`${dayButton} ${dayButtonEmpty}`} tabIndex={-1} disabled />
                  </div>
                );
              }

              const selected = isStart(date) || isEnd(date);
              const inRange = isInRange(date);
              const isStartDay = isStart(date);
              const isEndDay = isEnd(date);
              const isToday = isSameDay(date, today);

              const wrapperCls = [
                dayWrapper,
                inRange ? dayWrapperInRange : '',
                isStartDay && (inRange || isEnd(date) || (selectingEnd && hoverDate && isSameDay(date, startDate!)))
                  ? dayWrapperRangeStart
                  : '',
                isEndDay && startDate && !isSameDay(date, startDate) ? dayWrapperRangeEnd : '',
              ]
                .filter(Boolean)
                .join(' ');

              const btnCls = [dayButton, selected ? dayButtonSelected : '', !selected && isToday ? dayButtonToday : '']
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={date.toISOString()}
                  className={wrapperCls}
                  onMouseEnter={() => selectingEnd && setHoverDate(date)}
                  onMouseLeave={() => selectingEnd && setHoverDate(undefined)}
                >
                  <button type="button" className={btnCls} onClick={() => handleDayClick(date)}>
                    {date.getDate()}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
