/**
 * Utility functions for generating unique IDs
 */

/**
 * Generates a unique ID using timestamp and random string
 * @returns A unique string identifier
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
