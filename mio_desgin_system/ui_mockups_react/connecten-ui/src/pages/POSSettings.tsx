import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  taxRate: number;
  stock: number;
  status: 'active' | 'inactive';
}

interface Discount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  startDate: string;
  endDate: string;
  applicable: string;
  status: 'active' | 'inactive';
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'レッスンチケット (10回)',
    category: 'チケット',
    price: 50000,
    taxRate: 10,
    stock: 999,
    status: 'active'
  },
  {
    id: '2',
    name: 'ダンスシューズ',
    category: '用品',
    price: 8000,
    taxRate: 10,
    stock: 25,
    status: 'active'
  },
  {
    id: '3',
    name: 'トレーニングウェア',
    category: 'ウェア',
    price: 4500,
    taxRate: 10,
    stock: 48,
    status: 'active'
  }
];

const mockDiscounts: Discount[] = [
  {
    id: '1',
    name: '新規会員割引',
    type: 'percentage',
    value: 20,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    applicable: '初回チケット購入',
    status: 'active'
  },
  {
    id: '2',
    name: '友達紹介キャンペーン',
    type: 'fixed',
    value: 5000,
    startDate: '2025-10-01',
    endDate: '2025-12-31',
    applicable: 'すべての商品',
    status: 'active'
  }
];

export const POSSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'products' | 'discounts' | 'tax' | 'receipt'>('terminal');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [discounts, setDiscounts] = useState<Discount[]>(mockDiscounts);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingDiscount, setEditingDiscount] = useState<Discount | null>(null);

  // POS端末設定
  const [terminalSettings, setTerminalSettings] = useState({
    terminalId: 'POS-001',
    location: 'メインカウンター',
    printer: 'EPSON TM-T88VI',
    cardReader: 'Square Reader',
    autoReceipt: true
  });

  // 税率設定
  const [taxSettings, setTaxSettings] = useState({
    standardRate: 10,
    reducedRate: 8,
    includeTax: true
  });

  // レシート設定
  const [receiptSettings, setReceiptSettings] = useState({
    shopName: 'En Dance Studio',
    address: '東京都渋谷区...',
    phone: '03-XXXX-XXXX',
    footerMessage: 'ご来店ありがとうございました'
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('この商品を削除しますか？')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleAddDiscount = () => {
    setEditingDiscount(null);
    setShowDiscountModal(true);
  };

  const handleEditDiscount = (discount: Discount) => {
    setEditingDiscount(discount);
    setShowDiscountModal(true);
  };

  const handleDeleteDiscount = (discountId: string) => {
    if (confirm('この割引設定を削除しますか？')) {
      setDiscounts(prev => prev.filter(d => d.id !== discountId));
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving settings...');
    alert('設定を保存しました');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">POS設定</h1>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full">
            Phase 1
          </span>
        </div>
        <p className="text-neutral-500 dark:text-gray-400">
          POS端末、商品マスタ、割引、税率などの設定を管理します
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'terminal'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-cash-register mr-2" />
              端末設定
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'products'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-box mr-2" />
              商品マスタ
            </button>
            <button
              onClick={() => setActiveTab('discounts')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'discounts'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-tag mr-2" />
              割引設定
            </button>
            <button
              onClick={() => setActiveTab('tax')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'tax'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-percent mr-2" />
              税率設定
            </button>
            <button
              onClick={() => setActiveTab('receipt')}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'receipt'
                  ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <i className="fas fa-receipt mr-2" />
              レシート設定
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Terminal Settings Tab */}
          {activeTab === 'terminal' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
                POS端末設定
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    端末ID
                  </label>
                  <input
                    type="text"
                    value={terminalSettings.terminalId}
                    onChange={(e) =>
                      setTerminalSettings({ ...terminalSettings, terminalId: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    設置場所
                  </label>
                  <input
                    type="text"
                    value={terminalSettings.location}
                    onChange={(e) =>
                      setTerminalSettings({ ...terminalSettings, location: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    プリンター
                  </label>
                  <select
                    value={terminalSettings.printer}
                    onChange={(e) =>
                      setTerminalSettings({ ...terminalSettings, printer: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  >
                    <option>EPSON TM-T88VI</option>
                    <option>Star TSP143III</option>
                    <option>Citizen CT-S310II</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    カードリーダー
                  </label>
                  <select
                    value={terminalSettings.cardReader}
                    onChange={(e) =>
                      setTerminalSettings({ ...terminalSettings, cardReader: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  >
                    <option>Square Reader</option>
                    <option>PayPay QR</option>
                    <option>楽天ペイ</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={terminalSettings.autoReceipt}
                      onChange={(e) =>
                        setTerminalSettings({ ...terminalSettings, autoReceipt: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      会計後に自動でレシート印刷
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  商品マスタ管理
                </h3>
                <Button variant="primary" onClick={handleAddProduct}>
                  <i className="fas fa-plus" />
                  商品追加
                </Button>
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
                        価格
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        税率
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        在庫
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
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          ¥{product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {product.taxRate}%
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {product.stock}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}
                          >
                            {product.status === 'active' ? '有効' : '無効'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800"
                            >
                              <i className="fas fa-edit" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-800"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Discounts Tab */}
          {activeTab === 'discounts' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-white">
                  割引設定管理
                </h3>
                <Button variant="primary" onClick={handleAddDiscount}>
                  <i className="fas fa-plus" />
                  割引追加
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        割引名
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        種類
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        割引額
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        期間
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        適用対象
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
                    {discounts.map((discount) => (
                      <tr key={discount.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {discount.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {discount.type === 'percentage' ? 'パーセント' : '定額'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {discount.type === 'percentage'
                            ? `${discount.value}%`
                            : `¥${discount.value.toLocaleString()}`}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {discount.startDate} ~ {discount.endDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {discount.applicable}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              discount.status === 'active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}
                          >
                            {discount.status === 'active' ? '有効' : '無効'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditDiscount(discount)}
                              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-800"
                            >
                              <i className="fas fa-edit" />
                            </button>
                            <button
                              onClick={() => handleDeleteDiscount(discount.id)}
                              className="text-red-600 dark:text-red-400 hover:text-red-800"
                            >
                              <i className="fas fa-trash" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tax Settings Tab */}
          {activeTab === 'tax' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
                税率設定
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    標準税率
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={taxSettings.standardRate}
                      onChange={(e) =>
                        setTaxSettings({ ...taxSettings, standardRate: parseFloat(e.target.value) })
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    軽減税率
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={taxSettings.reducedRate}
                      onChange={(e) =>
                        setTaxSettings({ ...taxSettings, reducedRate: parseFloat(e.target.value) })
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={taxSettings.includeTax}
                      onChange={(e) =>
                        setTaxSettings({ ...taxSettings, includeTax: e.target.checked })
                      }
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      価格に税を含める（内税表示）
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Receipt Settings Tab */}
          {activeTab === 'receipt' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4">
                レシート設定
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    店舗名
                  </label>
                  <input
                    type="text"
                    value={receiptSettings.shopName}
                    onChange={(e) =>
                      setReceiptSettings({ ...receiptSettings, shopName: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    住所
                  </label>
                  <input
                    type="text"
                    value={receiptSettings.address}
                    onChange={(e) =>
                      setReceiptSettings({ ...receiptSettings, address: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    電話番号
                  </label>
                  <input
                    type="text"
                    value={receiptSettings.phone}
                    onChange={(e) =>
                      setReceiptSettings({ ...receiptSettings, phone: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    フッターメッセージ
                  </label>
                  <textarea
                    value={receiptSettings.footerMessage}
                    onChange={(e) =>
                      setReceiptSettings({ ...receiptSettings, footerMessage: e.target.value })
                    }
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="primary" onClick={handleSaveSettings}>
              <i className="fas fa-save" />
              設定を保存
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
