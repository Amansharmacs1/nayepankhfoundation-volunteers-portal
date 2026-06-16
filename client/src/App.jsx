import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import VolunteerLayout from './layouts/VolunteerLayout';
import AdminLayout from './layouts/AdminLayout';

// Protection
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// Pages
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VolDashboard from './pages/volunteer/Dashboard';
import VolProfile from './pages/volunteer/Profile';
import AdminDashboard from './pages/admin/Dashboard';
import VolunteersList from './pages/admin/VolunteersList';
import AdminSettings from './pages/admin/Settings';
import AdminReports from './pages/admin/Reports';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Volunteer Routes */}
        <Route path="/volunteer" element={<ProtectedRoute />}>
          <Route element={<VolunteerLayout />}>
            <Route path="dashboard" element={<VolDashboard />} />
            <Route path="profile" element={<VolProfile />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="volunteers" element={<VolunteersList />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
