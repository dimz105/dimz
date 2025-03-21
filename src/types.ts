export interface User {
  id: string;
  email: string;
  role: 'admin' | 'moderator' | 'user';
  createdAt: Date;
}

export interface Connection {
  id: string;
  clientName: string;
  address: string;
  office: string;
  connectionType: 'Fiber' | 'Ethernet' | 'DSL';
  status: 'Active' | 'Inactive';
  speed: '10' | '20' | '30' | '50' | '100' | '1000';
  price: number;
  contact: string;
  lastCheck: Date;
  notes: string;
  photos: Photo[];
  schedules: Schedule[];
}

export interface Photo {
  id: string;
  url: string;
  caption: string;
  connectionId: string;
  createdAt: Date;
}

export interface Schedule {
  id: string;
  connectionId: string;
  title: string;
  description: string;
  date: Date;
  type: 'installation' | 'maintenance' | 'repair';
  status: 'pending' | 'completed' | 'cancelled';
}

export interface Address {
  id: string;
  street: string;
  building: string;
}

export interface ConnectionStore {
  user: User | null;
  connections: Connection[];
  addresses: Address[];
  searchTerm: string;
  filterType: string;
  filterStatus: string;
  viewMode: 'table' | 'cards';
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  updateConnection: (id: string, connection: Partial<Connection>) => void;
  removeConnection: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  sortByAddress: boolean;
  toggleSortByAddress: () => void;
  setSearchTerm: (term: string) => void;
  setFilterType: (type: string) => void;
  setFilterStatus: (status: string) => void;
  setViewMode: (mode: 'table' | 'cards') => void;
  addPhoto: (connectionId: string, photo: Omit<Photo, 'id' | 'connectionId' | 'createdAt'>) => void;
  removePhoto: (connectionId: string, photoId: string) => void;
  addSchedule: (connectionId: string, schedule: Omit<Schedule, 'id' | 'connectionId'>) => void;
  updateSchedule: (connectionId: string, scheduleId: string, updates: Partial<Schedule>) => void;
  removeSchedule: (connectionId: string, scheduleId: string) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}