import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CreditCard, CheckCircle, Clock, XCircle, Bell, Download } from 'lucide-react';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import api from '../../utils/api';

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/volunteer/notifications');
        setNotifications(res.data);
      } catch (error) {
        console.error('Failed to fetch notifications');
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Approved': return <CheckCircle className="h-10 w-10 text-success" />;
      case 'Rejected': return <XCircle className="h-10 w-10 text-danger" />;
      default: return <Clock className="h-10 w-10 text-warning" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {userInfo?.name.split(' ')[0]}!</h1>
          <p className="text-gray-500">Here is an overview of your volunteer profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Application Status Card */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`p-6 rounded-lg border ${getStatusColor(userInfo?.status)} flex items-center gap-6`}>
              {getStatusIcon(userInfo?.status)}
              <div>
                <h3 className="text-xl font-bold capitalize">{userInfo?.status}</h3>
                <p className="mt-1 opacity-90">
                  {userInfo?.status === 'Pending' && 'Your application is currently under review by our team. We will notify you once a decision is made.'}
                  {userInfo?.status === 'Approved' && 'Congratulations! Your application has been approved. You are now an official NayePankh Volunteer.'}
                  {userInfo?.status === 'Rejected' && 'Unfortunately, your application was not approved at this time. Please check notifications for remarks.'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer ID Card Preview (Only if approved) */}
        {userInfo?.status === 'Approved' && userInfo?.volunteerId ? (
          <Card className="col-span-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Digital ID Card</CardTitle>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center pb-8">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=NVMS:${userInfo?.volunteerId}`} 
                alt="QR Code" 
                className="w-32 h-32 mb-4 border p-1 rounded-lg"
              />
              <p className="text-sm text-gray-500 mb-1">Volunteer ID</p>
              <p className="font-mono font-bold text-lg text-primary">{userInfo?.volunteerId}</p>
              
              <Button variant="outline" className="w-full mt-6 flex items-center justify-center gap-2">
                <Download className="h-4 w-4" /> Download PDF
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Digital ID Card</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-48 text-center bg-gray-50 rounded-lg m-6 mt-0">
              <CreditCard className="h-12 w-12 text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">Your ID card will appear here once approved.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 border-b">
          <Bell className="h-5 w-5 text-primary" />
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <div className="divide-y divide-gray-100">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">You have no new notifications.</div>
          ) : (
            notifications.map((notif) => (
              <div key={notif._id} className={`p-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-orange-50/50' : ''}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`text-sm font-medium ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
