/**
 * Core API service for making HTTP requests with authentication
 */

const API_BASE_URL = '';

/**
 * Makes an authenticated HTTP request
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
 * @param {string|null} token - Authentication token
 * @param {string} url - API endpoint URL
 * @param {Object|null} body - Request body data
 * @returns {Promise<Response>} - Fetch response promise
 */
export const fetchWithToken = (method, token, url, body = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const fetchOptions = {
    method,
    headers,
  };

  if (body !== null) {
    fetchOptions.body = JSON.stringify(body);
  }

  if (token !== null) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${url}`, fetchOptions);
};

/**
 * Gets the stored authentication token
 * @returns {string|null} - Authentication token or null
 */
export const getAuthToken = () => {
  return localStorage.getItem('Token');
};

/**
 * Stores the authentication token
 * @param {string} token - Authentication token
 */
export const setAuthToken = (token) => {
  localStorage.setItem('Token', token);
};

/**
 * Removes the authentication token
 */
export const removeAuthToken = () => {
  localStorage.setItem('Token', '');
};