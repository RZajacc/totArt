import { useContext } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { comment } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import "../styles/Comment.css";

type Props = {
  comment: comment;
  handleDeleteComment: (id: string) => void;
};

function Comment({ comment, handleDeleteComment }: Props) {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    handleDeleteComment(comment._id);
  };

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
        </Col>
        <Col xs lg="2">
          {comment.author._id === user?._id ? (
            <Button
              variant="danger"
              className="delete-button"
              value={comment.comment}
              onClick={handleDelete}
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
