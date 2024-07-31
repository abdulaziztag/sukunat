import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  SetStateAction,
  Dispatch,
  JSX,
} from 'react';
import {getTokens} from 'utils/tokens.ts';

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated?: Dispatch<SetStateAction<boolean>>;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
}>({isAuthenticated: false});

export const AuthProvider: React.FC<{children: JSX.Element}> = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getTokens();
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{isAuthenticated, setIsAuthenticated, setIsLoading}}>
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
