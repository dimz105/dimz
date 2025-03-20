import { create } from 'zustand';
import { Connection, ConnectionStore, Address } from './types';

export const useStore = create<ConnectionStore>((set) => ({
  connections: [
    {
      id: '1',
      clientName: 'Іван Петренко',
      address: 'вул. Шевченка 25, кв. 12',
      office: 'Офіс 101',
      connectionType: 'Fiber',
      status: 'Active',
      speed: '100',
      price: 400,
      contact: '+380501234567',
      lastCheck: new Date(),
      notes: 'Нове підключення'
    }
  ],
  addresses: [
    {
      id: '1',
      street: 'вул. Шевченка',
      building: '25',
      city: 'Київ'
    }
  ],
  sortByAddress: false,
  addConnection: (connection) =>
    set((state) => ({
      connections: [
        ...state.connections,
        { ...connection, id: Math.random().toString(36).substr(2, 9) }
      ]
    })),
  updateConnection: (id, connection) =>
    set((state) => ({
      connections: state.connections.map((conn) =>
        conn.id === id ? { ...conn, ...connection } : conn
      )
    })),
  removeConnection: (id) =>
    set((state) => ({
      connections: state.connections.filter((conn) => conn.id !== id)
    })),
  addAddress: (address) =>
    set((state) => ({
      addresses: [
        ...state.addresses,
        { ...address, id: Math.random().toString(36).substr(2, 9) }
      ]
    })),
  toggleSortByAddress: () =>
    set((state) => ({
      sortByAddress: !state.sortByAddress
    }))
}));