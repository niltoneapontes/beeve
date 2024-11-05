import { IUser } from "@/app/_layout";
import LocalStorage from "@/utilities/localstorage";
import { createContext, useEffect, useState } from "react";

interface IAuthContext { 
  user: IUser | null;
  token: string | null;
  loading: boolean;
  login: (userData: IUser, token: string) => void;
  logout: () => void 
  }

export const AuthContext = createContext<IAuthContext>({user: null, token: null, loading: true, login: () => {}, logout: () => {}});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await LocalStorage.getData('@eeve/user');
        const storedToken = await LocalStorage.getData('@eeve/token');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
          setToken(storedToken)
        }
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (userData: IUser, token: string) => {
    try {
      await LocalStorage.storeData('@eeve/user', JSON.stringify(userData));
      await LocalStorage.storeData('@eeve/token', token);
      setUser(userData);
      setToken(token)
    } catch (error) {
      console.error('Failed to save user data to AsyncStorage:', error);
    }
  };

  // Logout function to clear user data
  const logout = async () => {
    try {
      await LocalStorage.removeData('@eeve/user');
      await LocalStorage.removeData('@eeve/token');
      setUser(null);
    } catch (error) {
      console.error('Failed to remove user data from AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
