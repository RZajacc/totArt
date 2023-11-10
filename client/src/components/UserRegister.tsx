import { Button, Container, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState, useContext, useEffect } from "react";
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
    _id: "",
    userName: "",
    email: "",
    password: "",
    userImage: "",
    userWebsite: "",
    userBio: "",
    favs: [""],
    posts: [""],
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState<string[] | null>(null);

  // *2. Receiving input from a form
  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // *3. Change displayed element on the page
  const handleChangeState = () => {
    setLogReg("login");
  };

  // *4 Register a new user
  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValidation: string[] = [];

    if (newUser.password !== confirmPassword) {
      formValidation.push("Provided passwords don't match!");
    } else {
      if (newUser.password.length < 8 || confirmPassword.length < 8) {
        formValidation.push("Password is too short!");
      }

      if (!/[A-Z]/.test(newUser.password) || !/[A-Z]/.test(confirmPassword)) {
        formValidation.push(
          "Password needs to have at least one uppercase letter!"
        );
      }

      if (
        !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(newUser.password) ||
        !/[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g.test(confirmPassword)
      ) {
        formValidation.push(
          "Password needs to contain at least 1 special character!"
        );
      }

      if (!/[0-9]/.test(newUser.password) || !/[0-9]/.test(confirmPassword)) {
        formValidation.push("Password needs to contain at least one number!");
      }
    }

    setPasswordErr(formValidation);

    if (passwordErr?.length === 0) {
      registerWithEmail(newUser);
      setLogReg("login");
    }
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
              isValid={newUser.userName != ""}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="user-email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleInputData}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="user-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputData}
              autoComplete="user-password"
              isInvalid={passwordErr?.length != null && passwordErr.length != 0}
              isValid={passwordErr?.length === 0}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirm-password">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleConfirmPassword}
              autoComplete="user-password"
              isInvalid={passwordErr?.length != null && passwordErr.length != 0}
              isValid={passwordErr?.length === 0}
              required
            />
            {passwordErr &&
              passwordErr.map((err, idx) => {
                return (
                  <Form.Control.Feedback type="invalid" key={idx}>
                    {err}
                  </Form.Control.Feedback>
                );
              })}
          </Form.Group>
          <div className="text-center">
            <Button variant="warning" type="submit">
              Register
            </Button>
          </div>
          <div className="password-req">
            <p>*Password needs to have at least 8 characters</p>
            <p>*Password needs to contain at least 1 uppercase character</p>
            <p>*Password needs to contain at least 1 number</p>
            <p>*Password needs to contain at least 1 special character</p>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Register;
