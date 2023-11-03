import { Container } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

type postDetails = {
  title: string;
  description: string;
  location: string;
  imageUrl: string;
};

function ContentDetails() {
  const data = useLoaderData() as postDetails;

  return (
    <>
      <Container>
        <h1>{data.title}</h1>
        <h5>{data.description}</h5>
        <h5>{data.location}</h5>
        <img src={data.imageUrl} />
      </Container>
    </>
  );
}

export default ContentDetails;
