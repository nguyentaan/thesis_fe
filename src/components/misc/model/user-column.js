import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "../../ui/data-table-row-action";

export const userColumns = [
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="User ID" />
        ),
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone Number" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "order_lists",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),

    },
    {
        accessorKey: "avatar",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Avatar" />
        ),
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => (
            <DataTableRowActions actions={["view", "delete"]} row={row} />
        ),
    },
];
