import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  tenantName?: string;
}

export const Header: React.FC<HeaderProps> = ({ tenantName = "エン株式会社様" }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<'ja' | 'en'>('ja');

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }

    const savedLang = localStorage.getItem('language') as 'ja' | 'en' || 'ja';
    setLanguage(savedLang);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'ja' ? 'en' : 'ja';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <motion.header
      className="bg-white dark:bg-gray-800 shadow-sm border-b border-neutral-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        <a href="#" className="flex items-center gap-3 text-xl font-semibold text-neutral-800 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <motion.i
            className="fas fa-dance text-primary-500 dark:text-primary-400"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          ConnectEn
        </a>
        <span className="text-sm text-neutral-500 dark:text-gray-400 ml-4">{tenantName}</span>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          className="relative p-2 text-neutral-500 dark:text-gray-400 hover:text-neutral-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
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
          onClick={toggleLanguage}
          className="p-2 text-neutral-500 dark:text-gray-400 hover:text-neutral-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 font-semibold"
          data-tooltip={language === 'ja' ? '日本語 / English' : 'Japanese / English'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm">{language === 'ja' ? 'EN' : 'JP'}</span>
        </motion.button>

        <motion.button
          onClick={toggleDarkMode}
          className="p-2 text-neutral-500 dark:text-gray-400 hover:text-neutral-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          data-tooltip={darkMode ? "ライトモード" : "ダークモード"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-lg`} />
        </motion.button>

        <motion.button
          className="p-2 text-neutral-500 dark:text-gray-400 hover:text-neutral-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
          data-tooltip="設定"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <i className="fas fa-cog text-lg" />
        </motion.button>

        <motion.button
          className="p-2 text-neutral-500 dark:text-gray-400 hover:text-neutral-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
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