import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";

interface CalendarPickerProps {
    date: Date,
    setDate: Dispatch<SetStateAction<Date>>,
    disabled: boolean
}

export default function CalendarPicker({date, setDate, disabled=false}: CalendarPickerProps) {

    return <Popover>
    <PopoverTrigger asChild>
      <Button
        disabled={disabled}
        variant={"outline"}
        className={cn(
          "w-72 justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "PPP") : <span>Pick a date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        initialFocus
      />
    </PopoverContent>
  </Popover>
}