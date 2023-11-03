import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { UserImage } from "../types/types";
import "../styles/contentPage.css";
import { AuthContext } from "../context/AuthContext";

type newPost = {
  title: string;
  description: string;
  location: string;
  imageUrl: string;
};

const AddContentModal = () => {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [imageUploadMessage, setImageUploadMessage] = useState("");
  const { user } = useContext(AuthContext);

  const [newContent, setNewContent] = useState<newPost>({
    title: "",
    description: "",
    location: "",
    imageUrl: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewContent({ ...newContent, [`${e.target.name}`]: e.target.value });
  };

  const submitNewPost = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("title", newContent.title);
    urlencoded.append("description", newContent.description);
    urlencoded.append("location", newContent.location);
    urlencoded.append("imageUrl", newContent.imageUrl);

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
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // *-----------HANDLE INCOMING DATA---------------------------
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : "");
  };

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
      setImageUploadMessage("Image uploaded successfully");
    } catch (error) {
      console.log(error);
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
                <Form.Control type="file" onChange={handleFileInput} required />
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
