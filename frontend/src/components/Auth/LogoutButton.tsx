// components/LogoutButton.tsx
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

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
      className='px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700'
    >
      Logout
    </button>
  );
}
