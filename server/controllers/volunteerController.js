import User from '../models/User.js';
import Notification from '../models/Notification.js';

// @desc    Update user profile
// @route   PUT /api/volunteer/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.college = req.body.college || user.college;
      user.course = req.body.course || user.course;
      user.year = req.body.year || user.year;
      user.city = req.body.city || user.city;
      user.skills = req.body.skills || user.skills;
      user.interests = req.body.interests || user.interests;
      user.availability = req.body.availability || user.availability;

      if (req.body.password) {
        user.password = req.body.password;
      }

      // Handle photo and resume URLs if uploaded
      if (req.body.photo) user.photo = req.body.photo;
      if (req.body.resume) user.resume = req.body.resume;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get volunteer notifications
// @route   GET /api/volunteer/notifications
// @access  Private
const getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark notification as read
// @route   PUT /api/volunteer/notifications/:id/read
// @access  Private
const markNotificationRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (notification && notification.userId.toString() === req.user._id.toString()) {
      notification.read = true;
      await notification.save();
      res.json({ message: 'Notification marked as read' });
    } else {
      res.status(404);
      throw new Error('Notification not found');
    }
  } catch (error) {
    next(error);
  }
};

export {
  updateProfile,
  getNotifications,
  markNotificationRead,
};
