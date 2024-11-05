import { IUser } from "@/app/_layout";
import LocalStorage from "@/utilities/localstorage";
import { createContext, useEffect, useState } from "react";

interface IAuthContext { 
  user: IUser | null;
  loading: boolean;
  login: (userData: IUser) => void;
  logout: () => void 
  }

export const AuthContext = createContext<IAuthContext>({user: null, loading: true, login: () => {}, logout: () => {}});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await LocalStorage.getData('@eeve/user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function to save user data
  const login = async (userData: IUser) => {
    try {
      await LocalStorage.storeData('@eeve/user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Failed to save user data to AsyncStorage:', error);
    }
  };

  // Logout function to clear user data
  const logout = async () => {
    try {
      await LocalStorage.removeData('user');
      setUser(null);
    } catch (error) {
      console.error('Failed to remove user data from AsyncStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
