import { useContext, ChangeEvent, FormEvent, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/userDashboard.css";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import {
  deleteUserImage,
  destructureUrlToImageID,
  updateUserData,
} from "../utils/UserEditTools";
import { UserImage } from "../types/types";

function UserUpdate() {
  const { user, setUser } = useContext(AuthContext);

  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imageUploadMessage, setImageUploadMessage] = useState("");
  const [userNameEditMessage, setUserNameEditMessage] = useState("");

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
        setUser({ ...user!, userImage: result.userImage });
        updateUserData(user!.email, "userImage", result.userImage);
      } else {
        const publicId = destructureUrlToImageID(user!.userImage);
        setUser({ ...user!, userImage: result.userImage });
        deleteUserImage(publicId);
        updateUserData(user!.email, "userImage", result.userImage);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
      setImageUploadMessage("");
    }
  };

  type fieldStatus = {
    inputField: boolean;
    editField: boolean;
    submitField: boolean;
  };

  // * STATUSES FOR ALL INPUT FIELDS
  const idle = { inputField: true, editField: false, submitField: true };
  const active = { inputField: false, editField: false, submitField: false };
  const empty = { inputField: false, editField: false, submitField: true };
  const [userFieldStatus, setUserFieldStatus] = useState(idle);
  const [emailFieldStatus, setEmailFieldStatus] = useState(idle);
  const [websiteFieldStatus, setWebsiteFieldStatus] = useState(idle);
  const [bioFieldStatus, setBioFieldStatus] = useState(idle);

  // * HELPER FUNCTION TO DEFINE WHICH FIELD IS ACTIVE
  const setFieldStatus = (fieldName: string, status: fieldStatus) => {
    if (fieldName === "userName") {
      setUserFieldStatus(status);
    }
    if (fieldName === "email") {
      setEmailFieldStatus(status);
    }
    if (fieldName === "website") {
      setWebsiteFieldStatus(status);
    }
    if (fieldName === "bio") {
      setBioFieldStatus(status);
    }
  };

  // * CHANGING THE STATUS AFTER CLICKING EDIT BUTTON
  const handleEditField = (e) => {
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

  // * CHANGING THE STATUS DEPENDING ON INPUT FIELD
  const handleInputChange = (e) => {
    if (e.target.value === "") {
      setFieldStatus(e.target.name, empty);
    } else {
      setFieldStatus(e.target.name, active);
      setUser({ ...user!, [`${e.target.name}`]: e.target.value });
    }
  };

  const handleUsernameSubmit = (e) => {
    e.target[1].className = "btn btn-info";
    e.target[1].innerText = "Edit";
    e.preventDefault();
    updateUserData(user!.email, "userName", user!.userName);
    setFieldStatus("userName", idle);
    setUserNameEditMessage("Username updated properly!");
  };

  console.log(user);
  return (
    <>
      <img src={user!.userImage} alt="userImage" className={"user-image"} />
      <Container className={"user-edit-container"}>
        {/* USER IMAGE EDIT */}
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

        <Form onSubmit={handleUsernameSubmit}>
          {/* USERNAME EDIT */}
          <InputGroup className="mb-3">
            <InputGroup.Text>Username</InputGroup.Text>
            <Form.Control
              aria-label="Username"
              name="userName"
              defaultValue={user?.userName}
              disabled={userFieldStatus.inputField}
              onChange={handleInputChange}
            />
            <Button
              variant="info"
              name="userName"
              disabled={userFieldStatus.editField}
              onClick={handleEditField}
            >
              Edit
            </Button>
            <Button
              variant="warning"
              type="submit"
              disabled={userFieldStatus.submitField}
            >
              Submit
            </Button>
          </InputGroup>
          {userNameEditMessage ? (
            <p className="text-center">{userNameEditMessage}</p>
          ) : (
            ""
          )}
        </Form>
        {/* EMAIL EDIT */}
        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <Form.Control
            aria-label="Email"
            type="email"
            defaultValue={user?.email}
            name="email"
            disabled={emailFieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            name="email"
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
            name="website"
            disabled={websiteFieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            disabled={websiteFieldStatus.editField}
            onClick={handleEditField}
            name="website"
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
            name="bio"
            disabled={bioFieldStatus.inputField}
            onChange={handleInputChange}
          />
          <Button
            variant="info"
            disabled={bioFieldStatus.editField}
            onClick={handleEditField}
            name="bio"
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
