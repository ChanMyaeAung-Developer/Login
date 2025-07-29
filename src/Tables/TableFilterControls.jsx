import React, { useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react'; // forwardRef နဲ့ 
import { FaFilter, FaTimes } from 'react-icons/fa';


const TableFilterControls = forwardRef(({ dataColumns, onFilterChange }, ref) => {
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [filters, setFilters] = useState({});
    const containerRef = useRef(null);

    const filterableColumns = useMemo(() => {
        return dataColumns.filter(column => column.filter && column.options && column.options.length > 0);
    }, [dataColumns]);

 
    useImperativeHandle(ref, () => ({
        clearFilters: () => {
           
            const cleared = {};
            filterableColumns.forEach(col => {
                cleared[col.accessorKey] = '';
            });
            setFilters(cleared); 
            onFilterChange({});
            
        }
    }));

    const handleValueChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleApplyFilters = () => {
        
        onFilterChange(filters); 
        setShowFilterDropdown(false);
    };

    const handleClearFilters = () => {
    
        const cleared = {};
        filterableColumns.forEach(col => {
            cleared[col.accessorKey] = '';
        });
        setFilters(cleared);
        onFilterChange({}); 
     
    };

    return (
        <div className="relative z-10" ref={containerRef}>
            {!showFilterDropdown && (
                <FaFilter
                    size={24}
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                    onClick={() => setShowFilterDropdown(true)}
                />
            )}

            {showFilterDropdown && (
                <div className="fixed top-0 right-0 h-screen min-w-[250px] bg-white border-l border-gray-300 shadow-lg p-4 rounded-l-md z-50 overflow-y-auto">
                    <div className="flex justify-end mb-2">
                        <button
                            onClick={() => setShowFilterDropdown(false)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {filterableColumns.length > 0 ? (
                        <>
                            {filterableColumns.map(column => (
                                <div key={column.accessorKey} className="mb-3">
                                    <label htmlFor={`filter-${column.accessorKey}`} className="block text-sm font-semibold text-gray-700 mb-1">
                                        {column.header}:
                                    </label>
                                    <select
                                        id={`filter-${column.accessorKey}`} // id ထည့်ပေးထားပါတယ်။
                                        value={filters[column.accessorKey] || ''}
                                        onChange={(e) => handleValueChange(column.accessorKey, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    >
                                        <option value="">All</option>
                                        {column.options.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                            {/* Buttons */}
                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    onClick={handleApplyFilters}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-sm"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    onClick={handleClearFilters}
                                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md text-sm"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500 text-sm">No filterable columns found.</p>
                    )}
                </div>
            )}
        </div>
    );
});

export default TableFilterControls;