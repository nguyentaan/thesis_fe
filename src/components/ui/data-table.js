

import React, { useState, useEffect, useContext } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "./data-table-pagination";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
    Table,
    TableRow,
    TableHeader,
    TableHead,
    TableCell,
    TableBody,
} from "./table";

import { DataTableToolbar } from "./data-table-toolbar";
import { TableActionContext } from "../../providers/table-action-provider";

export function DataTable({ columns, data, isLoading = false, pagination, extra }) {
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnFilters, setColumnFilters] = useState([]);
    const [sorting, setSorting] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination: {
                pageSize: pagination?.size || 10,
                pageIndex: pagination?.page || 0,
            },
        },
        rowCount: pagination?.total || 0,
        onPaginationChange: (updaterOrValue) => {
            const newPagination =
                typeof updaterOrValue === "function"
                    ? updaterOrValue({
                          pageSize: pagination?.size || 10,
                          pageIndex: pagination?.page || 0,
                      })
                    : updaterOrValue;

            pagination?.setCurrentPage?.(newPagination.pageIndex);
            pagination?.setPageSize?.(newPagination.pageSize);
        },
        autoResetPageIndex: false,
        manualPagination: true,
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    const { setSorting: setSortingTableAction } = useContext(TableActionContext) || {};

    useEffect(() => {
        if (setSortingTableAction) {
            setSortingTableAction(sorting);
        }
    }, [sorting, setSortingTableAction]);

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                {extra}
                <div className="flex-initial">
                    <DataTableToolbar table={table} />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} colSpan={header.colSpan}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <ReloadIcon className="w-4 h-4 animate-spin" />
                                        Loading...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination
                table={table}
                pageSizeOptions={pagination?.pageSizeOptions}
            />
        </div>
    );
}
