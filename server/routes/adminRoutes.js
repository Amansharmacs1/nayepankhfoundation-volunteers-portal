import express from 'express';
import {
  getVolunteers,
  getVolunteerById,
  updateVolunteerStatus,
  deleteVolunteer,
  getAnalytics,
  createAdminUser,
  getAdmins,
  deleteAdmin,
  exportVolunteersCsv,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/volunteers').get(protect, admin, getVolunteers);
router.route('/volunteers/:id').get(protect, admin, getVolunteerById).delete(protect, admin, deleteVolunteer);
router.route('/volunteers/:id/status').put(protect, admin, updateVolunteerStatus);
router.route('/analytics').get(protect, admin, getAnalytics);
router.route('/create-admin').post(protect, admin, createAdminUser);
router.route('/admins').get(protect, admin, getAdmins);
router.route('/admins/:id').delete(protect, admin, deleteAdmin);
router.route('/export/volunteers').get(protect, admin, exportVolunteersCsv);

export default router;
