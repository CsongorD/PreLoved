import { createContext, useCallback, useEffect, useState } from 'react';
import { getAuthToken, removeAuthToken, setAuthToken } from '../services/api.js';

export const ClientContext = createContext();

export const ClientContextProvider = ({ children }) => {
  const [client, setClient] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((tokenData) => {
    if (tokenData?.token) {
      setAuthToken(tokenData.token);
      setClient(tokenData.token);
    } else if (typeof tokenData === 'string') {
      setClient(tokenData);
    } else {
      setClient(null);
    }
  }, []);

  const logout = useCallback(() => {
    removeAuthToken();
    setClient(null);
  }, []);

  const checkAuthState = useCallback(() => {
    const authToken = getAuthToken();
    if (authToken && authToken !== '') {
      setClient(authToken);
    } else {
      setClient(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const value = {
    client,
    isLoading,
    login,
    logout,
    isAuthenticated: !!client,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};