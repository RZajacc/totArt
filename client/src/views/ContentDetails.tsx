import { Container, Row, Col, Button } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import "../styles/contentPage.css";
import { post } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { deleteFromUserArray, updateUserData } from "../utils/UserEditTools";

function ContentDetails() {
  const data = useLoaderData() as post;
  const { user, isUserLoggedIn } = useContext(AuthContext);

  console.log(data);
  const handleAddFavs = async () => {
    if (user!.favs.includes(data._id)) {
      await deleteFromUserArray(user!.email, "favs", data._id);
      isUserLoggedIn();
    } else {
      await updateUserData(user!.email, "favs", data._id);
      isUserLoggedIn();
    }
  };

  return (
    <>
      <Container className="details-container">
        <Row className="justify-content-center text-center">
          <Col xs={8} className="details-column">
            <h1>
              Title:{" "}
              <span className="image-title">
                {data.title}
                {"  "}
              </span>
              {user ? (
                user?.favs.includes(data._id) ? (
                  <Button variant="light" onClick={handleAddFavs}>
                    Delete from{" "}
                    <img
                      src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354709/other/ra5sovm9gaxynfz3ah6t.svg"
                      alt="empty-heart"
                      width={"25px"}
                    />
                  </Button>
                ) : (
                  <Button variant="light" onClick={handleAddFavs}>
                    Add to{" "}
                    <img
                      src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354710/other/l8kxiddecnqx6talp4bz.svg"
                      alt="empty-heart"
                      width={"25px"}
                    />
                  </Button>
                )
              ) : (
                ""
              )}
            </h1>
            <p>
              <em>Added by: {data.author}</em>
            </p>
            <img src={data.imageUrl} className="details-image" />
            <div className="image-info">
              <h2>Description</h2>
              <p className="details-text">{data.description}</p>
              <h2>Where to find it</h2>
              <p className="details-text">{data.location}</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {data.comments ? <h2>Be the first person to comment:</h2> : "sad"}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContentDetails;
