import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ImageUrlUpdateResponse, UserImage } from "../types/types";
import UserProfile from "../components/UserProfile";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imageUploadMessage, setImageUploadMessage] = useState("");

  // *-----------HANDLE INCOMING DATA---------------------------
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : "");
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
      setImageUploadMessage("Image was successfully uploaded");
      updateImage(user!.email, result.userImage);
      console.log(result);
    } catch (error) {
      console.log(error);
      setImageUploadMessage("");
    }
  };

  const updateImage = async (email: string, imageUrl: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("userImage", imageUrl);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/updateUser",
        requestOptions
      );
      const data = (await response.json()) as ImageUrlUpdateResponse;
      setUser({ ...user!, userImage: imageUrl });
      setSelectedFile("");
      console.log(data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const colsStyle = {
    border: "1px solid black",
    padding: "3%",
    backgroundColor: "#2fd16f",
  };

  const contStyle = {
    marginTop: "3%",
  };

  return (
    <>
      <Container style={contStyle}>
        <Row className="justify-content-center text-center">
          <Col style={colsStyle} xs={2}>
            <Row>
              <p>User profile</p>
            </Row>
            <Row>
              <p>Update profile</p>
            </Row>
            <Row>
              <p>Favourites</p>
            </Row>
            <Row>
              <p>Your posts</p>
            </Row>
          </Col>
          <Col style={colsStyle} xs={6}>
            <UserProfile />
          </Col>
          {/* <Col style={colsStyle} xs={6}>
            <h1>Welcome : {user?.userName}</h1>
            <p>Your email: {user?.email}</p>
            <img src={user?.userImage} alt="userImage" width={"150px"} />
            <Form onSubmit={handleFileSubmit}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Please select image to upload</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileInput}
                  name={"asd"}
                />
              </Form.Group>
              <div className="text-center">
                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <input type="text" disabled={true} placeholder={"userdata"} />
                {imageUploadMessage ? <p>{imageUploadMessage}</p> : ""}
              </div>
            </Form>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
