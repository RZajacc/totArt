import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

type Props = {};

function UserProfile({}: Props) {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Welcome : {user?.userName}</h1>
      <p>Your email: {user?.email}</p>
      <img src={user?.userImage} alt="userImage" width={"150px"} />
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Please select image to upload</Form.Label>
          <Form.Control type="file" name={"asd"} />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          {/* <input type="text" disabled={true} placeholder={"userdata"} /> */}
        </div>
      </Form>
    </>
  );
}

export default UserProfile;
