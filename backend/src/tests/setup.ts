/**
 * @summary
 * Global test setup file
 */

// This file contains setup code that runs before tests
// It can include mocking global objects, setting up test database connections, etc.

// Example: Mock the logger to prevent console output during tests
jest.mock('../utils/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn()
  }
}));

// Example: Set up test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
