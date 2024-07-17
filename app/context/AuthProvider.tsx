"use client";

import { createContext, useState, useEffect, useContext } from "react";
import {
  AuthenticationUser as User,
  manageAuthObserver,
} from "@/utils/Authentication";

export const AuthContext = createContext<{
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const attachObserver = (currentUser: any) => {
    setUser(currentUser);
    setIsAuthenticated(!!currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = manageAuthObserver(attachObserver);
    return unsubscribe;
  }, []);

  const content = user ? children : <div>Not Logged In</div>;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser }}>
      {isLoading ? <div>Loading...</div> : content}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Authorization context not found");
  }
  return context;
};

export type AuthUser = User;
