import { Container, Row, Col, Button } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import "../styles/contentPage.css";
import { post } from "../types/types";
import { AuthContext } from "../context/AuthContext";

function ContentDetails() {
  const data = useLoaderData() as post;
  const { user } = useContext(AuthContext);

  const handleAddFavs = () => {
    const sampleArr = [
      {
        id: "6548fadfe915f7269bee4d66",
        title: "Some title",
      },
    ];
    console.log(sampleArr.includes(data.id));
    // console.log("User favs--->", user!.favs);
    // console.log("PostId--->", data.id);
  };

  console.log("data", user.favs);
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
              {user!.favs.includes(data.id) ? (
                <Button variant="light" onClick={handleAddFavs}>
                  <img
                    src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354709/other/ra5sovm9gaxynfz3ah6t.svg"
                    alt="empty-heart"
                    width={"25px"}
                  />{" "}
                  Favs
                </Button>
              ) : (
                <Button variant="light" onClick={handleAddFavs}>
                  <img
                    src="https://res.cloudinary.com/dqdofxwft/image/upload/v1699354710/other/l8kxiddecnqx6talp4bz.svg"
                    alt="empty-heart"
                    width={"25px"}
                  />{" "}
                  Favs
                </Button>
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
      </Container>
    </>
  );
}

export default ContentDetails;
