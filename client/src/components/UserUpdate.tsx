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

  type fieldStatus = {
    inputField: boolean;
    editField: boolean;
    submitField: boolean;
  };

  const idle = { inputField: true, editField: false, submitField: true };
  const active = { inputField: false, editField: false, submitField: false };
  const empty = { inputField: false, editField: false, submitField: true };
  const [userFieldStatus, setUserFieldStatus] = useState(idle);
  const [emailFieldStatus, setEmailFieldStatus] = useState(idle);
  const [websiteFieldStatus, setWebsiteFieldStatus] = useState(idle);
  const [bioFieldStatus, setBioFieldStatus] = useState(idle);

  const setFieldStatus = (fieldName: string, status: fieldStatus) => {
    if (fieldName === "user-edit") {
      setUserFieldStatus(status);
    }
    if (fieldName === "email-edit") {
      setEmailFieldStatus(status);
    }
    if (fieldName === "website-edit") {
      setWebsiteFieldStatus(status);
    }
    if (fieldName === "bio-edit") {
      setBioFieldStatus(status);
    }
  };

  const handleEditField = (e) => {
    console.log(e.target.name);
    if (e.target.innerText === "Edit") {
      e.target.innerText = "Cancel";
      e.target.className = "btn btn-danger";
      setFieldStatus(e.target.name, active);
    } else {
      e.target.innerText = "Edit";
      e.target.className = "btn btn-info";
      setFieldStatus(e.target.name, idle);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.value === "") {
      setFieldStatus(e.target.name, empty);
    } else {
      setFieldStatus(e.target.name, active);
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

        {/* USERNAME EDIT */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Username</InputGroup.Text>
          <Form.Control
            aria-label="Username"
            name="user-edit"
            defaultValue={user?.userName}
            disabled={userFieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            name="user-edit"
            disabled={userFieldStatus.editField}
            onClick={handleEditField}
          >
            Edit
          </Button>
          <Button variant="warning" disabled={userFieldStatus.submitField}>
            Submit
          </Button>
        </InputGroup>

        {/* EMAIL EDIT */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <Form.Control
            aria-label="Email"
            type="email"
            defaultValue={user?.email}
            name="email-edit"
            disabled={emailFieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            name="email-edit"
            disabled={emailFieldStatus.editField}
            onClick={handleEditField}
          >
            Edit
          </Button>
          <Button variant="warning" disabled={emailFieldStatus.submitField}>
            Submit
          </Button>
        </InputGroup>

        {/* WEBSITE EDIT */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Website</InputGroup.Text>
          <Form.Control
            aria-label="Website"
            defaultValue={user?.website}
            name="website-edit"
            disabled={websiteFieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            disabled={websiteFieldStatus.editField}
            onClick={handleEditField}
            name="website-edit"
          >
            Edit
          </Button>
          <Button variant="warning" disabled={websiteFieldStatus.submitField}>
            Submit
          </Button>
        </InputGroup>

        {/* BIO EDIT */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Bio</InputGroup.Text>
          <Form.Control
            aria-label="Bio"
            as={"textarea"}
            rows={3}
            defaultValue={user?.bio}
            name="bio-edit"
            disabled={bioFieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            disabled={bioFieldStatus.editField}
            onClick={handleEditField}
            name="bio-edit"
          >
            Edit
          </Button>
          <Button variant="warning" disabled={bioFieldStatus.submitField}>
            Submit
          </Button>
        </InputGroup>
      </Container>
    </>
  );
}

export default UserUpdate;
