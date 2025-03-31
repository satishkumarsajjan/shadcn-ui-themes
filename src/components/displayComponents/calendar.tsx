'use client';

import { addDays } from 'date-fns';
import { Card, CardContent } from '../ui/card';
import { Calendar } from '../ui/calendar';

const start = new Date(2023, 5, 5);

export function CardsCalendar() {
  return (
    <Card className='w-full'>
      <CardContent className='flex items-center justify-center p-1'>
        <Calendar
          numberOfMonths={1}
          mode='range'
          defaultMonth={start}
          selected={{
            from: start,
            to: addDays(start, 8),
          }}
        />
      </CardContent>
    </Card>
  );
}
