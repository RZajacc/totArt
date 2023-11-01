import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button, Container, Form } from "react-bootstrap";
import { ImageUrlUpdateResponse, UserImage } from "../types/types";

function Dashboard() {
  const { user } = useContext(AuthContext);

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
      //   setNewUser({ ...newUser, userImage: result.userImage });
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
      console.log(data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <h1>Welcome : {user?.userName}</h1>
        <p>Your email: {user?.email}</p>
        <img src={user?.userImage} alt="userImage" width={"150px"} />
        <Form onSubmit={handleFileSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" onChange={handleFileInput} />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
            {imageUploadMessage ? <p>{imageUploadMessage}</p> : ""}
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Dashboard;
