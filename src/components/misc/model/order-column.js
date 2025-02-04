import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "../../ui/data-table-row-action";

export const orderColumn = [
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order ID" />
        ),
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "shipping_address",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shipping to" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "totalAmount",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Total" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),

    },
    {
        accessorKey: "items",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium text-center ">{cell.getValue().length }</p>
        ),

    },
    {
        accessorKey: "paymentMethod",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment Method" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),

    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
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
