import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  tenantName?: string;
}

export const Header: React.FC<HeaderProps> = ({ tenantName = "エン株式会社様" }) => {
  return (
    <motion.header 
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <a href="#" className="flex items-center gap-3 text-xl font-semibold text-gray-800 hover:text-primary-600 transition-colors">
          <motion.i 
            className="fas fa-dance text-primary-500"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          ConnectEn
        </a>
        <span className="text-sm text-gray-600 ml-4">{tenantName}</span>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
          data-tooltip="通知"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-bell text-lg" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
          </span>
        </motion.button>

        <motion.button
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
          data-tooltip="設定"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-cog text-lg" />
        </motion.button>

        <motion.button
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
          data-tooltip="ユーザーメニュー"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-user text-lg" />
        </motion.button>
      </div>
    </motion.header>
  );
};