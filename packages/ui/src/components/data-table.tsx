
"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnOrderState,
  ColumnSizingState,
  getExpandedRowModel,
  ExpandedState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@amberops/ui/components/ui/table"
import { Button } from "@amberops/ui/components/ui/button"
import { Input } from "@amberops/ui/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@amberops/ui/components/ui/dropdown-menu"
import { Skeleton } from "@amberops/ui/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@amberops/ui/components/ui/select"
import { Checkbox } from "@amberops/ui/components/ui/checkbox"
import { Popover, PopoverTrigger, PopoverContent } from "@amberops/ui/components/ui/popover"
import { Label } from "@amberops/ui/components/ui/label"
import { Tooltip, TooltipContent, TooltipTrigger } from "@amberops/ui/components/ui/tooltip"
import { ScrollArea } from "@amberops/ui/components/ui/scroll-area"
import { FileDown, SlidersHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, List, LayoutGrid, GripVertical, ArrowUp, ArrowDown, ChevronDown } from "lucide-react"
import { ClearFilterIcon } from '@amberops/ui/components/icons';
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import * as XLSX from "xlsx"
import { cn } from "@amberops/lib/utils"

type ViewType = 'table' | 'card';
type DensityType = 'default' | 'comfortable' | 'compact';
type StyleType = 'default' | 'grid' | 'zebra' | 'minimal';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filterKey?: string
  isLoading?: boolean
  renderCard?: (item: TData) => React.ReactNode;
  renderSubComponent?: (row: TData) => React.ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterKey,
  isLoading = false,
  renderCard,
  renderSubComponent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [view, setView] = React.useState<ViewType>('table');
  const [density, setDensity] = React.useState<DensityType>('default');
  const [style, setStyle] = React.useState<StyleType>('default');
  const [columnSizing, setColumnSizing] = React.useState<ColumnSizingState>({});
  const [expanded, setExpanded] = React.useState<ExpandedState>({})

  const tableColumns = React.useMemo(() => {
    if (!renderSubComponent) return columns;
    
    const expanderColumn: ColumnDef<TData, TValue> = {
        id: 'expander',
        header: () => null,
        cell: ({ row }) => {
        return row.getCanExpand() ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={row.getToggleExpandedHandler()}
            className="h-6 w-6"
          >
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform',
                row.getIsExpanded() && 'rotate-180'
              )}
            />
          </Button>
        ) : null
      },
    }
    return [expanderColumn, ...columns];
  }, [columns, renderSubComponent])
  
  const initialColumnOrder = React.useMemo(() => tableColumns.map(c => (c as any).id || (c as any).accessorKey), [tableColumns]);
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(initialColumnOrder);
  const [draggedColumn, setDraggedColumn] = React.useState<string | null>(null);

  const table = useReactTable({
    data,
    columns: tableColumns,
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
      columnSizing,
      expanded,
    },
     getRowCanExpand: () => !!renderSubComponent,
  })

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    setDraggedColumn(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetColumnId: string) => {
    e.preventDefault();
    if (draggedColumn === null || draggedColumn === targetColumnId) {
      setDraggedColumn(null);
      return;
    }

    const currentOrder = table.getState().columnOrder;
    const draggedIndex = currentOrder.indexOf(draggedColumn);
    const targetIndex = currentOrder.indexOf(targetColumnId);
    
    const newOrder = [...currentOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedColumn);

    table.setColumnOrder(newOrder);
    setDraggedColumn(null);
  };
  
  const moveColumn = (columnId: string, direction: 'up' | 'down') => {
    const currentOrder = table.getState().columnOrder;
    const currentIndex = currentOrder.indexOf(columnId);
    const newOrder = [...currentOrder];
    
    const visibleColumnOrder = currentOrder.filter(id => table.getColumn(id)?.getIsVisible());
    const currentVisibleIndex = visibleColumnOrder.indexOf(columnId);

    if (direction === 'up' && currentVisibleIndex > 0) {
        const targetColumnId = visibleColumnOrder[currentVisibleIndex - 1];
        const targetIndex = newOrder.indexOf(targetColumnId);
        [newOrder[currentIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[currentIndex]];
    } else if (direction === 'down' && currentVisibleIndex < visibleColumnOrder.length - 1) {
        const targetColumnId = visibleColumnOrder[currentVisibleIndex + 1];
        const targetIndex = newOrder.indexOf(targetColumnId);
        [newOrder[currentIndex], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[currentIndex]];
    }
    
    table.setColumnOrder(newOrder);
  };


 const getHeaderFromColumn = (columnDef: ColumnDef<TData, TValue>): string => {
    if (typeof columnDef.header === 'string') {
        return columnDef.header;
    }
    if ((columnDef as any).accessorKey) {
        const result = (columnDef as any).accessorKey.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
    if (columnDef.id) {
        const result = columnDef.id.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
    return '';
};


  const exportToPDF = () => {
    const doc = new jsPDF();
    const visibleColumns = table.getVisibleFlatColumns()
        .map(col => col.columnDef)
        .filter((colDef: any) => colDef.id !== 'select' && colDef.id !== 'actions' && colDef.id !== 'expander');

    const tableHeaders = visibleColumns.map(colDef => getHeaderFromColumn(colDef));
    
    const tableData = table.getRowModel().rows.map(row => {
        return visibleColumns.map(colDef => {
            const cellValue = row.getValue((colDef as any).accessorKey || (colDef as any).id);
            if(cellValue instanceof Date) return cellValue.toLocaleString();
            if (typeof cellValue === 'object' && cellValue !== null) {
                return (cellValue as any).name || JSON.stringify(cellValue);
            }
            return String(cellValue ?? '');
        });
    });

    autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
    });
    doc.save("table_data.pdf");
  };

  const exportToExcel = () => {
     const visibleColumns = table.getVisibleFlatColumns()
        .map(col => col.columnDef)
        .filter((colDef: any) => colDef.id !== 'select' && colDef.id !== 'actions' && colDef.id !== 'expander');

    const tableHeaders = visibleColumns.map(colDef => getHeaderFromColumn(colDef));

    const tableData = table.getRowModel().rows.map(row => {
        const rowData: { [key: string]: any } = {};
        visibleColumns.forEach(colDef => {
            const header = getHeaderFromColumn(colDef);
            const cellValue = row.getValue((colDef as any).accessorKey || (colDef as any).id);
            if (typeof cellValue === 'object' && cellValue !== null) {
                 rowData[header] = (cellValue as any).name || JSON.stringify(cellValue);
            } else {
                rowData[header] = cellValue;
            }
        });
        return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  const exportToCSV = () => {
    const visibleColumns = table.getVisibleFlatColumns()
        .map(col => col.columnDef)
        .filter((colDef: any) => colDef.id !== 'select' && colDef.id !== 'actions' && colDef.id !== 'expander');

    const tableHeaders = visibleColumns.map(colDef => getHeaderFromColumn(colDef));

    const csvRows = [tableHeaders.join(',')];

    table.getRowModel().rows.forEach(row => {
        const rowData = visibleColumns.map(colDef => {
            const cellValue = row.getValue((colDef as any).accessorKey || (colDef as any).id);
            let valueString = '';
            if (cellValue instanceof Date) {
                valueString = cellValue.toLocaleString();
            } else if (typeof cellValue === 'object' && cellValue !== null) {
                valueString = (cellValue as any).name || JSON.stringify(cellValue);
            } else {
                valueString = String(cellValue ?? '');
            }
            // Escape commas and quotes
            const sanitizedString = valueString.replace(/"/g, '""');
            if (sanitizedString.includes(',')) {
                return `"${sanitizedString}"`;
            }
            return sanitizedString;
        });
        csvRows.push(rowData.join(','));
    });

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
 const isFiltered = React.useMemo(() => {
    const hasColumnFilters = table.getState().columnFilters.length > 0;
    const pagination = table.getState().pagination;

    return hasColumnFilters || 
      table.getState().sorting.length > 0 ||
      density !== 'default' ||
      style !== 'default' ||
      Object.keys(table.getState().columnVisibility).length > 0 ||
      JSON.stringify(table.getState().columnOrder) !== JSON.stringify(initialColumnOrder) ||
      Object.keys(table.getState().rowSelection).length > 0 ||
      Object.keys(table.getState().columnSizing).length > 0 ||
      pagination.pageIndex !== 0 ||
      pagination.pageSize !== 10;
  }, [
    table.getState(), density, style, initialColumnOrder
  ]);

  const [isClearing, setIsClearing] = React.useState(false);
  const [showClearFilter, setShowClearFilter] = React.useState(false);

  React.useEffect(() => {
    if (isFiltered) {
        setShowClearFilter(true);
        setIsClearing(false);
    } else if (showClearFilter) {
        setIsClearing(true);
        setTimeout(() => {
            setShowClearFilter(false);
            setIsClearing(false);
        }, 200); // Should match animation duration
    }
  }, [isFiltered, showClearFilter]);

  const resetAll = () => {
    table.resetColumnFilters();
    if(filterKey) {
        (document.getElementById(`${filterKey}-filter-input`) as HTMLInputElement).value = '';
        table.getColumn(filterKey)?.setFilterValue("");
    }
    table.resetSorting();
    table.setColumnOrder(initialColumnOrder);
    table.resetColumnVisibility();
    table.resetRowSelection(true);
    table.resetColumnSizing();
    table.setPageIndex(0);
    table.setPageSize(10);
    setDensity('default');
    setStyle('default');
  };

  const densityClasses = {
    default: 'py-4 px-4',
    comfortable: 'py-6 px-4',
    compact: 'py-2 px-4',
  };

  return (
    <div className="w-full">
        <div className="flex items-center py-4 gap-2">
            <div className="flex items-center gap-2 flex-grow max-w-sm">
                {filterKey && (
                    <Input
                        id={`${filterKey}-filter-input`}
                        placeholder={`Filter by ${filterKey}...`}
                        defaultValue={(table.getColumn(filterKey)?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn(filterKey)?.setFilterValue(event.target.value)
                        }
                        className="flex-grow"
                    />
                )}
                {showClearFilter && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                size="icon"
                                onClick={resetAll}
                                className={cn(
                                    "h-8 w-8 rounded-full group flex-shrink-0 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground",
                                    isClearing && "animate-fade-out-slide-out"
                                )}
                            >
                                <ClearFilterIcon className="h-5 w-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Clear all filters and customizations</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
        
        <div className="ml-auto flex items-center gap-2">
            {renderCard && (
                <div className="flex items-center gap-1 rounded-md bg-muted p-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={view === 'table' ? 'default' : 'outline'} size="sm" onClick={() => setView('table')}>
                                <List className="h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>List View</p>
                        </TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={view === 'card' ? 'default' : 'outline'} size="sm" onClick={() => setView('card')}>
                                <LayoutGrid className="h-4 w-4"/>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Grid View</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            )}
             <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                      <SlidersHorizontal className="mr-2 h-4 w-4" /> Customize
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">Customize View</h4>
                            <p className="text-sm text-muted-foreground">
                            Adjust density, style, and columns.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Row Density</Label>
                             <Select value={density} onValueChange={(value) => setDensity(value as DensityType)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select density" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="compact">Compact</SelectItem>
                                    <SelectItem value="default">Default</SelectItem>
                                    <SelectItem value="comfortable">Comfortable</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid gap-2">
                            <Label>Table Style</Label>
                             <Select value={style} onValueChange={(value) => setStyle(value as StyleType)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Horizontal</SelectItem>
                                    <SelectItem value="grid">Grid</SelectItem>
                                    <SelectItem value="zebra">Zebra Stripes</SelectItem>
                                    <SelectItem value="minimal">Minimal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                           <Label>Columns</Label>
                           <p className="text-xs text-muted-foreground">Toggle visibility and reorder columns.</p>
                        </div>
                         <ScrollArea className="h-[200px]">
                            <div className="grid gap-2 pr-4">
                            {table
                                    .getAllLeafColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                    const visibleColumns = table.getVisibleLeafColumns().filter(c => c.getCanHide());
                                    const visibleIndex = visibleColumns.findIndex(c => c.id === column.id);
                                    return (
                                        <div
                                            key={column.id}
                                            className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted"
                                            draggable="true"
                                            onDragStart={(e) => handleDragStart(e, column.id)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, column.id)}
                                        >
                                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                            <Checkbox
                                                id={`col-${column.id}`}
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            />
                                            <Label htmlFor={`col-${column.id}`} className="capitalize truncate flex-1 cursor-grab">
                                                {column.id}
                                            </Label>
                                            <div className="flex items-center gap-1 ml-auto">
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveColumn(column.id, 'up')} disabled={visibleIndex === 0}>
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveColumn(column.id, 'down')} disabled={visibleIndex === visibleColumns.length - 1}>
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </ScrollArea>
                        <Button variant="outline" size="sm" onClick={() => {
                          table.setColumnOrder(initialColumnOrder);
                          table.resetColumnVisibility();
                          table.resetColumnSizing();
                          setDensity('default');
                          setStyle('default');
                        }}>Reset View</Button>
                    </div>
                </PopoverContent>
            </Popover>
            <DropdownMenu>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" data-testid="export-button">
                            <FileDown className="mr-2 h-4 w-4" /> Export
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Export data to a file</p>
                    </TooltipContent>
                </Tooltip>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Export As</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={exportToExcel} data-testid="export-excel">Excel (.xlsx)</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToPDF} data-testid="export-pdf">PDF (.pdf)</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToCSV} data-testid="export-csv">CSV (.csv)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </div>

      {view === 'card' && renderCard ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {table.getRowModel().rows.map(row => (
                <React.Fragment key={row.id}>
                    {renderCard(row.original)}
                </React.Fragment>
            ))}
        </div>
      ) : (
         <div className="rounded-md border">
            <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                    return (
                        <TableHead key={header.id} style={{ width: header.getSize() }}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                            <div
                                onMouseDown={header.getResizeHandler()}
                                onTouchStart={header.getResizeHandler()}
                                className={cn(
                                'absolute top-0 right-0 h-full w-1.5 cursor-col-resize select-none touch-none bg-border opacity-0 group-hover:opacity-100',
                                header.column.getIsResizing() && 'bg-primary opacity-100'
                                )}
                            />
                        </TableHead>
                    )
                    })}
                </TableRow>
                ))}
            </TableHeader>
            <TableBody data-style={style}>
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                        <TableRow key={i}>
                            {table.getAllColumns().map((column, j) => (
                                <TableCell key={j} className={densityClasses[density]}>
                                    <Skeleton className="h-6 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <React.Fragment key={row.id}>
                        <TableRow
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className={densityClasses[density]}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                                </TableCell>
                            ))}
                        </TableRow>
                        {row.getIsExpanded() && renderSubComponent && (
                            <TableRow>
                                <TableCell colSpan={table.getVisibleFlatColumns().length} className="p-0">
                                    {renderSubComponent(row.original)}
                                </TableCell>
                            </TableRow>
                        )}
                    </React.Fragment>
                ))
                ) : (
                <TableRow>
                    <TableCell
                    colSpan={tableColumns.length}
                    className="h-24 text-center"
                    >
                                      No results Found, Try modifying filters.
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
      )}
     
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select
                    value={`${table.getState().pagination.pageSize}`}
                    onValueChange={(value) => {
                        table.setPageSize(Number(value))
                    }}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to first page</span>
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <span className="sr-only">Go to previous page</span>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="h-8 w-8 p-0"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to next page</span>
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    className="hidden h-8 w-8 p-0 lg:flex"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <span className="sr-only">Go to last page</span>
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}
