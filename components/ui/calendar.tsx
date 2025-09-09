'use client';

import * as React from 'react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { cn } from '@/lib/utils';

export type CalendarProps = DayPickerProps & {
  className?: string;
};

export function Calendar(props: CalendarProps) {
  return (
    <DayPicker
      className={cn('p-2', props.className)}
      showOutsideDays={props.showOutsideDays ?? true}
      fixedWeeks={props.fixedWeeks ?? true}
      captionLayout={props.captionLayout ?? 'dropdown'}
      {...props}
    />
  );
}

export default Calendar;