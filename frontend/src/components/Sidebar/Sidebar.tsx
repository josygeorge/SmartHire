// Toggle Sidebar and Dark Mode
// This component provides a sidebar with navigation links and a toggle for dark mode.
// It uses React Router for navigation and maintains state for collapsed view and dark mode.

import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tabConfig } from '../../config/tabConfig';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { BsSun, BsMoon } from 'react-icons/bs';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default
  const navigate = useNavigate();
  const location = useLocation();

  const visibleTabs = tabConfig.filter((tab) => !tab.adminOnly || isAdmin);

  const isActive = (route: string) => location.pathname === route;

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('sidebar-theme');
    if (storedTheme === 'light') setDarkMode(false);
  }, []);

  // Save to localStorage on theme change
  useEffect(() => {
    localStorage.setItem('sidebar-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <aside
      className={twMerge(
        clsx(
          'h-full transition-all duration-300 ease-in-out',
          collapsed ? 'w-16' : 'w-52',
          darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'
        )
      )}
    >
      <div className='flex justify-between items-center p-3'>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={darkMode ? 'toggle-dark-mode-custom-btn' : ''}
        >
          <HiOutlineMenuAlt3 size={22} />
        </button>
        {!collapsed && (
          <button
            onClick={() => setDarkMode(!darkMode)}
            title='Toggle Menu Theme'
          >
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>
        )}
      </div>

      <nav className='flex flex-col gap-2 px-2'>
        {visibleTabs.map((tab) => (
          <div
            key={tab.key}
            className='relative group flex items-center w-full'
          >
            <button
              onClick={() => navigate(tab.route)}
              className={twMerge(
                clsx(
                  'flex items-center gap-3 px-4 py-2 rounded-md w-full text-left transition-all duration-200',
                  {
                    'bg-sky-700 text-white font-semibold':
                      darkMode && isActive(tab.route),
                    'bg-blue-100 text-blue-800 font-semibold':
                      !darkMode && isActive(tab.route),
                    'hover:bg-gray-700 text-gray-200':
                      darkMode && !isActive(tab.route),
                    'hover:bg-gray-100 text-gray-800':
                      !darkMode && !isActive(tab.route),
                  }
                )
              )}
            >
              {tab.icon && <tab.icon size={20} />}
              {!collapsed && <span className='truncate'>{tab.label}</span>}
            </button>

            {/* Tooltip for collapsed view */}
            {collapsed && (
              <div
                className={twMerge(
                  clsx(
                    'absolute left-full ml-2 top-1/2 -translate-y-1/2 text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50',
                    darkMode
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-200 text-black'
                  )
                )}
              >
                {tab.label}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
