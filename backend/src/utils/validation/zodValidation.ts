import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas for reuse across the application
 */

// String validations
export const zString = z.string();
export const zNonEmptyString = z.string().min(1, 'Field cannot be empty');
export const zEmail = z.string().email('Invalid email format');

// Numeric validations
export const zNumber = z.number();
export const zPositiveNumber = z.number().positive('Must be a positive number');
export const zInteger = z.number().int('Must be an integer');

// Boolean validations
export const zBoolean = z.boolean();

// Date validations
export const zDate = z.date();
export const zDateString = z.string().refine(
  (value) => !isNaN(Date.parse(value)),
  { message: 'Invalid date format' }
);

// Counter specific validations
export const zCounterSpeed = z.enum(['slow', 'medium', 'fast']);
