import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  tenantName?: string;
}

export const Header: React.FC<HeaderProps> = ({ tenantName = "エン株式会社様" }) => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-lavender-50 to-rose-50 shadow-sm border-b border-neutral-200 px-6 py-4 flex items-center justify-between backdrop-blur-sm"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <a href="#" className="flex items-center gap-3 text-xl font-semibold text-neutral-800 hover:text-primary-600 transition-colors">
          <motion.i 
            className="fas fa-dance text-primary-500"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          ConnectEn
        </a>
        <span className="text-sm text-neutral-500 ml-4">{tenantName}</span>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          className="relative p-2 text-neutral-500 hover:text-neutral-700 hover:bg-lavender-50 rounded-lg transition-all duration-200"
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
          className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-lavender-50 rounded-lg transition-all duration-200"
          data-tooltip="設定"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-cog text-lg" />
        </motion.button>

        <motion.button
          className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-lavender-50 rounded-lg transition-all duration-200"
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