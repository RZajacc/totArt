import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { comment } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import "../styles/Comment.css";

type Props = {
  comment: comment;
};

function Comment({ comment }: Props) {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Row className="rowStyle">
        <Col xs lg="2">
          <img src={comment.author.userImage} alt="" className="picStyle" />
        </Col>
        <Col xs lg="8">
          <p>
            <strong>{comment.author.userName}</strong>
          </p>
          <p>{comment.comment}</p>
          {/* <p className="dateStyle">{formatDate(comment.date)}</p> */}
        </Col>
        <Col xs lg="2">
          {comment.author._id === user?._id ? (
            <Button
              variant="danger"
              className="delete-button"
              value={comment.comment}
              //   onClick={handleDelete}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
}

export default Comment;
