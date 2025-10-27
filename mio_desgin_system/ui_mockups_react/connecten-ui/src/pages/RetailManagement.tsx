import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';

interface InventoryItem {
  id: string;
  productName: string;
  category: string;
  currentStock: number;
  alertThreshold: number;
  unitPrice: number;
  totalValue: number;
  lastRestocked: string;
  supplier: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface SalesData {
  month: string;
  revenue: number;
  units: number;
}

interface Order {
  id: string;
  productName: string;
  quantity: number;
  supplier: string;
  orderDate: string;
  expectedDate: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    productName: 'ダンスシューズ (24cm)',
    category: 'シューズ',
    currentStock: 8,
    alertThreshold: 10,
    unitPrice: 8000,
    totalValue: 64000,
    lastRestocked: '2025-10-15',
    supplier: 'ダンス用品店A',
    status: 'low-stock'
  },
  {
    id: '2',
    productName: 'トレーニングウェア (M)',
    category: 'ウェア',
    currentStock: 25,
    alertThreshold: 15,
    unitPrice: 4500,
    totalValue: 112500,
    lastRestocked: '2025-10-20',
    supplier: 'スポーツ用品B',
    status: 'in-stock'
  },
  {
    id: '3',
    productName: 'ダンスタオル',
    category: '小物',
    currentStock: 0,
    alertThreshold: 20,
    unitPrice: 1200,
    totalValue: 0,
    lastRestocked: '2025-09-10',
    supplier: 'タオル専門店C',
    status: 'out-of-stock'
  },
  {
    id: '4',
    productName: 'ヨガマット',
    category: '器具',
    currentStock: 35,
    alertThreshold: 10,
    unitPrice: 3500,
    totalValue: 122500,
    lastRestocked: '2025-10-25',
    supplier: 'フィットネス用品D',
    status: 'in-stock'
  }
];

const mockSalesData: SalesData[] = [
  { month: '7月', revenue: 245000, units: 68 },
  { month: '8月', revenue: 312000, units: 85 },
  { month: '9月', revenue: 278000, units: 74 },
  { month: '10月', revenue: 356000, units: 92 }
];

const mockOrders: Order[] = [
  {
    id: '1',
    productName: 'ダンスタオル',
    quantity: 50,
    supplier: 'タオル専門店C',
    orderDate: '2025-10-26',
    expectedDate: '2025-10-30',
    status: 'confirmed'
  },
  {
    id: '2',
    productName: 'ダンスシューズ (24cm)',
    quantity: 20,
    supplier: 'ダンス用品店A',
    orderDate: '2025-10-27',
    expectedDate: '2025-11-05',
    status: 'pending'
  }
];

export const RetailManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);

  const totalInventoryValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventory.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length;
  const totalProducts = inventory.length;

  const filteredInventory = selectedCategory === 'all'
    ? inventory
    : inventory.filter(item => item.category === selectedCategory);

  const categories = Array.from(new Set(inventory.map(item => item.category)));

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'in-stock': { label: '在庫あり', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'low-stock': { label: '在庫少', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      'out-of-stock': { label: '在庫切れ', className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['in-stock'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getOrderStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { label: '発注済み', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      'confirmed': { label: '確認済み', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
      'shipped': { label: '発送済み', className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      'delivered': { label: '納品完了', className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' }
    };
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig['pending'];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const handleOrder = (item: InventoryItem) => {
    setSelectedProduct(item);
    setShowOrderModal(true);
  };

  const handleOrderSubmit = () => {
    console.log('Submitting order...');
    setShowOrderModal(false);
    setSelectedProduct(null);
  };

  const handleAlertUpdate = (itemId: string, threshold: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, alertThreshold: threshold } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold text-neutral-800 dark:text-white mb-2">小売管理</h1>
        <p className="text-neutral-500 dark:text-gray-400">
          商品在庫、販売実績、発注管理を一元管理します
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <i className="fas fa-box text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">総商品数</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <i className="fas fa-yen-sign text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">在庫総額</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{totalInventoryValue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <i className="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">在庫アラート</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">{lowStockItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <i className="fas fa-chart-line text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">今月の売上</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{mockSalesData[mockSalesData.length - 1].revenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sales Chart */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-chart-bar text-primary-500" />
          月別販売実績
        </h3>
        <div className="space-y-3">
          {mockSalesData.map((data, index) => {
            const maxRevenue = Math.max(...mockSalesData.map(d => d.revenue));
            const percentage = (data.revenue / maxRevenue) * 100;
            return (
              <div key={index}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-neutral-600 dark:text-gray-400">{data.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-800 dark:text-white font-medium">
                      {data.units}点
                    </span>
                    <span className="text-neutral-800 dark:text-white font-bold">
                      ¥{data.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-primary-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Inventory Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-white flex items-center gap-2">
              <i className="fas fa-warehouse text-primary-500" />
              在庫管理
            </h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">すべてのカテゴリ</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <Button variant="primary" size="sm">
                <i className="fas fa-plus" />
                商品追加
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  商品名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  カテゴリ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  現在庫数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  アラート値
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  単価
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  在庫額
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  仕入先
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  状態
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    <span
                      className={`font-medium ${
                        item.currentStock === 0
                          ? 'text-red-600 dark:text-red-400'
                          : item.currentStock <= item.alertThreshold
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}
                    >
                      {item.currentStock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {item.alertThreshold}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    ¥{item.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    ¥{item.totalValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOrder(item)}
                    >
                      <i className="fas fa-shopping-cart" />
                      発注
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white flex items-center gap-2">
            <i className="fas fa-truck text-primary-500" />
            発注管理
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  商品名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  数量
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  仕入先
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  発注日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  納品予定日
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  状態
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    {order.productName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {order.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {order.supplier}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {order.expectedDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {getOrderStatusBadge(order.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Order Modal */}
      {showOrderModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 className="text-xl font-bold mb-4 text-neutral-800 dark:text-white">発注処理</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  商品名
                </label>
                <input
                  type="text"
                  value={selectedProduct.productName}
                  disabled
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  発注数量
                </label>
                <input
                  type="number"
                  placeholder="数量を入力"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  仕入先
                </label>
                <input
                  type="text"
                  value={selectedProduct.supplier}
                  disabled
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  納品希望日
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button variant="secondary" onClick={() => setShowOrderModal(false)} fullWidth>
                キャンセル
              </Button>
              <Button variant="primary" onClick={handleOrderSubmit} fullWidth>
                <i className="fas fa-paper-plane" />
                発注確定
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
