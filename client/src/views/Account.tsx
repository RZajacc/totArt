import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

type UserImage = {
  userImage: string;
};

interface User extends UserImage {
  userName: string;
  email: string;
  password: string;
}

function Account() {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<User>({
    userName: "",
    email: "",
    password: "",
    userImage: "",
  });

  // *-----------HANDLE INCOMING DATA---------------------------
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : "");
  };

  const handleInputData = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // *-----------SUBMITTING A FILE-----------------------------
  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userImage", selectedFile);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );
      const result = (await response.json()) as UserImage;
      setNewUser({ ...newUser, userImage: result.userImage });
    } catch (error) {
      console.log(error);
    }
  };

  // *-----------REGISTER A NEW USER----------------------------------
  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const urlencoded = new URLSearchParams();
    urlencoded.append("userName", newUser.userName);
    urlencoded.append("email", newUser.email);
    urlencoded.append("password", newUser.password);
    urlencoded.append("userImage", newUser.userImage ? newUser.userImage : "");

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

  // ? ----------STYLING---------------------------
  const containerStyle = {
    marginTop: "50px",
  };

  return (
    <>
      <Container style={containerStyle}>
        <Row className="justify-content-center">
          <Col xs={6}>
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
                  name="email"
                  placeholder="Password"
                  onChange={handleInputData}
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>

            <Form onSubmit={handleFileSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" onChange={handleFileInput} />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              {newUser.userImage && (
                <div>
                  <img src={newUser.userImage} alt="user-avatar-picture" />
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
