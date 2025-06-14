import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);

// Schema for User model for strong typing
//  ✅ Represents the full user object from MongoDB

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
};

// ✅ Input when creating a user (request body)
export type UserCreateType = Omit<UserType, '_id' | 'createdAt' | 'updatedAt'>;

// ✅ Input when updating a user (patch body)
export type UserUpdateType = Partial<UserCreateType>;

// ✅ Input for login
export type UserLoginType = Pick<UserType, 'email' | 'password'>;

// ✅ Output to client — password removed
export type UserResponseType = Omit<UserType, 'password'>;

// ✅ Array of users, e.g., for `/api/users`
export type UserListResponseType = UserResponseType[];
