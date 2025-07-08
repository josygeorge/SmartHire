// components/LogoutButton.tsx
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store/useAuthStore';

export default function LogoutButton() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/signin');
  };

  return (
    <button
      onClick={handleLogout}
      className='px-2 py-1 text-red-600 bg-gray-200 rounded hover:bg-gray-300'
    >
      Logout
    </button>
  );
}
