import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "../../ui/data-table-row-action";

export const fileColumn = [
    {
        accessorKey: "_id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="File ID" />
        ),
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "file_name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="File Name" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "file_type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="File Type" />
        ),
        enableSorting: false,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),
    },
    {
        accessorKey: "create_date",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created At" />
        ),
        enableSorting: true,
        cell: ({ cell }) => (
            <p className="font-medium">{cell.getValue()}</p>
        ),

    },
    {
        accessorKey: "chunk_lists",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Chunk Lists" />
        ),
        cell: ({ cell }) => {
            const chunkListArray = cell.getValue(); // This retrieves the chunk_lists array
            return (
                <p className="font-medium">{Array.isArray(chunkListArray) ? chunkListArray.length : 0}</p>
            );
        },
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
