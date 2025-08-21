import { fetchWithToken, getAuthToken } from './api.js';

/**
 * Product service for managing product data
 */

/**
 * Fetches all products
 * @param {AbortSignal} signal - Abort signal for request cancellation
 * @returns {Promise<Array>} - Array of products
 */
export const fetchProducts = (signal) => {
  return fetch('/products/all', { signal })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    });
};

/**
 * Fetches a single product by ID
 * @param {string|number} productId - Product ID
 * @returns {Promise<Object>} - Product data
 */
export const fetchProduct = (productId) => {
  const token = getAuthToken();
  return fetchWithToken('GET', token, `/products/${productId}`, null)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      return response.json();
    });
};

/**
 * Creates a new product
 * @param {Object} productData - Product data
 * @param {string} productData.name - Product name
 * @param {string} productData.type - Product type/category
 * @param {string} productData.description - Product description
 * @param {number} productData.price - Product price
 * @returns {Promise<Response>} - Creation response
 */
export const createProduct = (productData) => {
  const token = getAuthToken();
  return fetchWithToken('POST', token, '/products', productData)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create product');
      }
      return response;
    });
};