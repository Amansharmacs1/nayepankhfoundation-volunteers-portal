import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Get all volunteers
// @route   GET /api/admin/volunteers
// @access  Private/Admin
const getVolunteers = async (req, res, next) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    // Search keyword
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { email: { $regex: req.query.keyword, $options: 'i' } },
            { college: { $regex: req.query.keyword, $options: 'i' } },
            { city: { $regex: req.query.keyword, $options: 'i' } },
          ],
        }
      : {};

    // Filter by status
    const statusFilter = req.query.status ? { status: req.query.status } : {};

    const query = { ...keyword, ...statusFilter, role: 'volunteer' };

    const count = await User.countDocuments(query);
    const volunteers = await User.find(query)
      .select('-password')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({ volunteers, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    next(error);
  }
};

// @desc    Get volunteer by ID
// @route   GET /api/admin/volunteers/:id
// @access  Private/Admin
const getVolunteerById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('Volunteer not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update volunteer status
// @route   PUT /api/admin/volunteers/:id/status
// @access  Private/Admin
const updateVolunteerStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.status = req.body.status || user.status;
      user.remarks = req.body.remarks || user.remarks;

      if (req.body.status === 'Approved' && !user.volunteerId) {
        user.volunteerId = `NVMS-${Math.floor(100000 + Math.random() * 900000)}`;
      }

      const updatedUser = await user.save();

      // Create notification
      await Notification.create({
        title: `Application ${updatedUser.status}`,
        message: `Your volunteer application has been ${updatedUser.status.toLowerCase()}. ${updatedUser.remarks ? `Remarks: ${updatedUser.remarks}` : ''}`,
        userId: updatedUser._id,
      });

      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error('Volunteer not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Delete volunteer
// @route   DELETE /api/admin/volunteers/:id
// @access  Private/Admin
const deleteVolunteer = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await User.deleteOne({ _id: user._id });
      res.json({ message: 'Volunteer removed' });
    } else {
      res.status(404);
      throw new Error('Volunteer not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAnalytics = async (req, res, next) => {
  try {
    const total = await User.countDocuments({ role: 'volunteer' });
    const approved = await User.countDocuments({ role: 'volunteer', status: 'Approved' });
    const pending = await User.countDocuments({ role: 'volunteer', status: 'Pending' });
    const rejected = await User.countDocuments({ role: 'volunteer', status: 'Rejected' });

    // Registrations per month (simple aggregation)
    const monthlyData = await User.aggregate([
      { $match: { role: 'volunteer' } },
      {
        $group: {
          _id: { $month: '$createdAt' },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Format monthly data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyRegistrations = monthlyData.map((d) => ({
      name: months[d._id - 1],
      uv: d.count,
    }));

    res.json({
      cards: { total, approved, pending, rejected },
      charts: { monthlyRegistrations },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new admin
// @route   POST /api/admin/create
// @access  Private/Admin
const createAdminUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      if (userExists.role === 'admin') {
        res.status(400);
        throw new Error('User is already an admin');
      } else {
        userExists.role = 'admin';
        userExists.status = 'Approved';
        await userExists.save();
        return res.status(200).json({ message: 'Existing volunteer upgraded to admin successfully' });
      }
    }

    await User.create({
      name,
      email,
      password,
      role: 'admin',
      status: 'Approved',
    });

    res.status(201).json({ message: 'New admin created successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all admins
// @route   GET /api/admin/admins
// @access  Private/Admin
const getAdmins = async (req, res, next) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an admin
// @route   DELETE /api/admin/admins/:id
// @access  Private/Admin
const deleteAdmin = async (req, res, next) => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user._id.toString()) {
      res.status(400);
      throw new Error('You cannot delete your own admin account');
    }

    const adminUser = await User.findById(req.params.id);

    if (adminUser && adminUser.role === 'admin') {
      await User.deleteOne({ _id: adminUser._id });
      res.json({ message: 'Admin removed successfully' });
    } else {
      res.status(404);
      throw new Error('Admin not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Export volunteers as CSV
// @route   GET /api/admin/export/volunteers
// @access  Private/Admin
const exportVolunteersCsv = async (req, res, next) => {
  try {
    const volunteers = await User.find({ role: 'volunteer' }).sort({ createdAt: -1 });
    
    // Manual CSV generation
    const headers = ['Name', 'Email', 'Phone', 'College', 'Course', 'Year', 'City', 'Status', 'Applied On'];
    
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    for (const vol of volunteers) {
      const row = [
        `"${vol.name || ''}"`,
        `"${vol.email || ''}"`,
        `"${vol.phone || ''}"`,
        `"${vol.college || ''}"`,
        `"${vol.course || ''}"`,
        `"${vol.year || ''}"`,
        `"${vol.city || ''}"`,
        `"${vol.status || ''}"`,
        `"${new Date(vol.createdAt).toLocaleDateString()}"`
      ];
      csvRows.push(row.join(','));
    }
    
    const csvString = csvRows.join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=volunteers.csv');
    res.status(200).send(csvString);
  } catch (error) {
    next(error);
  }
};

export {
  getVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
  deleteVolunteer,
  getAnalytics,
  createAdminUser,
  getAdmins,
  deleteAdmin,
  exportVolunteersCsv,
};
