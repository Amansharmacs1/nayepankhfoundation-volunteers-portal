import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@nayepankh.org' });
    
    if (adminExists) {
      console.log('Admin user already exists! You can log in with:');
      console.log('Email: admin@nayepankh.org');
      console.log('Password: (Whatever password you set previously)');
      process.exit();
    }

    const adminUser = await User.create({
      name: 'NayePankh Admin',
      email: 'admin@nayepankh.org',
      password: 'adminpassword123',
      role: 'admin',
      status: 'Approved' // Admins don't need approval
    });

    console.log('Admin user successfully created!');
    console.log('--------------------------------');
    console.log('Email: admin@nayepankh.org');
    console.log('Password: adminpassword123');
    console.log('--------------------------------');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
