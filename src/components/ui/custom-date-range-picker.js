

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";

export function DatePickerWithRange({
  className,
  value: date,
  onChange,
  placeholder,
  disableFuture,
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className= "w-[60px] md:w-[250px] justify-start text-left font-normal text-muted-foreground" 
          >
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span className="hidden md:block">
                {placeholder ?? "Pick a date"}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onChange}
            numberOfMonths={2}
            disabled={disableFuture ? { after: new Date() } : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
