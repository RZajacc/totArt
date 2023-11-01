import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

function UserProfile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <img src={user?.userImage} alt="userImage" className={"user-image"} />
      <div className="user-data">
        <Row>
          <Col xs={3} className="user-data-label">
            <p>Username:</p>
            <p>Email adress:</p>
            <p>Website:</p>
            <p>Bio:</p>
          </Col>
          <Col xs={3}>
            <p className="user-data-content">{user!.userName}</p>
            <p className="user-data-content"> {user!.email}</p>
            <p className="user-data-content">
              {user!.website ? user!.website : "n.a"}
            </p>
            <p className="user-data-content">{user!.bio ? user!.bio : "n.a"}</p>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
