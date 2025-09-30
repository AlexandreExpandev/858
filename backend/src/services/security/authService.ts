import bcrypt from 'bcrypt';
import { User, UserCreateParams } from './securityTypes';

// In-memory user storage (in a real app, this would be in a database)
const users: User[] = [];
let nextUserId = 1;

/**
 * @summary
 * Validates user credentials
 */
export async function validateCredentials(email: string, password: string): Promise<User | null> {
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return null;
  }
  
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  
  if (!passwordMatch) {
    return null;
  }
  
  return user;
}

/**
 * @summary
 * Creates a new user
 */
export async function createUser(params: UserCreateParams): Promise<User> {
  // Check if user already exists
  const existingUser = users.find(u => u.email === params.email);
  if (existingUser) {
    throw new Error('UserAlreadyExists');
  }
  
  // Hash password
  const passwordHash = await bcrypt.hash(params.password, 10);
  
  // Create new user
  const newUser: User = {
    id: nextUserId++,
    name: params.name,
    email: params.email,
    passwordHash,
    createdAt: new Date()
  };
  
  users.push(newUser);
  
  return newUser;
}

/**
 * @summary
 * Gets a user by ID
 */
export async function getUserById(id: number): Promise<User | null> {
  return users.find(u => u.id === id) || null;
}
