"use client";

import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type UserContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: string | number | null;
  setUserId: (id: string | number | null) => void;
};

type UserContextTypeProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: UserContextTypeProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | number | null>(null);

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (storedToken) {
      setToken(storedToken);
      const decoded = jwtDecode<{ user_id: string | number }>(storedToken);
      setUserId(decoded.user_id);
    }
  }, []);

  return (
    <UserContext.Provider value={{ token, setToken, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within UserContextProvider");
  return context;
};
