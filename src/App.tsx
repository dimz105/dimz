import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ConnectionTable } from './components/ConnectionTable';
import { AddConnectionForm } from './components/AddConnectionForm';
import { AddAddressForm } from './components/AddAddressForm';
import { EditConnectionForm } from './components/EditConnectionForm';
import { useStore } from './store';
import { PlusCircle, Network, MapPin, SortAsc, Download, Users, Wifi, WifiOff } from 'lucide-react';

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingConnection, setEditingConnection] = useState<string | null>(null);
  const { connections, addConnection, sortByAddress, toggleSortByAddress } = useStore();

  const activeConnections = connections.filter(conn => conn.status === 'Active').length;
  const inactiveConnections = connections.filter(conn => conn.status === 'Inactive').length;
  const totalRevenue = connections.reduce((sum, conn) => sum + conn.price, 0);

  const exportToCSV = () => {
    const headers = ['Клієнт', 'Адреса', 'Офіс', 'Тип підключення', 'Статус', 'Швидкість', 'Ціна', 'Контакт'];
    const data = connections.map(conn => [
      conn.clientName,
      conn.address,
      conn.office,
      conn.connectionType,
      conn.status === 'Active' ? 'Працює' : 'Не працює',
      `${conn.speed} Мбіт/с`,
      `${conn.price} грн`,
      conn.contact
    ]);
    
    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'connections.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-10"></div>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center"
            >
              <Network className="h-10 w-10 text-white" />
              <h1 className="ml-4 text-3xl font-bold text-white">
                Моніторинг підключень
              </h1>
            </motion.div>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <MapPin className="h-5 w-5 mr-2" />
                {showAddressForm ? 'Закрити форму' : 'Додати адресу'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                {showAddForm ? 'Закрити форму' : 'Додати підключення'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleSortByAddress}
                className={`flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm text-sm font-medium text-white hover:bg-white/20 transition-colors ${
                  sortByAddress ? 'bg-white/20' : ''
                }`}
              >
                <SortAsc className="h-5 w-5 mr-2" />
                Сортувати за адресою
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md shadow-sm text-sm font-medium text-white hover:bg-white/20 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Експорт CSV
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-sm opacity-80">Всього клієнтів</p>
                <p className="text-3xl font-bold">{connections.length}</p>
              </div>
              <Users className="h-8 w-8 text-white opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-sm opacity-80">Активні підключення</p>
                <div className="flex items-center space-x-2">
                  <p className="text-3xl font-bold">{activeConnections}</p>
                  <p className="text-sm opacity-80">/ {inactiveConnections} неактивні</p>
                </div>
              </div>
              <Wifi className="h-8 w-8 text-white opacity-80" />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="text-white">
                <p className="text-sm opacity-80">Загальний дохід</p>
                <p className="text-3xl font-bold">{totalRevenue} грн</p>
              </div>
              <WifiOff className="h-8 w-8 text-white opacity-80" />
            </div>
          </motion.div>
        </div>

        {showAddressForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-lg font-medium text-white">Додати нову адресу</h2>
            </div>
            <div className="p-6">
              <AddAddressForm />
            </div>
          </motion.div>
        )}
        
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-lg font-medium text-white">Додати нове підключення</h2>
            </div>
            <div className="p-6">
              <AddConnectionForm onSubmit={addConnection} />
            </div>
          </motion.div>
        )}

        {editingConnection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-lg font-medium text-white">Редагувати підключення</h2>
            </div>
            <div className="p-6">
              <EditConnectionForm
                connectionId={editingConnection}
                onClose={() => setEditingConnection(null)}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-lg font-medium text-white">Список підключень</h2>
          </div>
          <ConnectionTable
            data={connections}
            sortByAddress={sortByAddress}
            onEdit={setEditingConnection}
          />
        </motion.div>
      </main>
    </div>
  );
}

export default App;