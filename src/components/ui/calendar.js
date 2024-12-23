

import * as React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    disabled,
    ...props
}) {
    const [selected, setSelected] = useState();
    return (
        <DayPicker
            mode="range"
            selected={selected}
            onSelect={setSelected}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => (
                    <ChevronRight className="h-4 w-4" />
                ),
            }}
            {...props}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };
