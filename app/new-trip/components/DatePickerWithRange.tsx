"use client";

import * as React from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { FaRegCircleXmark } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNewTripContext } from "@/app/new-trip/NewTripContext";

const DatePickerWithRange = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });
  const { dayCount, setDayCount } = useNewTripContext();

  const handleSelect = (range: DateRange | undefined) => {
    if (range?.from && range.to) {
      // Calculate the number of days in the range
      const calculatedDayCount =
        differenceInCalendarDays(range.to, range.from) + 1;

      // Ensure the range is no longer than 7 days
      if (calculatedDayCount > 7) {
        range.to = addDays(range.from, 6); // Set the maximum range to 7 days
        setDayCount(7);
      } else {
        setDayCount(calculatedDayCount);
      }
    } else if (range?.from) {
      setDayCount(1);
    } else {
      // If both dates are cleared, set dayCount to 0
      setDayCount(0);
    }

    setDate(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-auto justify-start text-left font-normal",
              !date && "text-muted-foreground",
              dayCount === 0 && "ring-1 ring-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to && date.from !== date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")} (
                  {dayCount === 7
                    ? "max"
                    : `${dayCount} ${dayCount === 1 ? "day" : "days"}`}
                  )
                </>
              ) : (
                <>
                  {format(date.from, "LLL dd, y")} (
                  {dayCount === 7
                    ? "max"
                    : `${dayCount} ${dayCount === 1 ? "day" : "days"}`}
                  )
                </>
              )
            ) : (
              <span>Pick a date range (Max 7 days)</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={{ before: new Date() }}
          />

          <div className="w-full flex justify-center pb-1">
            Maximum range: 7 days
          </div>
        </PopoverContent>
      </Popover>

      {dayCount === 0 ? (
        <div className="text-red-500 text-sm flex gap-x-1 items-center">
          <FaRegCircleXmark />
          Please select a date
        </div>
      ) : null}
    </div>
  );
};

export default DatePickerWithRange;
