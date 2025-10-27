import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';

interface Denomination {
  value: number;
  label: string;
  count: number;
  type: 'bill' | 'coin';
}

const initialDenominations: Denomination[] = [
  { value: 10000, label: '10,000円札', count: 0, type: 'bill' },
  { value: 5000, label: '5,000円札', count: 0, type: 'bill' },
  { value: 2000, label: '2,000円札', count: 0, type: 'bill' },
  { value: 1000, label: '1,000円札', count: 0, type: 'bill' },
  { value: 500, label: '500円硬貨', count: 0, type: 'coin' },
  { value: 100, label: '100円硬貨', count: 0, type: 'coin' },
  { value: 50, label: '50円硬貨', count: 0, type: 'coin' },
  { value: 10, label: '10円硬貨', count: 0, type: 'coin' },
  { value: 5, label: '5円硬貨', count: 0, type: 'coin' },
  { value: 1, label: '1円硬貨', count: 0, type: 'coin' }
];

export const CashDenomination: React.FC = () => {
  const [denominations, setDenominations] = useState<Denomination[]>(initialDenominations);
  const [expectedTotal, setExpectedTotal] = useState<number>(0);
  const [changeAmount, setChangeAmount] = useState<number>(0);
  const [calculatedChange, setCalculatedChange] = useState<Denomination[]>([]);
  const [showChangeCalculator, setShowChangeCalculator] = useState(false);

  const totalAmount = denominations.reduce(
    (sum, denom) => sum + denom.value * denom.count,
    0
  );

  const difference = totalAmount - expectedTotal;

  const handleCountChange = (index: number, value: string) => {
    const count = parseInt(value) || 0;
    setDenominations(prev =>
      prev.map((denom, i) =>
        i === index ? { ...denom, count: Math.max(0, count) } : denom
      )
    );
  };

  const handleIncrement = (index: number) => {
    setDenominations(prev =>
      prev.map((denom, i) =>
        i === index ? { ...denom, count: denom.count + 1 } : denom
      )
    );
  };

  const handleDecrement = (index: number) => {
    setDenominations(prev =>
      prev.map((denom, i) =>
        i === index ? { ...denom, count: Math.max(0, denom.count - 1) } : denom
      )
    );
  };

  const handleReset = () => {
    setDenominations(initialDenominations);
    setExpectedTotal(0);
    setChangeAmount(0);
    setCalculatedChange([]);
  };

  const handlePrint = () => {
    console.log('Printing cash denomination report...');
    window.print();
  };

  const calculateChange = () => {
    let remaining = changeAmount;
    const change: Denomination[] = [];

    const sortedDenoms = [...initialDenominations].sort((a, b) => b.value - a.value);

    for (const denom of sortedDenoms) {
      if (remaining >= denom.value) {
        const count = Math.floor(remaining / denom.value);
        remaining -= count * denom.value;
        change.push({ ...denom, count });
      }
    }

    setCalculatedChange(change);
  };

  useEffect(() => {
    if (changeAmount > 0) {
      calculateChange();
    } else {
      setCalculatedChange([]);
    }
  }, [changeAmount]);

  const bills = denominations.filter(d => d.type === 'bill');
  const coins = denominations.filter(d => d.type === 'coin');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-white">金種表</h1>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold rounded-full">
            Phase 1
          </span>
        </div>
        <p className="text-neutral-500 dark:text-gray-400">
          レジ内の現金を金種別に集計します
        </p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <i className="fas fa-calculator text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">実際の金額</p>
              <p className="text-2xl font-bold text-neutral-800 dark:text-white">
                ¥{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <i className="fas fa-bullseye text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">想定金額</p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={expectedTotal || ''}
                  onChange={(e) => setExpectedTotal(parseInt(e.target.value) || 0)}
                  placeholder="0"
                  className="text-xl font-bold text-neutral-800 dark:text-white bg-transparent border-b border-gray-300 dark:border-gray-600 w-32 focus:outline-none focus:border-primary-500"
                />
                <span className="text-sm text-neutral-600 dark:text-gray-400">円</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${
              difference === 0
                ? 'bg-green-100 dark:bg-green-900'
                : difference > 0
                ? 'bg-yellow-100 dark:bg-yellow-900'
                : 'bg-red-100 dark:bg-red-900'
            }`}>
              <i className={`${
                difference === 0
                  ? 'fas fa-check text-green-600 dark:text-green-400'
                  : difference > 0
                  ? 'fas fa-plus text-yellow-600 dark:text-yellow-400'
                  : 'fas fa-minus text-red-600 dark:text-red-400'
              }`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-neutral-600 dark:text-gray-400">過不足</p>
              <p className={`text-2xl font-bold ${
                difference === 0
                  ? 'text-green-600 dark:text-green-400'
                  : difference > 0
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {difference > 0 ? '+' : ''}¥{difference.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bills Section */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-money-bill-wave text-primary-500" />
          紙幣
        </h3>
        <div className="space-y-4">
          {bills.map((denom, index) => (
            <div
              key={denom.value}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
            >
              <div className="flex items-center gap-4 flex-1">
                <span className="text-lg font-medium text-neutral-800 dark:text-white min-w-[120px]">
                  {denom.label}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrement(index)}
                    className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    <i className="fas fa-minus text-sm" />
                  </button>
                  <input
                    type="number"
                    value={denom.count || ''}
                    onChange={(e) => handleCountChange(index, e.target.value)}
                    className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                    min="0"
                  />
                  <button
                    onClick={() => handleIncrement(index)}
                    className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                  >
                    <i className="fas fa-plus text-sm" />
                  </button>
                  <span className="text-sm text-neutral-600 dark:text-gray-400 ml-2">枚</span>
                </div>
              </div>
              <div className="text-right min-w-[120px]">
                <span className="text-lg font-bold text-neutral-800 dark:text-white">
                  ¥{(denom.value * denom.count).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Coins Section */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-white mb-4 flex items-center gap-2">
          <i className="fas fa-coins text-primary-500" />
          硬貨
        </h3>
        <div className="space-y-4">
          {coins.map((denom, index) => {
            const actualIndex = bills.length + index;
            return (
              <div
                key={denom.value}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-lg font-medium text-neutral-800 dark:text-white min-w-[120px]">
                    {denom.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrement(actualIndex)}
                      className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                    >
                      <i className="fas fa-minus text-sm" />
                    </button>
                    <input
                      type="number"
                      value={denom.count || ''}
                      onChange={(e) => handleCountChange(actualIndex, e.target.value)}
                      className="w-20 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg"
                      min="0"
                    />
                    <button
                      onClick={() => handleIncrement(actualIndex)}
                      className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                    >
                      <i className="fas fa-plus text-sm" />
                    </button>
                    <span className="text-sm text-neutral-600 dark:text-gray-400 ml-2">枚</span>
                  </div>
                </div>
                <div className="text-right min-w-[120px]">
                  <span className="text-lg font-bold text-neutral-800 dark:text-white">
                    ¥{(denom.value * denom.count).toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Change Calculator */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-white flex items-center gap-2">
            <i className="fas fa-exchange-alt text-primary-500" />
            釣銭計算機
          </h3>
          <button
            onClick={() => setShowChangeCalculator(!showChangeCalculator)}
            className="text-primary-500 hover:text-primary-600 text-sm"
          >
            {showChangeCalculator ? '閉じる' : '開く'}
          </button>
        </div>

        {showChangeCalculator && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                釣銭額を入力
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={changeAmount || ''}
                  onChange={(e) => setChangeAmount(parseInt(e.target.value) || 0)}
                  placeholder="金額を入力"
                  className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg px-4 py-2"
                />
                <span className="text-neutral-600 dark:text-gray-400">円</span>
              </div>
            </div>

            {calculatedChange.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-gray-300 mb-3">
                  最適な釣銭の組み合わせ:
                </h4>
                <div className="space-y-2">
                  {calculatedChange.map((denom) => (
                    <div
                      key={denom.value}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-neutral-600 dark:text-gray-400">
                        {denom.label}
                      </span>
                      <span className="font-medium text-neutral-800 dark:text-white">
                        {denom.count}枚 (¥{(denom.value * denom.count).toLocaleString()})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-3 justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Button variant="secondary" onClick={handleReset}>
          <i className="fas fa-undo" />
          リセット
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          <i className="fas fa-print" />
          印刷
        </Button>
      </motion.div>
    </div>
  );
};
