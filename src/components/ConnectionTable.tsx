import React from 'react';
import { format } from 'date-fns';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Connection } from '../types';
import { Wifi, WifiOff, Edit2 } from 'lucide-react';

interface ConnectionTableProps {
  data: Connection[];
  sortByAddress: boolean;
  onEdit: (id: string) => void;
}

const getStatusIcon = (status: Connection['status']) => {
  switch (status) {
    case 'Active':
      return <Wifi className="h-5 w-5 text-green-600" />;
    case 'Inactive':
      return <WifiOff className="h-5 w-5 text-red-600" />;
  }
};

export const ConnectionTable: React.FC<ConnectionTableProps> = ({
  data,
  sortByAddress,
  onEdit,
}) => {
  const columnHelper = createColumnHelper<Connection>();

  const columns = [
    columnHelper.accessor('clientName', {
      header: 'Клієнт',
      cell: (info) => (
        <div className="font-medium text-gray-900">{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('address', {
      header: 'Адреса',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('office', {
      header: 'Офіс',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('connectionType', {
      header: 'Тип підключення',
      cell: (info) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Статус',
      cell: (info) => (
        <div className="flex items-center">
          {getStatusIcon(info.getValue())}
        </div>
      ),
    }),
    columnHelper.accessor('speed', {
      header: 'Швидкість',
      cell: (info) => (
        <span className="font-mono text-blue-700">{info.getValue()} Мбіт/с</span>
      ),
    }),
    columnHelper.accessor('price', {
      header: 'Ціна',
      cell: (info) => (
        <span className="font-mono text-blue-700">{info.getValue()} грн</span>
      ),
    }),
    columnHelper.accessor('contact', {
      header: 'Контакт',
      cell: (info) => (
        <a
          href={`tel:${info.getValue()}`}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {info.getValue()}
        </a>
      ),
    }),
    columnHelper.accessor('lastCheck', {
      header: 'Остання перевірка',
      cell: (info) => format(info.getValue(), 'dd.MM.yyyy HH:mm'),
    }),
    columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <button
          onClick={() => onEdit(info.row.original.id)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Edit2 className="h-6 w-6" />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: sortByAddress ? [...data].sort((a, b) => a.address.localeCompare(b.address)) : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-medium text-blue-900 uppercase tracking-wider bg-blue-50"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-blue-50 transition-colors duration-150"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};