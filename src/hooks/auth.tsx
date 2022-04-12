import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '@services/api';

interface User {
  id: string;
  firstName: string,
  lastName: string,
  phoneNumber: string,
  emailAddress: string;
  //avatar_url: string;
}

interface AuthState {
  jwt: string;
  user: User;
}

interface SignUpCredentials {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
}

interface SignInCredentials {
  emailAddress: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signUp(credentials: SignUpCredentials): void;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const jwt = localStorage.getItem('@fromto:jwt');
    const user = localStorage.getItem('@fromto:user');

    if (jwt && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
      return { jwt, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signUp = useCallback(async ({ firstName, lastName, emailAddress, phoneNumber, password }: SignUpCredentials) => {
    try {
      await api.post('signup', {
        firstName,
        lastName,
        emailAddress,
        phoneNumber,
        password
      });
    } catch(error){
      console.log(error)
    }
  }, []);

  const signIn = useCallback(async ({ emailAddress, password }: SignInCredentials) => {

    try {
      const response = await api.post('login', {
        emailAddress,
        password,
      });

      console.log(response.data)

      const user: User = {
        id: response.data.id,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        phoneNumber: response.data.phoneNumber,
        emailAddress: response.data.emailAddress
      }
  
      const { jwt } = response.data;
  
      if(jwt && user){ 
        localStorage.setItem('@fromto:jwt', jwt);
        localStorage.setItem('@fromto:user', JSON.stringify(user));
        api.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
        
        setData({ jwt, user });
      }
    } catch (error) {
     console.log(error) 
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@fromto:jwt');
    localStorage.removeItem('@fromto:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@fromto:user', JSON.stringify(user));
      setData({
        jwt: data.jwt,
        user,
      });
    },
    [setData, data.jwt],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signUp, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
