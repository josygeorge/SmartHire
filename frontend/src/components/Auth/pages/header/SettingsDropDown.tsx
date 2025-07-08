import { useAuthStore } from '../../../../store/useAuthStore';
import LogoutButton from './LogoutButton';
import { useEffect, useState, useRef } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/16/solid';

export default function SettingsDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const { email } = useAuthStore();
  // Ref to track the dropdown element
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Logic to disappear dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative inline-block text-right' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none'
      >
        <Cog6ToothIcon className='h-5 w-5 text-sky-600' />
        Settings
      </button>
      {isOpen && (
        // Dropdown menu
        <div className='dropdown absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-md border z-50 p-2'>
          <p className='text-sm font-medium text-gray-600 break-words mb-2'>
            {email}
          </p>
          <LogoutButton />
        </div>
        /* <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10'>
          <div className='px-4 py-2 text-sm text-gray-700'>
            <p className='text-sky-700'>{email}</p>
          </div>
          <div className='border-t border-gray-200'></div>
          <LogoutButton />
        </div> */
      )}
    </div>
  );
}
