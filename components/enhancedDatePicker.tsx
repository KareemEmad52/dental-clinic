import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format, setMonth, setYear } from "date-fns";
import { Calendar } from "./ui/calendar";
import { useState } from "react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface EnhancedDatePickerProps {
  onDateChange?: (date: Date | undefined) => void;
  date?: Date;
  className?: string;
  disabled?: boolean;
}

export const EnhancedDatePicker: React.FC<EnhancedDatePickerProps> = ({ 
  onDateChange, 
  date, 
  className,
  disabled 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(date || new Date());
  const [calendarDate, setCalendarDate] = useState<Date>(selectedDate);
  const [open, setOpen] = useState<boolean>(false);

  // Generate years (current year ± 100 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i);

  // Month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date ?? new Date());
    if (date) {
      setCalendarDate(date);
    }
    onDateChange?.(date);
    setOpen(false);
  };

  const handleMonthChange = (monthIndex: string) => {
    const newDate = setMonth(calendarDate, Number.parseInt(monthIndex));
    setCalendarDate(newDate);
  };

  const handleYearChange = (year: string) => {
    const newDate = setYear(calendarDate, Number.parseInt(year));
    setCalendarDate(newDate);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant="outline"
          className={cn(
            "w-full md:w-[240px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground",
            disabled && "cursor-not-allowed opacity-50",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <div className="flex gap-1 sm:gap-2">
            <Select
              value={calendarDate.getMonth().toString()}
              onValueChange={handleMonthChange}
              disabled={disabled}
            >
              <SelectTrigger className="h-8 w-[100px] sm:w-[110px] text-sm">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month, index) => (
                  <SelectItem key={month} value={index.toString()}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={calendarDate.getFullYear().toString()}
              onValueChange={handleYearChange}
            >
              <SelectTrigger className="h-8 w-[80px] sm:w-[90px] text-sm">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          month={calendarDate}
          onMonthChange={setCalendarDate}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
};