import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/accountPage.css";

type LoginCredentials = {
  email: string;
  password: string;
};

type User = {
  userName: string;
  email: string;
  userImage?: string;
};

type LoggingResponse = {
  msg: string;
  user: User;
  token: string;
};

type Props = {
  setLogReg: (status: string) => void;
};

function Login({ setLogReg }: Props) {
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials | null>(null);

  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...(loginCredentials as LoginCredentials),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //* Logging in
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

  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
      console.log("User is logged in!");
    } else {
      console.log("User is NOT logged in");
    }
  }, []);

  const handleChangeState = () => {
    setLogReg("register");
  };

  return (
    <>
      <Container className="loginContainer">
        <div className="welcome-div">
          <h4>Welcome to TotArt</h4>
          <p>To use all of our functionalities please login to your account</p>
          <p className="logreg-paragraph">
            If you dont have your account yet, please{" "}
            <span className="statusHandler" onClick={handleChangeState}>
              register
            </span>
          </p>
        </div>
        <Form onSubmit={handleSubmitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleLoginInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLoginInput}
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="warning" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Login;
