import { Button, Container, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState, useContext } from "react";
import { User } from "../types/types";
import "../styles/accountPage.css";
import { AuthContext } from "../context/AuthContext";

type Props = {
  setLogReg: (status: string) => void;
};

function Register({ setLogReg }: Props) {
  // *Setting up context
  const { registerWithEmail } = useContext(AuthContext);

  // *1. Setting up a new user from input fields
  const [newUser, setNewUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
    userImage: "",
    userWebsite: "",
    userBio: "",
  });

  // *2. Receiving input from a form
  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // *3. Change displayed element on the page
  const handleChangeState = () => {
    setLogReg("login");
  };

  // *4 Register a new user
  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerWithEmail(newUser);
    setLogReg("login");
  };

  return (
    <>
      <Container className="account-container">
        <div className="welcome-div">
          <h4>Welcome to TotArt</h4>
          <p>To use all of our functionalities please register a new account</p>
          <p className="logreg-paragraph">
            If you already have an one then simply{" "}
            <span className="statusHandler" onClick={handleChangeState}>
              login
            </span>
          </p>
        </div>
        <Form onSubmit={handleRegisterSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              placeholder="Enter username"
              onChange={handleInputData}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="user-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInputData}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="user-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputData}
              autoComplete="user-password"
            />
          </Form.Group>

          <div className="text-center">
            <Button variant="warning" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Register;
