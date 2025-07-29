
import React, { useMemo, useState, Fragment } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { TbChevronsRight } from "react-icons/tb";
import ExpandableComponent from "./ExpandableComponent";

const ReactTable = ({
  dataRows = [],
  dataColumns = [],
  tableId = "react-table",
  expanderEnabled = true,
  expanderColumnWidth = 50,
  columnVisibility,
  onColumnVisibilityChange,
}) => {
  const data = useMemo(() => dataRows, [dataRows]);
  const [expanded, setExpanded] = useState({});

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
    },
   
    onColumnVisibilityChange: onColumnVisibilityChange,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: false,
  });

  return (
    <div className="relative">
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
            <tbody className="text-content ">
              {table.getRowModel().rows.map((row, rowIndex) => (
                <Fragment key={row.id}>
                  <tr
                    className={`h-10 text-[12px] text-[#231F20E6] font-semibold w-full hover:bg-green-300 transition-colors duration-200 ${
                      rowIndex % 2 ? "bg-[#dde3ec]" : "bg-white"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                        <td
                            key={cell.id}
                            style={{ width: cell.column.getSize() || 150 }}
                            className="px-2"
                          >
                            <span className="flex items-center justify-center gap-1.5 line-clamp-1">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
    </div>
  );
};

export default ReactTable;


