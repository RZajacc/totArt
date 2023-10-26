import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/accountPage.css";
import { LoginCredentials } from "../types/types";
import { AuthContext } from "../context/AuthContext";

type Props = {
  setLogReg: (status: string) => void;
};

function Login({ setLogReg }: Props) {
  // * USE CONTEXT DATA
  const { login } = useContext(AuthContext);

  //* 1_Setting a login credentials
  const [loginCredentials, setLoginCredentials] =
    useState<LoginCredentials | null>(null);

  // *2_Collect data from inputes
  const handleLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials({
      ...(loginCredentials as LoginCredentials),
      [e.target.name]: e.target.value,
    });
  };

  // *3_Login a user
  const handleSubmitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginCredentials) {
      login(loginCredentials);
    } else {
      console.log("No credentials provided");
    }
  };

  // *4. Change displayed element on the page
  const handleChangeState = () => {
    setLogReg("register");
  };

  // ! THIS SHOULD GO INTO CONTEXT
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  // ! THIS SHOULD GO INTO CONTEXT
  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
      console.log("User is logged in!");
    } else {
      console.log("User is NOT logged in");
    }
  }, []);

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
