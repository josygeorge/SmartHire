import { useAuthStore } from '../../store/useAuthStore';
import { useEffect, useState, useRef } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/16/solid';
import LogoutButton from './LogoutButton';

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
        className='flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 focus:outline-none'
      >
        <Cog6ToothIcon className='h-5 w-5 text-sky-600' />
        Settings
      </button>
      {isOpen && (
        /* Dropdown menu */
        /* dropdown menu adjust its width based on the email length, use min-w, max-w, and w-fit */
        <div className='dropdown absolute right-0 mt-2 min-w-[12rem] max-w-xs w-fit bg-white shadow-lg rounded-md border z-50 p-2'>
          {/* Improve email wrapping (if it's very long). Add styles to break long email strings */}
          <p className='text-sm font-semibold text-gray-400 mb-2'>{email}</p>
          <LogoutButton />
        </div>
      )}
    </div>
  );
}
