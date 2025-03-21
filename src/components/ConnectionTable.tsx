import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Connection } from '../types';
import { Wifi, WifiOff, Edit2, Search, Filter, Trash2 } from 'lucide-react';
import { useStore } from '../store';

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
  const { searchTerm, filterType, filterStatus, setSearchTerm, setFilterType, setFilterStatus, removeConnection } = useStore();

  const filteredData = data.filter(connection => {
    const matchesSearch = connection.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         connection.contact.includes(searchTerm);
    const matchesType = !filterType || connection.connectionType === filterType;
    const matchesStatus = !filterStatus || connection.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const activeConnections = filteredData.filter(conn => conn.status === 'Active').length;

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
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(info.row.original.id)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Edit2 className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (confirm('Ви впевнені, що хочете видалити це підключення?')) {
                removeConnection(info.row.original.id);
              }
            }}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <Trash2 className="h-5 w-5" />
          </motion.button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: sortByAddress ? [...filteredData].sort((a, b) => a.address.localeCompare(b.address)) : filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Пошук за ім'ям, адресою або телефоном..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
              >
                <option value="">Всі типи</option>
                <option value="Fiber">Оптоволокно</option>
                <option value="Ethernet">Ethernet</option>
                <option value="DSL">DSL</option>
              </select>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-2"
            >
              <option value="">Всі статуси</option>
              <option value="Active">Працює</option>
              <option value="Inactive">Не працює</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            Всього клієнтів: <span className="font-medium">{filteredData.length}</span>
          </div>
          <div>
            Активних підключень: <span className="font-medium text-green-600">{activeConnections}</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-sm font-medium text-blue-900 uppercase tracking-wider bg-gradient-to-r from-blue-50 to-blue-100"
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
            {table.getRowModel().rows.map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
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
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};