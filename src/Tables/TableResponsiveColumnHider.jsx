import { useLayoutEffect } from "react";

const TableResponsiveColumnHider = ({
  dataColumns,
  setColumnVisibility,
  tableId = "react-table", 
  expanderColumnWidth = 50, 
}) => {
  useLayoutEffect(() => {
    const handleResize = () => {
      const wrapper = document.getElementById(tableId);
      if (!wrapper) {
        console.warn(`Element with ID "${tableId}" not found for responsive column hiding.`);
        return;
      }

      const wrapperWidth = wrapper.offsetWidth;
      const allColumns = dataColumns.map((col) => ({
        accessor: col.accessorKey,
        width: col.width || 150, // Default column width if not specified
      }));

      let currentTotalWidth = expanderColumnWidth;
      const visibility = {};

      for (let i = 0; i < allColumns.length; i++) {
        const { accessor, width } = allColumns[i];
        if (currentTotalWidth + width <= wrapperWidth) {
          visibility[accessor] = true;
          currentTotalWidth += width;
        } else {
          visibility[accessor] = false;
        }
      }

      setColumnVisibility(visibility);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dataColumns, setColumnVisibility, tableId, expanderColumnWidth]); 

 
  return null;
};

export default TableResponsiveColumnHider;