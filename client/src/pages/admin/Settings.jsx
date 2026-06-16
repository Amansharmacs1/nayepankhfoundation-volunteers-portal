import { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { UserPlus, ShieldAlert, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [admins, setAdmins] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/admin/admins');
      setAdmins(res.data);
    } catch (error) {
      toast.error('Failed to fetch admins');
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error('Please fill all fields');
    }

    try {
      setLoading(true);
      const res = await api.post('/admin/create-admin', formData);
      toast.success(res.data.message);
      setFormData({ name: '', email: '', password: '' });
      fetchAdmins(); // Refresh the list
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (window.confirm('Are you sure you want to delete this administrator? This action cannot be undone.')) {
      try {
        await api.delete(`/admin/admins/${id}`);
        toast.success('Admin deleted successfully');
        fetchAdmins();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete admin');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-gray-500">Manage your application preferences and administrators.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" /> Add New Administrator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-6">
              Create a new admin account or upgrade an existing volunteer to admin by entering their email address.
            </p>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Admin Name"
              />
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@nayepankh.org"
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Strong password"
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 'Create Admin Account'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" /> Current Administrators
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {fetchLoading ? (
              <p className="text-sm text-gray-500">Loading administrators...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr key={admin._id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{admin.name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{admin.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(admin.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                          {userInfo._id !== admin._id && (
                            <button 
                              onClick={() => handleDeleteAdmin(admin._id)} 
                              className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-md transition-colors"
                              title="Delete Admin"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                          {userInfo._id === admin._id && (
                            <span className="text-xs text-gray-400 italic">Current User</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {admins.length === 0 && (
                      <tr>
                        <td colSpan="4" className="px-4 py-3 text-center text-sm text-gray-500">No admins found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
