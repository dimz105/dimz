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
}

export interface Address {
  id: string;
  street: string;
  building: string;
}

export interface ConnectionStore {
  connections: Connection[];
  addresses: Address[];
  addConnection: (connection: Omit<Connection, 'id'>) => void;
  updateConnection: (id: string, connection: Partial<Connection>) => void;
  removeConnection: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  sortByAddress: boolean;
  toggleSortByAddress: () => void;
}