import React, { useState } from 'react';
import { ConnectionTable } from './components/ConnectionTable';
import { AddConnectionForm } from './components/AddConnectionForm';
import { AddAddressForm } from './components/AddAddressForm';
import { EditConnectionForm } from './components/EditConnectionForm';
import { useStore } from './store';
import { PlusCircle, Network, MapPin, SortAsc } from 'lucide-react';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingConnection, setEditingConnection] = useState<string | null>(null);
  const { connections, addConnection, sortByAddress, toggleSortByAddress } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Network className="h-10 w-10 text-white" />
              <h1 className="ml-4 text-3xl font-bold text-white">
                Моніторинг підключень
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="flex items-center px-4 py-2 border-2 border-white rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <MapPin className="h-5 w-5 mr-2" />
                {showAddressForm ? 'Закрити форму' : 'Додати адресу'}
              </button>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center px-4 py-2 border-2 border-white rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                {showAddForm ? 'Закрити форму' : 'Додати підключення'}
              </button>
              <button
                onClick={toggleSortByAddress}
                className={`flex items-center px-4 py-2 border-2 border-white rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 transition-colors ${
                  sortByAddress ? 'bg-blue-700' : ''
                }`}
              >
                <SortAsc className="h-5 w-5 mr-2" />
                Сортувати за адресою
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        {showAddressForm && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-lg font-medium text-white">Додати нову адресу</h2>
            </div>
            <div className="p-6">
              <AddAddressForm />
            </div>
          </div>
        )}
        
        {showAddForm && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-lg font-medium text-white">Додати нове підключення</h2>
            </div>
            <div className="p-6">
              <AddConnectionForm onSubmit={addConnection} />
            </div>
          </div>
        )}

        {editingConnection && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-blue-600 px-6 py-4">
              <h2 className="text-lg font-medium text-white">Редагувати підключення</h2>
            </div>
            <div className="p-6">
              <EditConnectionForm
                connectionId={editingConnection}
                onClose={() => setEditingConnection(null)}
              />
            </div>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h2 className="text-lg font-medium text-white">Список підключень</h2>
          </div>
          <ConnectionTable
            data={connections}
            sortByAddress={sortByAddress}
            onEdit={setEditingConnection}
          />
        </div>
      </main>
    </div>
  );
}

export default App;