import { Button, Container, Form } from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../types/types";
import "../styles/accountPage.css";

type Props = {
  setLogReg: (status: string) => void;
};

function Register({ setLogReg }: Props) {
  const [newUser, setNewUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
    userImage: "",
  });

  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

  const handleChangeState = () => {
    setLogReg("login");
  };

  return (
    <>
      <Container className="loginContainer">
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              placeholder="Enter username"
              onChange={handleInputData}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputData}
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
