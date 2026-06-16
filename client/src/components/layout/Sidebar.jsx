import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, User } from 'lucide-react';

const Sidebar = ({ role }) => {
  const location = useLocation();
  
  const volunteerLinks = [
    { name: 'Dashboard', path: '/volunteer/dashboard', icon: LayoutDashboard },
    { name: 'Profile', path: '/volunteer/profile', icon: User },
    // { name: 'ID Card', path: '/volunteer/id-card', icon: FileText },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
    // { name: 'Reports', path: '/admin/reports', icon: FileText },
  ];

  const links = role === 'admin' ? adminLinks : volunteerLinks;

  return (
    <aside className="w-64 bg-dark text-white hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://assets.zyrosite.com/YKbL494Mv8Ip3qgy/logo-AVLW2LLWZkI8v845.png" alt="NayePankh Logo" className="h-8 bg-white p-1 rounded" />
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.path);
          
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">System</div>
        <Link
          to={`/${role}/settings`}
          className="flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Settings className="mr-3 h-5 w-5 text-gray-400" />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
