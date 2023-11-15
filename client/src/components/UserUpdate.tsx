import { useContext, ChangeEvent, FormEvent, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/userDashboard.css";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import {
  deleteUserImage,
  destructureUrlToImageID,
  updateUserData,
} from "../utils/UserEditTools";
import { UserImage, editFieldStatus } from "../types/types";
import DeleteUserModal from "./DeleteUserModal";

function UserUpdate() {
  const { user, setUser } = useContext(AuthContext);

  //* ---------UPDATE DATA MESSAGES---------------------------------
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imageUploadMessage, setImageUploadMessage] = useState("");
  const [userNameEditMessage, setUserNameEditMessage] = useState("");
  const [emailEditMessage, setEmailEditMessage] = useState("");
  const [websiteEditMessage, setWebsiteEditMessage] = useState("");
  const [bioEditMessage, setBioEditMessage] = useState("");

  // *-----------HANDLE INCOMING DATA---------------------------
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : "");
  };

  // *-----------SUBMITTING A FILE-----------------------------
  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userImage", selectedFile);
    formdata.append("folder", "userImages");

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

  // * STATUSES FOR ALL INPUT FIELDS
  const idle = { inputField: true, editField: false, submitField: true };
  const active = { inputField: false, editField: false, submitField: false };
  const empty = { inputField: false, editField: false, submitField: true };
  const [userFieldStatus, setUserFieldStatus] = useState(idle);
  const [emailFieldStatus, setEmailFieldStatus] = useState(idle);
  const [websiteFieldStatus, setWebsiteFieldStatus] = useState(idle);
  const [bioFieldStatus, setBioFieldStatus] = useState(idle);

  // * HELPER FUNCTION TO DEFINE WHICH FIELD IS ACTIVE
  const setFieldStatus = (fieldName: string, status: editFieldStatus) => {
    if (fieldName === "userName") {
      setUserFieldStatus(status);
    }
    if (fieldName === "email") {
      setEmailFieldStatus(status);
    }
    if (fieldName === "userWebsite") {
      setWebsiteFieldStatus(status);
    }
    if (fieldName === "userBio") {
      setBioFieldStatus(status);
    }
  };

  // * CHANGING THE STATUS AFTER CLICKING EDIT BUTTON
  const handleEditField = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const buttonEvent = e.target as HTMLButtonElement;
    if (buttonEvent.innerText === "Edit") {
      buttonEvent.innerText = "Cancel";
      buttonEvent.className = "btn btn-danger";
      setFieldStatus(buttonEvent.name, active);
    } else {
      buttonEvent.innerText = "Edit";
      buttonEvent.className = "btn btn-info";
      setFieldStatus(buttonEvent.name, idle);
    }
  };

  // * CHANGING THE STATUS DEPENDING ON INPUT FIELD
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "userWebsite" || e.target.name === "userBio") {
      setFieldStatus(e.target.name, active);
      setUser({ ...user!, [`${e.target.name}`]: e.target.value });
    } else {
      if (e.target.value === "") {
        setFieldStatus(e.target.name, empty);
      } else {
        setFieldStatus(e.target.name, active);
        setUser({ ...user!, [`${e.target.name}`]: e.target.value });
      }
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

  const handleEmailSubmit = (e) => {
    e.target[1].className = "btn btn-info";
    e.target[1].innerText = "Edit";
    e.preventDefault();
    updateUserData(user!.email, "email", user!.email);
    setFieldStatus("email", idle);
    setEmailEditMessage("Email updated properly!");
  };

  const handleWebsiteSubmit = (e) => {
    e.target[1].className = "btn btn-info";
    e.target[1].innerText = "Edit";
    e.preventDefault();
    updateUserData(user!.email, "userWebsite", user!.userWebsite);
    setFieldStatus("website", idle);
    setWebsiteEditMessage("Website url updated properly!");
  };
  const handleBioSubmit = (e) => {
    e.target[1].className = "btn btn-info";
    e.target[1].innerText = "Edit";
    e.preventDefault();
    updateUserData(user!.email, "userBio", user!.userBio);
    setFieldStatus("bio", idle);
    setBioEditMessage("Your bio updated properly!");
  };

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

        {/* USERNAME EDIT */}
        <Form onSubmit={handleUsernameSubmit}>
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
        <Form onSubmit={handleEmailSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <Form.Control
              aria-label="Email"
              defaultValue={user?.email}
              name="email"
              type="email"
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
            <Button
              variant="warning"
              type="submit"
              disabled={emailFieldStatus.submitField}
            >
              Submit
            </Button>
          </InputGroup>
          {emailEditMessage ? (
            <p className="text-center">{emailEditMessage}</p>
          ) : (
            ""
          )}
        </Form>

        {/* WEBSITE EDIT */}
        <Form onSubmit={handleWebsiteSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Website</InputGroup.Text>
            <Form.Control
              aria-label="Website"
              defaultValue={user?.userWebsite}
              name="userWebsite"
              disabled={websiteFieldStatus.inputField}
              onChange={handleInputChange}
            />
            <Button
              variant="info"
              disabled={websiteFieldStatus.editField}
              onClick={handleEditField}
              name="userWebsite"
            >
              Edit
            </Button>
            <Button
              variant="warning"
              type="submit"
              disabled={websiteFieldStatus.submitField}
            >
              Submit
            </Button>
          </InputGroup>
          {websiteEditMessage ? (
            <p className="text-center">{websiteEditMessage}</p>
          ) : (
            ""
          )}
        </Form>

        {/* BIO EDIT */}
        <Form onSubmit={handleBioSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text>Bio</InputGroup.Text>
            <Form.Control
              aria-label="Bio"
              as={"textarea"}
              rows={3}
              defaultValue={user?.userBio}
              name="userBio"
              disabled={bioFieldStatus.inputField}
              onChange={handleInputChange}
            />
            <Button
              variant="info"
              disabled={bioFieldStatus.editField}
              onClick={handleEditField}
              name="userBio"
            >
              Edit
            </Button>
            <Button
              variant="warning"
              type="submit"
              disabled={bioFieldStatus.submitField}
            >
              Submit
            </Button>
          </InputGroup>
          {bioEditMessage ? (
            <p className="text-center">{bioEditMessage}</p>
          ) : (
            ""
          )}
        </Form>
        <DeleteUserModal />
      </Container>
    </>
  );
}

export default UserUpdate;
