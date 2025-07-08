import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tabConfig } from '../../config/tabConfig';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

export default function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const visibleTabs = tabConfig.filter((tab) => !tab.adminOnly || isAdmin);

  return (
    <aside
      className={`bg-gray-600 text-gray-200 h-full transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-48'
      }`}
    >
      <div className='flex justify-end p-3'>
        <button onClick={() => setCollapsed(!collapsed)}>
          <HiOutlineMenuAlt3 size={24} />
        </button>
      </div>
      <nav className='flex flex-col gap-2 px-2'>
        {visibleTabs.map((tab) => {
          const isActive = location.pathname === tab.route;
          return (
            <div
              key={tab.key}
              className='relative group flex items-center w-full'
            >
              <button
                onClick={() => navigate(tab.route)}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-left w-full transition-all duration-200 ${
                  isActive
                    ? 'bg-sky-700 text-gray-100 font-semibold'
                    : 'hover:bg-gray-800 text-gray-200'
                }`}
              >
                {tab.icon && <tab.icon size={20} />}
                {!collapsed && <span>{tab.label}</span>}
              </button>
              {/* Tooltip */}
              {collapsed && (
                <div className='absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50'>
                  {tab.label}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
