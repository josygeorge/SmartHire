import { Request, Response } from 'express';
import { User } from '../models/User.model';
import crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from '../utils/sendResetEmail';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// Function to generate JWT token
// Registered users will receive a JWT token upon successful login
export const register = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '2d',
    });

    res.status(201).json({ token, user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Function to handle user login
export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '2d',
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Function to handle password reset request
export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'User not found' });
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    await sendResetEmail(email, token);
    res.json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to handle password reset
export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res
        .status(400)
        .json({ error: 'Token and new password are required' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Reset link is invalid or expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Unable to reset password. Try again.' });
  }
};
