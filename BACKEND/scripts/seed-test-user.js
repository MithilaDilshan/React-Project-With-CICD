import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({path: '.env'}); 
import User from '../models/auth.js'; 

const MONGODB_URL = process.env.MONGODB_URL;

async function seedUser() {
  try {
    await mongoose.connect(MONGODB_URL);

    const email = 'test2.student@sliit.lk';
    const password = 'Test@123';

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('✅ Test user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username: 'Test Student',
      email,
      password: hashedPassword,
      role: 'student',
    });

    console.log('✅ Test user seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedUser();