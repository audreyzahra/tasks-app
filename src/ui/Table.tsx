"use client"

import { useState, useMemo } from "react"
import {
    Table as ShadcnTable,
    TableHeader,
    TableRow,
    TableHead,
    TableBody
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon } from "lucide-react"

interface TableProps<T = any> {
    className?: string
    header: string[]
    data: T[]
    renderRow: (item: T, index: number) => React.ReactNode
    searchable?: boolean
    searchPlaceholder?: string
    searchKeys?: (keyof T)[]
    itemsPerPage?: number
    showPagination?: boolean
    statusFilterable?: boolean
    statusFilterKey?: keyof T
    statusFilterOptions?: { value: string; label: string }[]
}

export function Table<T = any>({
    className,
    header,
    data,
    renderRow,
    searchable = true,
    searchPlaceholder = "Search...",
    searchKeys,
    itemsPerPage: initialItemsPerPage = 10,
    showPagination = true,
    statusFilterable = false,
    statusFilterKey = "status" as keyof T,
    statusFilterOptions = [
        { value: "all", label: "All" },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
    ],
}: TableProps<T>) {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

    const filteredData = useMemo(() => {
        let result = data

        if (statusFilterable && statusFilter !== "all") {
            result = result.filter((item) => {
                const statusValue = item[statusFilterKey]
                return statusValue?.toString().toLowerCase() === statusFilter.toLowerCase()
            })
        }

        if (searchable && searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim()
            result = result.filter((item) => {
                if (searchKeys && searchKeys.length > 0) {
                    return searchKeys.some((key) => {
                        const value = item[key]
                        return value?.toString().toLowerCase().includes(query)
                    })
                }
                return Object.values(item as any).some((value) => {
                    if (typeof value === "string" || typeof value === "number") {
                        return value.toString().toLowerCase().includes(query)
                    }
                    return false
                })
            })
        }

        return result
    }, [data, searchQuery, statusFilter, searchable, searchKeys, statusFilterable, statusFilterKey])

    const paginatedData = useMemo(() => {
        if (!showPagination) {
            return filteredData
        }

        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return filteredData.slice(startIndex, endIndex)
    }, [filteredData, currentPage, itemsPerPage, showPagination])

    const totalPages = useMemo(() => {
        if (!showPagination) return 1
        return Math.ceil(filteredData.length / itemsPerPage) || 1
    }, [filteredData.length, itemsPerPage, showPagination])

    const handleSearchChange = (value: string) => {
        setSearchQuery(value)
        setCurrentPage(1)
    }

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value)
        setCurrentPage(1)
    }

    const handleItemsPerPageChange = (value: string) => {
        const newItemsPerPage = parseInt(value, 10)
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1) // Reset to first page when changing items per page
    }

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1))
    }

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
    }

    const startItem = showPagination && filteredData.length > 0 
        ? (currentPage - 1) * itemsPerPage + 1 
        : 0
    const endItem = showPagination 
        ? Math.min(currentPage * itemsPerPage, filteredData.length) 
        : filteredData.length

    return (
        <div className="space-y-4">
            {(searchable || statusFilterable) && (
                <div className="flex justify-end gap-4 items-center">
                    {statusFilterable && (
                        <div className="flex items-center gap-2">
                            <FilterIcon className="w-4 h-4 text-muted-foreground" />
                            <Select
                                value={statusFilter}
                                onChange={(e) => handleStatusFilterChange(e.target.value)}
                                className="w-40"
                            >
                                {statusFilterOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    )}

                    {searchable && (
                        <div className="w-1/4 relative flex">
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchQuery}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                    )}
                </div>
            )}

            <ShadcnTable className={className}>
                <TableHeader>
                    <TableRow>
                        {header.map((head, index) => (
                            <TableHead key={index}>
                                {head}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedData.length > 0 ? (
                        paginatedData.map((item, index) => renderRow(item, index))
                    ) : (
                        <TableRow>
                            <td colSpan={header.length} className="text-center py-8 text-muted-foreground">
                                No results found
                            </td>
                        </TableRow>
                    )}
                </TableBody>
            </ShadcnTable>

            {showPagination && (
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {startItem} to {endItem} of {filteredData.length} results
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-muted-foreground whitespace-nowrap">
                                Rows per page:
                            </label>
                            <Select
                                value={itemsPerPage.toString()}
                                onChange={(e) => handleItemsPerPageChange(e.target.value)}
                                className="w-20"
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </Select>
                        </div>
                    </div>
                    {totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeftIcon className="w-4 h-4" />
                                Previous
                            </Button>
                            <div className="text-sm">
                                Page {currentPage} of {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                                <ChevronRightIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}