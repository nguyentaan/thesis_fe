import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "../../ui/data-table-row-action";

export const productColumn = [
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Product ID" />
        ),
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "price",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "avg_rating",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Avg Rating" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),

    },
    {
        accessorKey: "rating_count",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Rating Count" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),

    },
    {
        accessorKey: "review_count",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Review Count" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),

    },
    {
        accessorKey: "category",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "color",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Color" />
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
