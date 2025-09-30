/**
 * @summary
 * Test fixtures for user data
 */

export const testUsers = [
  {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: '$2b$10$abcdefghijklmnopqrstuvwxyz' // Hashed version of 'password123'
  },
  {
    id: 2,
    name: 'Another User',
    email: 'another@example.com',
    password: '$2b$10$abcdefghijklmnopqrstuvwxyz' // Hashed version of 'password123'
  }
];

export const validUserCredentials = {
  email: 'test@example.com',
  password: 'password123'
};

export const invalidUserCredentials = {
  email: 'test@example.com',
  password: 'wrongpassword'
};

export const newUserData = {
  name: 'New User',
  email: 'newuser@example.com',
  password: 'newpassword123'
};
