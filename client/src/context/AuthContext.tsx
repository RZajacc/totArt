import { ReactNode, createContext } from "react";
import { LoggingResponse, LoginCredentials, User } from "../types/types";

interface AuthContextType {
  registerWithEmail: (newUser: User) => void;
  login: (loginCredentials: LoginCredentials) => void;
}

const AuthInitContext = {
  registerWithEmail: () => console.log("No user registered yet"),
  login: () => console.log("User not logged in yet"),
};

type AuthContexProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(AuthInitContext);

export const AuthContextProvider = ({ children }: AuthContexProviderProps) => {
  // *1_REGISTER A NEW USER
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

  // *2_LOGIN
  const login = async (loginCredentials: LoginCredentials) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials ? loginCredentials.email : "");
    urlencoded.append(
      "password",
      loginCredentials ? loginCredentials.password : ""
    );

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      if (response.ok) {
        const result: LoggingResponse = await response.json();
        console.log(result);
        const token = result.token;
        if (token) {
          localStorage.setItem("token", token);
        }
      }
    } catch (err) {
      const error = err as Error;
      console.log("Error :>>", error.message);
    }
  };
  return (
    <AuthContext.Provider value={{ registerWithEmail, login }}>
      {children}
    </AuthContext.Provider>
  );
};
