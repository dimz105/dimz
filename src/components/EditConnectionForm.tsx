import React, { useState, useEffect } from 'react';
import { Connection } from '../types';
import { useStore } from '../store';

interface EditConnectionFormProps {
  connectionId: string;
  onClose: () => void;
}

export const EditConnectionForm: React.FC<EditConnectionFormProps> = ({
  connectionId,
  onClose,
}) => {
  const { connections, addresses, updateConnection } = useStore();
  const [formData, setFormData] = useState<Omit<Connection, 'id'>>({
    clientName: '',
    address: '',
    office: '',
    connectionType: 'Fiber',
    status: 'Active',
    speed: '100',
    price: 0,
    contact: '',
    lastCheck: new Date(),
    notes: '',
  });

  useEffect(() => {
    const connection = connections.find((c) => c.id === connectionId);
    if (connection) {
      setFormData(connection);
    }
  }, [connectionId, connections]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConnection(connectionId, {
      ...formData,
      lastCheck: new Date(),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ім'я клієнта
        </label>
        <input
          type="text"
          value={formData.clientName}
          onChange={(e) =>
            setFormData({ ...formData, clientName: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Адреса
        </label>
        <select
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          required
        >
          <option value="">Виберіть адресу</option>
          {addresses.map((addr) => (
            <option key={addr.id} value={`${addr.street} ${addr.building}`}>
              {addr.street} {addr.building}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Офіс клієнта
        </label>
        <input
          type="text"
          value={formData.office}
          onChange={(e) => setFormData({ ...formData, office: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Тип підключення
        </label>
        <select
          value={formData.connectionType}
          onChange={(e) =>
            setFormData({
              ...formData,
              connectionType: e.target.value as Connection['connectionType'],
            })
          }
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
        >
          <option value="Fiber">Оптоволокно</option>
          <option value="Ethernet">Ethernet</option>
          <option value="DSL">DSL</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Статус
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as Connection['status'],
            })
          }
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
        >
          <option value="Active">Працює</option>
          <option value="Inactive">Не працює</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Швидкість (Мбіт/с)
        </label>
        <select
          value={formData.speed}
          onChange={(e) =>
            setFormData({
              ...formData,
              speed: e.target.value as Connection['speed'],
            })
          }
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
        >
          <option value="10">10 Мбіт/с</option>
          <option value="20">20 Мбіт/с</option>
          <option value="30">30 Мбіт/с</option>
          <option value="50">50 Мбіт/с</option>
          <option value="100">100 Мбіт/с</option>
          <option value="1000">1000 Мбіт/с</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Ціна (грн)
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Контактний телефон
        </label>
        <input
          type="tel"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          required
          placeholder="+380501234567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Примітки
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          rows={3}
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-lg font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Скасувати
        </button>
        <button
          type="submit"
          className="px-6 py-3 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Зберегти зміни
        </button>
      </div>
    </form>
  );
};