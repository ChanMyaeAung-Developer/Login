import React, { useMemo, useState, useEffect, Fragment } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";

import TableFilterControls from "../TableFilterControls";
import TableRowCountDisplay from "../TableRowCountDisplay";
import TableResponsiveColumnHider from "../TableResponsiveColumnHider";
import ExpandableComponent from "../ExpandableComponent";
import Pagination from "../Pagination";

const ReactTable = ({
  dataRows = [],
  dataColumns = [],
  tableId = "react-table",
  expanderEnabled = true,
  expanderColumnWidth = 50,
  page,
  setPage,
  limit,
  setLimit,
  totalItems,
  onGlobalFilterChange,
  onFilterChange,
  currentGlobalFilter,
}) => {
  const data = useMemo(() => dataRows, [dataRows]);
  const [expanded, setExpanded] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [searchInput, setSearchInput] = useState(currentGlobalFilter || "");

  useEffect(() => {
    setSearchInput(currentGlobalFilter || "");
  }, [currentGlobalFilter]);

  const statusColorMap = {
    Completed: "bg-green-200 text-green-800",
    "OSS Cancel": "bg-red-200 text-red-800",
    "Order Cancel": "bg-yellow-200 text-red-900",
    "Site Assignment": "bg-blue-200 text-blue-800",
  };

  const prefixColumns = useMemo(() => {
    if (!expanderEnabled) return [];
    return [
      {
        id: "expander",
        size: expanderColumnWidth,
        enableHiding: false,
        header: ({ table }) => (
          <button
            onClick={table.getToggleAllRowsExpandedHandler()}
            className={`transition-transform duration-200 ease-in-out ${
              table.getIsAllRowsExpanded() ? "rotate-90" : "rotate-0"
            }`}
          >
            <TbChevronsRight />
          </button>
        ),
        cell: ({ row }) => (
          <button onClick={() => row.toggleExpanded()}>
            <TbChevronsRight
              className={`transition-transform duration-200 ease-in-out ${
                row.getIsExpanded() ? "rotate-90" : "rotate-0"
              }`}
            />
          </button>
        ),
      },
    ];
  }, [expanderEnabled, expanderColumnWidth]);

  const columns = useMemo(() => [...prefixColumns, ...dataColumns], [prefixColumns, dataColumns]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      expanded,
      globalFilter: currentGlobalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: false,
  });

  useEffect(() => {
    const defaultVisibility = {};
    dataColumns.forEach((col) => {
      defaultVisibility[col.accessorKey || col.id] = true;
    });
    setColumnVisibility(defaultVisibility);
  }, [dataColumns]);

  const handleFilterApply = (filters) => {
    if (onFilterChange) onFilterChange(filters);
    if (setPage) setPage(1);
  };

  const handleSearch = () => {
    if (onGlobalFilterChange) onGlobalFilterChange(searchInput);
    if (setPage) setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center py-2 px-4">
        <TableRowCountDisplay rowCount={table.getRowCount()} />

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => {
              const value = e.target.value;
              setSearchInput(value);
              if (value === "" && onGlobalFilterChange) {
                onGlobalFilterChange("");
                if (setPage) setPage(1);
              }
            }}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 rounded px-3 py-1 text-sm w-64"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded text-sm"
          >
            Search
          </button>
        </div>

        <TableFilterControls dataColumns={dataColumns} onFilterChange={handleFilterApply} />
      </div>

      <TableResponsiveColumnHider
        dataColumns={dataColumns}
        setColumnVisibility={setColumnVisibility}
        tableId={tableId}
        expanderColumnWidth={expanderColumnWidth}
      />

      {data?.length > 0 ? (
        <div className="p-4" id={tableId}>
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <thead className="sticky top-0 bg-gradient-to-b from-blue-100 to-blue-300 text-green-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="h-12 text-sm uppercase font-semibold">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      scope="col"
                      style={{ width: header.getSize() || 150 }}
                      className="px-3 py-2 text-center"
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="text-content">
              {table.getRowModel().rows.map((row, rowIndex) => (
                <Fragment key={row.id}>
                  <tr
                    className={`h-10 text-[12px] text-[#231F20E6] font-semibold w-full ${
                      rowIndex % 2 ? "bg-[#F1F5FB]" : "bg-white"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        style={{ width: cell.column.getSize() || 150 }}
                        className="px-2"
                      >
                        <span className="flex items-center justify-center gap-1.5 line-clamp-1">
                          {cell.column.id === "installation_status" ? (
                            <span
                              className={`p-1 rounded text-sm font-medium ${
                                statusColorMap[row.original.installation_status] ||
                                "bg-transparent text-gray-800"
                              }`}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </span>
                          ) : (
                            flexRender(cell.column.columnDef.cell, cell.getContext())
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {row.getIsExpanded() && (
                    <tr>
                      <td
                        colSpan={row.getVisibleCells().length}
                        className="p-4 border-t bg-white"
                      >
                        <ExpandableComponent
                          rowData={row.original}
                          hiddenColumns={Object.keys(columnVisibility).filter(
                            (key) => columnVisibility[key] === false
                          )}
                          columnMeta={dataColumns}
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <p className="text-gray-500">No data available.</p>
        </div>
      )}

      {/* ✅ Pagination Component integrated here */}
      <Pagination
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalItems={totalItems}
      />
    </div>
  );
};

export default ReactTable;
