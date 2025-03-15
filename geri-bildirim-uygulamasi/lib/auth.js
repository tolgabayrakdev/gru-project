import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password with hashed password
export const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Set JWT token in cookie
export const setTokenCookie = (token) => {
  cookies().set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
};

// Get JWT token from cookie
export const getTokenCookie = () => {
  return cookies().get('token')?.value;
};

// Remove JWT token from cookie
export const removeTokenCookie = () => {
  cookies().delete('token');
};

// Get current user from token
export const getCurrentUser = async (token) => {
  if (!token) return null;
  
  try {
    const decoded = verifyToken(token);
    if (!decoded) return null;
    
    return decoded;
  } catch (error) {
    return null;
  }
}; 