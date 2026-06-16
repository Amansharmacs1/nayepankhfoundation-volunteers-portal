import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    college: {
      type: String,
    },
    course: {
      type: String,
    },
    year: {
      type: String,
    },
    city: {
      type: String,
    },
    skills: {
      type: [String],
    },
    interests: {
      type: [String],
    },
    availability: {
      type: String,
    },
    photo: {
      type: String,
      default: '',
    },
    resume: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['volunteer', 'admin'],
      default: 'volunteer',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    volunteerId: {
      type: String,
      unique: true,
      sparse: true,
    },
    remarks: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
