import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import "../styles/accountPage.css";
import { LoginCredentials } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  setLogReg: (status: string) => void;
};

function Login({ setLogReg }: Props) {
  // * USE CONTEXT DATA
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

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
      navigate("/dashboard");
    } else {
      console.log("No credentials provided");
    }
  };

  // *4. Change displayed element on the page
  const handleChangeState = () => {
    setLogReg("register");
  };

  return (
    <>
      <Container className="account-container">
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
          <Form.Group className="mb-3" controlId="user-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleLoginInput}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="user-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleLoginInput}
              autoComplete="user-password"
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
