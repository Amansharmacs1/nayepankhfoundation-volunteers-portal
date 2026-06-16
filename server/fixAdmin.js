import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const admin = await User.findOne({ email: 'admin@nayepankh.org' });
  if (admin) {
    admin.password = 'adminpassword123';
    await admin.save();
    console.log('Password successfully reset to: adminpassword123');
  } else {
    console.log('Admin not found!');
  }
  process.exit();
})();
