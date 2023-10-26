import React, { FormEvent, ReactNode, createContext } from "react";
import { User } from "../types/types";

interface AuthContextType {
  registerWithEmail: (newUser: User) => void;
}

const AuthInitContext = {
  registerWithEmail: () => console.log("No user registered yet"),
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  // *REGISTER A NEW USER
  const registerWithEmail = async (newUser: User) => {
    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append(
      "userImage",
      "https://res.cloudinary.com/dqdofxwft/image/upload/v1698072044/other/nil6d9iaml3c6hqfdhly.png"
    );

    const requestOptions = {
      method: "POST",
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        requestOptions
      );
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider value={{ registerWithEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
