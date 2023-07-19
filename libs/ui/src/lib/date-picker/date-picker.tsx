'use client';

import { FC, ReactNode } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '../button/button';
import { Popover, PopoverTrigger, PopoverContent } from '../popover/popover';
import { cn } from '../utils';
import { Calendar, CalendarProps } from '../calendar/calendar';

export interface DatePickerProps {
  label: ReactNode;
  calendarProps: CalendarProps;
}

export const DatePicker: FC<DatePickerProps> = ({
  label = 'Pick a date',
  calendarProps = {
    mode: 'single',
  },
}) => {
  const value = calendarProps.selected;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar {...calendarProps} />
      </PopoverContent>
    </Popover>
  );
};
