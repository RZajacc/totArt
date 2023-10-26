import React, { ReactNode, createContext } from "react";

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext(1);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  return <AuthContext.Provider value={1}>{children}</AuthContext.Provider>;
};
