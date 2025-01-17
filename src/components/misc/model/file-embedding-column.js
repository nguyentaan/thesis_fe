import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DataTableRowActions } from "../../ui/data-table-row-action";

export const fileEmbeddingColumn = (handleFileSelect, selectedFiles) => [
  {
    accessorKey: "_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File ID" />
    ),
    cell: ({ cell }) => <p className="font-medium">{cell.getValue()}</p>,
  },
  {
    accessorKey: "file_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File Name" />
    ),
    enableSorting: false,
    cell: ({ cell }) => <p className="font-medium">{cell.getValue()}</p>,
  },
  {
    accessorKey: "file_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="File Type" />
    ),
    enableSorting: false,
    cell: ({ cell }) => <p className="font-medium">{cell.getValue()}</p>,
  },
  {
    accessorKey: "create_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    enableSorting: true,
    cell: ({ cell }) => <p className="font-medium">{cell.getValue()}</p>,
  },
  {
    accessorKey: "chunk_lists",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Chunk Lists" />
    ),
    cell: ({ cell }) => {
      const chunkListArray = cell.getValue();
      return <p className="font-medium">{Array.isArray(chunkListArray) ? chunkListArray.length : 0}</p>;
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    cell: ({ row }) => <DataTableRowActions actions={["view", "delete"]} row={row} />,
  },
  {
    accessorKey: "select",
    header: () => <input type="checkbox" disabled />,
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={selectedFiles.some((item) => item._id === row.original._id)} // Check if row data is in selectedFiles
        onChange={(e) => handleFileSelect(row.original, e.target.checked)} // Pass the whole row to handleFileSelect
      />
    ),
  },
];
