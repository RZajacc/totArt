import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

type newPost = {
  title: string;
  description: string;
  location: string;
};

const AddContentModal = () => {
  const [show, setShow] = useState(false);

  const [newContent, setNewContent] = useState<newPost>({
    title: "",
    description: "",
    location: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setNewContent({ ...newContent, [`${e.target.name}`]: e.target.value });
  };

  console.log(newContent);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share some unique content:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddContentModal;
