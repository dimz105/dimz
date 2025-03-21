import { create } from 'zustand';
import { Connection, ConnectionStore, Address, User, Photo, Schedule } from './types';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useStore = create<ConnectionStore>((set, get) => ({
  user: null,
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
      notes: 'Нове підключення',
      photos: [],
      schedules: []
    }
  ],
  addresses: [
    {
      id: '1',
      street: 'вул. Шевченка',
      building: '25'
    }
  ],
  searchTerm: '',
  filterType: '',
  filterStatus: '',
  viewMode: 'table',
  sortByAddress: false,

  addConnection: (connection) =>
    set((state) => ({
      connections: [
        ...state.connections,
        { 
          ...connection, 
          id: Math.random().toString(36).substr(2, 9),
          photos: [],
          schedules: []
        }
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
    })),

  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterType: (type) => set({ filterType: type }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setViewMode: (mode) => set({ viewMode: mode }),

  addPhoto: (connectionId, photo) =>
    set((state) => ({
      connections: state.connections.map((conn) =>
        conn.id === connectionId
          ? {
              ...conn,
              photos: [
                ...conn.photos,
                {
                  ...photo,
                  id: Math.random().toString(36).substr(2, 9),
                  connectionId,
                  createdAt: new Date()
                }
              ]
            }
          : conn
      )
    })),

  removePhoto: (connectionId, photoId) =>
    set((state) => ({
      connections: state.connections.map((conn) =>
        conn.id === connectionId
          ? {
              ...conn,
              photos: conn.photos.filter((photo) => photo.id !== photoId)
            }
          : conn
      )
    })),

  addSchedule: (connectionId, schedule) =>
    set((state) => ({
      connections: state.connections.map((conn) =>
        conn.id === connectionId
          ? {
              ...conn,
              schedules: [
                ...conn.schedules,
                {
                  ...schedule,
                  id: Math.random().toString(36).substr(2, 9),
                  connectionId
                }
              ]
            }
          : conn
      )
    })),

  updateSchedule: (connectionId, scheduleId, updates) =>
    set((state) => ({
      connections: state.connections.map((conn) =>
        conn.id === connectionId
          ? {
              ...conn,
              schedules: conn.schedules.map((schedule) =>
                schedule.id === scheduleId
                  ? { ...schedule, ...updates }
                  : schedule
              )
            }
          : conn
      )
    })),

  removeSchedule: (connectionId, scheduleId) =>
    set((state) => ({
      connections: state.connections.map((conn) =>
        conn.id === connectionId
          ? {
              ...conn,
              schedules: conn.schedules.filter(
                (schedule) => schedule.id !== scheduleId
              )
            }
          : conn
      )
    })),

  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (data.user) {
      const { data: userData } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      set({ user: userData as User });
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  }
}));