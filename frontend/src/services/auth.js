import { fetchWithToken } from './api.js';

/**
 * Authentication service for user login and registration
 */

/**
 * Logs in a user with credentials
 * @param {Object} credentials - User credentials
 * @param {string} credentials.clientName - Username
 * @param {string} credentials.password - Password
 * @returns {Promise<Response>} - Login response
 */
export const loginUser = (credentials) => {
  return fetchWithToken('POST', null, '/login', credentials)
    .then((response) => {
      if (response.status === 404) {
        throw new Error('Username not found!');
      } else if (response.status === 401) {
        throw new Error('Wrong password!');
      } else if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const token = response.headers.get('Authorization');
      if (token) {
        return { token };
      }
      throw new Error('No token received');
    });
};

/**
 * Creates a new user account
 * @param {Object} userData - New user data
 * @param {string} userData.clientName - Username
 * @param {string} userData.password - Password
 * @returns {Promise<Response>} - Registration response
 */
export const createNewUser = (userData) => {
  return fetchWithToken('POST', null, '/clients', userData)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      return response;
    });
};