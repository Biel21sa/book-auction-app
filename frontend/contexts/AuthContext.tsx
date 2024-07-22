'use client';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { envAwareFetch } from '../services/api';

type SignInPayload = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: any | null;
  signIn: (data: SignInPayload) => Promise<void>;
  signOut: () => void;
};

type TokenType = {
  sub: string;
  account: string;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const router = useRouter();
  const [userFromStorage, setUserFromStorage] = useLocalStorage('lpm-app.user');
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAndSetUser = useCallback(async () => {
    try {
      const token = parseCookies()['lpm-app.token'];

      if (!token) return null;

      const tokenDecoded: TokenType = jwtDecode(token);

      if (
        userFromStorage &&
        userFromStorage.accountId === tokenDecoded.account &&
        userFromStorage.id === tokenDecoded.sub
      )
        return userFromStorage;

      const response: any = await envAwareFetch(
        `/users/${tokenDecoded.account}/${tokenDecoded.sub}`
      );

      if (!response || !response?.id)
        throw new Error('Erro ao recuperar usuário');

      localStorage.setItem('lpm-app.user', JSON.stringify(response));

      return response;
    } catch (error) {
      localStorage.removeItem('lpm-app.user');
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLoading(true);
    getAndSetUser()
      .then((response: any | null) => {
        setUser(response);
      })
      .catch((error) => {
        setError(true);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [getAndSetUser]);

  async function signIn(payload: SignInPayload) {
    try {
      const { user, access_token } = await envAwareFetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!user || !access_token) {
        throw new Error('Falha ao fazer login');
      }

      setCookie(undefined, 'lpm-app.token', access_token, {
        maxAge: 60 * 60 * 24, // 24h
        path: '/',
      });

      setUser(user);
      setUserFromStorage(user);
      router.push('/');
    } catch (error) {
      signOut();
      throw error;
    }
  }

  function signOut() {
    destroyCookie(undefined, 'lpm-app.token');
    setUser(null);
    localStorage.removeItem('lpm-app.user');
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
