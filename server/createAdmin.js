import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    const args = process.argv.slice(2);
    
    if (args.length < 3) {
      console.log('❌ Error: Missing arguments.');
      console.log('Usage: node createAdmin.js "Admin Name" "email@example.com" "password123"');
      process.exit(1);
    }

    const [name, email, password] = args;

    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      if (existingUser.role === 'admin') {
        console.log(`✅ User ${email} is already an admin.`);
      } else {
        // Upgrade existing user to admin
        existingUser.role = 'admin';
        existingUser.status = 'Approved';
        await existingUser.save();
        console.log(`✅ Existing user ${email} upgraded to Admin successfully!`);
      }
      process.exit(0);
    }

    // Create new admin
    await User.create({
      name,
      email,
      password,
      role: 'admin',
      status: 'Approved' // Admins are automatically approved
    });

    console.log(`✅ New Admin successfully created!`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    process.exit(0);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
