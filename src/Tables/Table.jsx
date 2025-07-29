
import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import ReactTable from "./ReactTable";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "./Pagination";
import TableRowCountDisplay from "./TableRowCountDisplay";
import TableResponsiveColumnHider from "./TableResponsiveColumnHider";
import { axiosPrivate } from "../../api/axiosPrivate";
import { toast } from 'react-toastify';


import PageHeader from "./userManagement/PageHeader"
import TabNavlink from "./userManagement/TabNavlink";


const Table = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [rows, setRows] = useState([]);
    const [columnsFromAPI, setColumnsFromAPI] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [globalFilter, setGlobalFilter] = useState("");
    const [activeFilters, setActiveFilters] = useState({});
    const [columnVisibility, setColumnVisibility] = useState({});

    const resetFormRef = useRef({
        resetSearch: () => { },
        resetFilters: () => { },
    });

    const API_BASE_URL = "https://backend-test-gilt-eta.vercel.app/api/users";

    const fetchUsers = useCallback(async () => {
       
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("page", page.toString());
            params.append("limit", limit.toString());
            if (globalFilter) params.append("search", globalFilter);
            for (const key in activeFilters) {
                if (activeFilters[key]) params.append(key, activeFilters[key]);
            }

            const finalUrl = `${API_BASE_URL}?${params.toString()}`;
            const response = await axiosPrivate.get(finalUrl);
            const resData = response.data;

            setRows(resData.data);
            setColumnsFromAPI(resData.columns.users_header); 
            setTotalItems(resData.count || 0);

        } catch (err) {
            console.error("Failed to fetch users:", err);
            toast.error(err?.response?.data?.message || `Error`);
            setRows([]);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    }, [page, limit, globalFilter, activeFilters]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    
    const columns = useMemo(() => {
  
        if (!columnsFromAPI) return [];

      
        return columnsFromAPI.map((column) => {
            if (column.accessorKey === 'name') {
             
                return {
                    ...column, 
                    cell: ({ row }) => ( 
                        <TabNavlink
                            row={row}
                            value={row.original[column.accessorKey]}
                        />
                    ),
                };
            }
         
            return column;
        });
    }, [columnsFromAPI]); 
   


    const handleGlobalFilterChange = (filterText) => {
        setGlobalFilter(filterText);
        setPage(1);
    };

    const handleFilterChange = (filters) => {
        setActiveFilters(filters);
        setPage(1);
    };

    const handleReset = useCallback(() => {
    
        setPage(1);
        setLimit(10);
        setGlobalFilter("");
        setActiveFilters({});
        if (resetFormRef.current?.resetSearch) resetFormRef.current.resetSearch();
        if (resetFormRef.current?.resetFilters) resetFormRef.current.resetFilters();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen space-x-4">
                <div className="w-10 h-10 border-4 border-blue-900 border-dashed rounded-full animate-spin"></div>
                <span className="text-lg text-blue-900 font-medium">Loading...</span>
            </div>
        );
    }

    return (

        <div className="flex h-screen bg-gray-100">
  <div className="flex-1 flex flex-col overflow-x-auto p-0">

   <div className="flex justify-between items-center py-2 px-4 gap-4 flex-wrap">

   
     <div className="flex flex-row items-center gap-2 justify-between px-2 py-2  dark:bg-gray-900 rounded-lg  ring-1 ring-gray-200 dark:ring-gray-700 ">
  <PageHeader />
  <TableRowCountDisplay rowCount={totalItems} />
</div>
         
       <div className="ml-auto">
        <SearchAndFilter
          dataColumns={columns}
         onSearch={handleGlobalFilterChange}
         onFilter={handleFilterChange}
         onReset={handleReset}
         currentGlobalFilter={globalFilter}
         resetFormRef={resetFormRef}
       />
     </div>
   </div>

   {/* Table */}  
     <ReactTable
      dataColumns={columns}
    dataRows={rows}
      tableId="react-table"
       expanderColumnWidth={50}
       columnVisibility={columnVisibility}
     onColumnVisibilityChange={setColumnVisibility}
          />

    {/* Pagination */}
     <Pagination
       page={page}
       setPage={setPage}
       limit={limit}
      setLimit={setLimit}
      totalItems={totalItems}
    />
   </div>
      <TableResponsiveColumnHider
           dataColumns={columns}
           setColumnVisibility={setColumnVisibility}
           tableId="react-table"
          expanderColumnWidth={50}
        />
 </div>
       
    );
};

export default Table;




 