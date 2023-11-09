import { useContext, useState, FormEvent } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../utils/UserEditTools";

function DeleteUserModal() {
  const { user, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();
    deleteUser(user!._id);
    logout();
    navigate("/");
  };
  return (
    <>
      <Container className="modal-container">
        <Button variant="danger" onClick={handleShow}>
          Delete account
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Are you sure 100% sure thats what you want?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Text>
                Your decision cannot be taken back, and all content created by
                you (i.e posts, comments) will be lost!
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Form onSubmit={handleDeleteUser}>
              <Button variant="danger" type="submit">
                Delete account
              </Button>
              <Button variant="success" onClick={handleClose}>
                Close
              </Button>
            </Form>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default DeleteUserModal;
