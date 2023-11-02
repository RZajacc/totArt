import { useContext, ChangeEvent, FormEvent, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/userDashboard.css";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import {
  deleteUserImage,
  destructureUrlToImageID,
  updateImage,
} from "../utils/UserImages";
import { UserImage } from "../types/types";

function UserUpdate() {
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

      // * If user has a default picture don't delete it, but if its custom replace it and delete previous
      const defImageUrl =
        "https://res.cloudinary.com/dqdofxwft/image/upload/v1698072044/other/nil6d9iaml3c6hqfdhly.png";
      if (user!.userImage === defImageUrl) {
        updateImage(user!.email, result.userImage, setUser, user!);
      } else {
        const publicId = destructureUrlToImageID(user!.userImage);
        deleteUserImage(publicId);
        updateImage(user!.email, result.userImage, setUser, user!);
      }
      updateImage(user!.email, result.userImage, setUser, user!);
      console.log(result);
    } catch (error) {
      console.log(error);
      setImageUploadMessage("");
    }
  };

  //  Status - idle (input, submit nieaktywne)
  //  Status - active (input, submit aktywny, edit zmiana do cancel)
  //  Status - typing (input aktywny, submit i edit nie)

  const idle = { inputField: true, editField: false, submitField: true };
  const active = { inputField: false, editField: false, submitField: false };
  const empty = { inputField: false, editField: false, submitField: true };
  const [fieldStatus, setFieldStatus] = useState(idle);

  const handleEditField = (e) => {
    if (e.target.innerText === "Edit") {
      e.target.innerText = "Cancel";
      e.target.className = "btn btn-danger";
      setFieldStatus(active);
    } else {
      e.target.innerText = "Edit";
      e.target.className = "btn btn-info";
      setFieldStatus(idle);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value === "") {
      setFieldStatus(empty);
    } else {
      setFieldStatus(active);
    }
  };

  return (
    <>
      <img src={user!.userImage} alt="userImage" className={"user-image"} />
      <Container className={"user-edit-container"}>
        <Form onSubmit={handleFileSubmit}>
          <InputGroup>
            <Form.Control type="file" onChange={handleFileInput} />
            <Button variant="warning" type="submit">
              Upload image
            </Button>
          </InputGroup>
          {imageUploadMessage ? (
            <p className="text-center">{imageUploadMessage}</p>
          ) : (
            ""
          )}
        </Form>

        <InputGroup className="mb-3">
          <InputGroup.Text>Username</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            name="user-input"
            defaultValue={user?.userName}
            disabled={fieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            name="user-edit"
            disabled={fieldStatus.editField}
            onClick={handleEditField}
          >
            Edit
          </Button>
          <Button variant="warning" disabled={fieldStatus.submitField}>
            Submit
          </Button>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <Form.Control
            aria-label="Email"
            type="email"
            defaultValue={user?.email}
          />
          <Button variant="info">Edit</Button>
          <Button variant="warning">Submit</Button>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Website</InputGroup.Text>
          <Form.Control aria-label="Website" defaultValue={user?.website} />
          <Button variant="info">Edit</Button>
          <Button variant="warning">Submit</Button>
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Bio</InputGroup.Text>
          <Form.Control
            aria-label="Bio"
            as={"textarea"}
            rows={3}
            defaultValue={user?.bio}
          />
          <Button variant="info">Edit</Button>
          <Button variant="warning">Submit</Button>
        </InputGroup>
      </Container>
    </>
  );
}

export default UserUpdate;
