import { useState } from 'react';
import { Bell, Menu, User as UserIcon, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../slices/authSlice';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
      dispatch(logout());
      navigate('/');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10">
      <div className="flex items-center md:hidden">
        <button className="text-gray-500 hover:text-gray-700">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div className="flex-1 md:flex-none"></div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-gray-500 relative p-1 rounded-full hover:bg-gray-100 transition-colors">
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-white" />
        </button>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              {userInfo?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="ml-2 hidden md:block text-sm font-medium text-gray-700">
              {userInfo?.name}
            </span>
          </button>

          {dropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setDropdownOpen(false)} 
              ></div>
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-20">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900 truncate">{userInfo?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{userInfo?.email}</p>
                </div>
                <button
                  onClick={() => { 
                    setDropdownOpen(false); 
                    navigate(userInfo?.role === 'admin' ? '/admin/settings' : '/volunteer/profile'); 
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  {userInfo?.role === 'admin' ? (
                    <><SettingsIcon className="h-4 w-4 mr-2 text-gray-500" /> Settings</>
                  ) : (
                    <><UserIcon className="h-4 w-4 mr-2 text-gray-500" /> Your Profile</>
                  )}
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2 text-red-500" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
