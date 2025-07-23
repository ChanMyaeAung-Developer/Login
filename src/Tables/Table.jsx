

import { useEffect, useState, useCallback, useRef } from "react";
import ReactTable from "./ReactTable";
import SearchAndFilter from "./SearchAndFilter";
import Pagination from "./Pagination";
import TableRowCountDisplay from "./TableRowCountDisplay";
import TableResponsiveColumnHider from "./TableResponsiveColumnHider";
import { axiosPrivate } from "../../api/axiosPrivate";
import { toast } from 'react-toastify';

const Table = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
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

            if (globalFilter) {
                params.append("search", globalFilter);
            }

            for (const key in activeFilters) {
                if (activeFilters[key]) {
                    params.append(key, activeFilters[key]);
                }
            }

            const finalUrl = `${API_BASE_URL}?${params.toString()}`;
            console.log("Fetching data from URL:", finalUrl);

            const response = await axiosPrivate.get(finalUrl);
            const resData = response.data;

            setRows(resData.data);
            setColumns(resData.columns.users_header);
            setTotalItems(resData.count || 0);

        } catch (err) {
            console.error("Failed to fetch users:", err);
            toast.error(
                err?.response?.data?.message ||
                `Error with status ${err?.response?.status}`
            );
            setRows([]);
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    }, [page, limit, globalFilter, activeFilters]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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
        if (resetFormRef.current?.resetSearch) {
            resetFormRef.current.resetSearch();
        }
        if (resetFormRef.current?.resetFilters) {
            resetFormRef.current.resetFilters();
        }
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-xl font-semibold text-gray-700">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="flex-1 flex flex-col overflow-x-auto p-4">
                <SearchAndFilter
                    dataColumns={columns}
                    onSearch={handleGlobalFilterChange}
                    onFilter={handleFilterChange}
                    onReset={handleReset}
                    currentGlobalFilter={globalFilter}
                    resetFormRef={resetFormRef}
                />
                <div className="flex justify-between items-center py-2 px-4">
                    <TableRowCountDisplay rowCount={totalItems} />
                    <TableResponsiveColumnHider
                        dataColumns={columns}
                        setColumnVisibility={setColumnVisibility}
                        tableId="react-table"
                        expanderColumnWidth={50} 
                    />
                </div>
                
            
                <ReactTable
                    dataColumns={columns}
                    dataRows={rows}
                    tableId="react-table"
                    expanderColumnWidth={50}
                    columnVisibility={columnVisibility}
                    onColumnVisibilityChange={setColumnVisibility}
                />

                <Pagination
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    totalItems={totalItems}
                />
            </div>
        </div>
    );
};

export default Table;