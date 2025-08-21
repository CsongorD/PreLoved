import { useContext } from 'react';
import { ClientContext } from '../context/ClientContext.jsx';

/**
 * Custom hook for accessing authentication context
 * @returns {Object} - Authentication context value
 */
export const useAuth = () => {
  const context = useContext(ClientContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within a ClientContextProvider');
  }
  
  return context;
};