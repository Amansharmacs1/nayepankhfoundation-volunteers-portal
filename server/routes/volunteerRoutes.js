import express from 'express';
import {
  updateProfile,
  getNotifications,
  markNotificationRead,
} from '../controllers/volunteerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').put(protect, updateProfile);
router.route('/notifications').get(protect, getNotifications);
router.route('/notifications/:id/read').put(protect, markNotificationRead);

export default router;
