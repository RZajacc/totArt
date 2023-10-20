import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

type LoginCredentials = {
  email: string;
  password: string;
};

function Login() {
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
    console.log(loginCredentials);
  };

  return (
    <div>
      <hr />
      <h2>Login</h2>
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
      </div>
    </div>
  );
}

export default Login;
