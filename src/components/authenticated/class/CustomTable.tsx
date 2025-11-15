import type { Key, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export type TableRowData = Record<string, ReactNode | string | number>

export type TableColumn<T extends TableRowData = TableRowData> = {
  key: keyof T & string
  label: string
  align?: 'left' | 'center' | 'right'
  className?: string
}

type CustomTableProps<T extends TableRowData = TableRowData> = {
  columns: TableColumn<T>[]
  rows: T[]
  rowKey?: keyof T & string
}

export function CustomTable<T extends TableRowData>({
  columns,
  rows,
  rowKey,
}: CustomTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={cn(
                column.align === 'right' && 'text-right',
                column.align === 'center' && 'text-center',
                column.className,
                'font-bold',
              )}
            >
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, index) => {
          const rawKey =
            (rowKey ? row[rowKey] : (row as { id?: Key }).id) ?? index
          const resolvedKey =
            typeof rawKey === 'string' || typeof rawKey === 'number'
              ? rawKey
              : index

          return (
            <TableRow key={resolvedKey}>
              {columns.map((column) => (
                <TableCell
                  key={`${column.key}-${index}`}
                  className={cn(
                    column.align === 'right' && 'text-right',
                    column.align === 'center' && 'text-center',
                    column.align === 'left' && 'text-left',
                    !column.align && 'text-left',
                    column.className,
                  )}
                >
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
