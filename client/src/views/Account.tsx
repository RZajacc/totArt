import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Login from "../components/Login";
import Register from "../components/Register";

function Account() {
  const [userLogged, setUserLogged] = useState(false);

  // const [selectedFile, setSelectedFile] = useState<File | string>("");

  // // *-----------HANDLE INCOMING DATA---------------------------
  // const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSelectedFile(e.target.files ? e.target.files[0] : "");
  // };

  // // *-----------SUBMITTING A FILE-----------------------------
  // const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formdata = new FormData();
  //   formdata.append("userImage", selectedFile);

  //   const requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/users/imageUpload",
  //       requestOptions
  //     );
  //     const result = (await response.json()) as UserImage;
  //     setNewUser({ ...newUser, userImage: result.userImage });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // * -----------LOGGING IN--------------------
  const isUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserLogged(false);
  };

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (isLoggedIn) {
      setUserLogged(true);
      console.log("User is logged in!");
    } else {
      console.log("User is NOT logged in");
      setUserLogged(false);
    }
  }, [userLogged]);

  // ? ----------STYLING---------------------------
  const containerStyle = {
    marginTop: "50px",
  };

  return (
    <>
      <Container style={containerStyle}>
        <Row className="justify-content-center">
          <Col xs={6}>
            <Button onClick={logout}>Logout</Button>

            {/* Submitting a file */}
            {/* <Form onSubmit={handleFileSubmit}>
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
            </Form> */}
            <Login />
            <Register />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
