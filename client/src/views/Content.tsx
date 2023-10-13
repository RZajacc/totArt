import { Container } from "react-bootstrap";

function Content() {
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cities/all");
      const result = await response.json();
    } catch (error) {
      console.log(error);
    }
  };

  getData();
  return (
    <>
      <Container>
        <h1>Hello</h1>
      </Container>
    </>
  );
}

export default Content;
