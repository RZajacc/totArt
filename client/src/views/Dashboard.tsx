import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ImageUrlUpdateResponse, UserImage } from "../types/types";
import UserProfile from "../components/UserProfile";
import "../styles/userDashboard.css";
import UserUpdate from "../components/UserUpdate";
import UserFavs from "../components/UserFavs";
import UserPosts from "../components/UserPosts";

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imageUploadMessage, setImageUploadMessage] = useState("");

  // *-----------HANDLE USER NAV-------------------------------
  const [activeComponent, setActiveComponent] = useState("User profile");

  const userNavHandle = (e) => {
    setActiveComponent(e.target.innerText);
  };

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

  return (
    <>
      <Container className="dashboard-container">
        <Row className="justify-content-center text-center">
          <Col className="dashboard-nav-column" xs={2}>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                User profile
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Update profile
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Favourites
              </p>
            </Row>
            <Row>
              <p className="dashboard-nav-link" onClick={userNavHandle}>
                Your posts
              </p>
            </Row>
          </Col>
          <Col className="dashboard-data-column" xs={6}>
            {activeComponent === "User profile" ? (
              <UserProfile />
            ) : activeComponent === "Update profile" ? (
              <UserUpdate />
            ) : activeComponent === "Favourites" ? (
              <UserFavs />
            ) : activeComponent === "Your posts" ? (
              <UserPosts />
            ) : (
              ""
            )}
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
