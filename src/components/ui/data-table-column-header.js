import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./dropdown-menu";

export function DataTableColumnHeader({
    column,
    title,
    className,
}) {
    if (!column.getCanSort()) {
        return (
            <div className={cn(className)}>
                <Button
                    variant="ghost"
                    size="sm"
                    className="-ml-3 h-8 data-[state=open]:bg-accent gap-2"
                >
                    <span>{title}</span>
                </Button>
            </div>
        );
    }

    const handleSorting = (direction) => {
        if (direction === false) {
            column.clearSorting();
        } else {
            column.toggleSorting(direction === "desc");
        }
    };

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent gap-2"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ChevronDown size={16} />
                        ) : column.getIsSorted() === "asc" ? (
                            <ChevronUp size={16} />
                        ) : (
                            column.getIsSorted() === false && <ChevronsUpDown size={16} />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white shadow-md">
                    <DropdownMenuItem className="gap-2" onClick={() => handleSorting("asc")}>
                        <ChevronUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2" onClick={() => handleSorting("desc")}>
                        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2" onClick={() => handleSorting(false)}>
                        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                        None
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
