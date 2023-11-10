import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { UserImage, post } from "../types/types";
import "../styles/contentPage.css";
import { AuthContext } from "../context/AuthContext";
import { updateUserData } from "../utils/UserEditTools";

const AddContentModal = () => {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const { user } = useContext(AuthContext);
  const [isImageUploaded, setIsImageUploaded] = useState<null | boolean>(null);

  const [newContent, setNewContent] = useState<post>({
    _id: " ",
    title: "",
    description: "",
    location: "",
    imageUrl: "",
    author: { _id: "", userImage: "", userName: "" },
    comments: [
      {
        _id: "",
        author: { _id: "", userImage: "", userName: "" },
        comment: "",
        relatedPost: "",
      },
    ],
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // *-----------HANDLE INCOMING DATA---------------------------
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : "");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewContent({ ...newContent, [`${e.target.name}`]: e.target.value });
  };

  // * --------- UPLOAD IMAGE -------------------------------
  const handleFileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("userImage", selectedFile);
    formdata.append("folder", "postImages");

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
      setNewContent({ ...newContent, imageUrl: result.userImage });
      setIsImageUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  // *------------- SUBMIT A NEW POST -----------------
  const submitNewPost = async (e) => {
    if (newContent.imageUrl) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("title", newContent.title);
      urlencoded.append("description", newContent.description);
      urlencoded.append("location", newContent.location);
      urlencoded.append("imageUrl", newContent.imageUrl);
      urlencoded.append("author", user!._id);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
      };

      try {
        const response = await fetch(
          "http://localhost:5000/api/posts/addNewPost",
          requestOptions
        );
        const result = await response.json();
        updateUserData(user!.email, "posts", result.postId);
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsImageUploaded(false);
      e.preventDefault();
    }
  };

  return (
    <>
      <Container className="modal-container">
        <p className="add-content-p">
          <strong>{user?.userName}</strong> - to add new content press a button
          :{" "}
        </p>
        <Button variant="dark" onClick={handleShow}>
          Add content
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Share some unique content:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFileSubmit}>
              <InputGroup>
                <Form.Control
                  type="file"
                  onChange={handleFileInput}
                  required
                  isInvalid={isImageUploaded === false}
                  isValid={newContent.imageUrl != ""}
                />
                <Button type="submit">Upload image</Button>
                <Form.Control.Feedback type="valid">
                  Image uploaded successfully
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Uploading image is required!
                </Form.Control.Feedback>
              </InputGroup>
            </Form>
            <Form onSubmit={submitNewPost}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Start with giving it a title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="example title"
                  name="title"
                  onChange={handleInputChange}
                  autoFocus
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Add some description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Where was it?</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="location"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default AddContentModal;
