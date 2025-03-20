import React, { useState } from 'react';
import { useStore } from '../store';

export const AddAddressForm: React.FC = () => {
  const addAddress = useStore((state) => state.addAddress);
  const [formData, setFormData] = useState({
    street: '',
    building: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress(formData);
    setFormData({
      street: '',
      building: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Вулиця
        </label>
        <input
          type="text"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Будинок
        </label>
        <input
          type="text"
          value={formData.building}
          onChange={(e) => setFormData({ ...formData, building: e.target.value })}
          className="mt-1 block w-full rounded-md border border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white px-4 py-2 text-lg"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Додати адресу
      </button>
    </form>
  );
};