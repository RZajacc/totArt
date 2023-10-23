import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

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
    <div>
      <div>
        <Form onSubmit={handleSubmitLogin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleLoginInput}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
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
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
        <p>
          If you dont have your account yet, please{" "}
          <span className="statusHandler" onClick={handleChangeState}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
