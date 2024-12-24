import { MoreHorizontal } from "lucide-react";

import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from "./dropdown-menu";
import { TrashIcon, Pencil1Icon, ViewNoneIcon } from "@radix-ui/react-icons";
import { CustomPopoverConfirm } from "./custom-popver-confirm";
import useTableAction from "../../hooks/use-table-action";

export function DataTableRowActions({ row, actions }) {
    const { onEdit, onDelete } = useTableAction();
    // const task = taskSchema.parse(row.original);

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted bg-white"
                >
                    <MoreHorizontal />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] bg-white">
                {actions?.includes("edit") && (
                    <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
                        Edit
                        <DropdownMenuShortcut>
                            <Pencil1Icon />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                )}
                {actions?.includes("view") && (
                    <DropdownMenuItem onClick={() => onEdit?.(row.original)}>
                        View
                        <DropdownMenuShortcut>
                            <ViewNoneIcon />
                        </DropdownMenuShortcut>
                    </DropdownMenuItem>
                )}
                {actions?.includes("delete") && (
                    <CustomPopoverConfirm
                        button={
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                            >
                                Delete
                                <DropdownMenuShortcut>
                                    <TrashIcon />
                                </DropdownMenuShortcut>
                            </DropdownMenuItem>
                        }
                        onConfirm={() => onDelete?.(row.original)}
                    />
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
