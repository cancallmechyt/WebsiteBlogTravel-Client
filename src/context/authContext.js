import useAxios from '../useAxios'
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await useAxios.post("/auth/login", inputs);
    setCurrentUser(res.data);
    localStorage.setItem("user", JSON.stringify(res.data))
  };

  const logout = async (inputs) => {
    await useAxios.post("/auth/logout");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
