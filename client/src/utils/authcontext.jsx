import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";
import ax from "./axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
    staleTime: 30000,
  });

  async function getUserSession() {
    try {
      const res = await ax.get("/session");
      if (res.data) {
        setAuthUser(res.data);
        setIsLoggedIn(true);
      }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };
  return (
    <>
      <AuthContext.Provider value={value}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
}
