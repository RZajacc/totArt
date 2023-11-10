import { Col, Container, Row } from "react-bootstrap";
import "../styles/global.css";

function Contact() {
  return (
    <>
      <Container className="contact-container">
        <Row className="justify-content-md-center text-center">
          <Col xs={7} className="contact-info">
            <h1>Contact me</h1>
            <p>You can reach me by phone, mail or just come to visit!</p>
            <p>
              <a href="mailto:rf.zajac@gmail.com" className="contact-link">
                &#x2709; Contact me
              </a>
            </p>
            <p>&#x2706; +49 123 4567 8912</p>
            <p>
              <strong>Adress: </strong>Erich-Weinert-Straße 145, 10409 Berlin
            </p>

            <iframe
              id="adress-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2426.3895300494523!2d13.440341686008981!3d52.54447854023895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84f446e0c53a1%3A0x27eac7eee50f967e!2sCode%20Academy%20Berlin!5e0!3m2!1spl!2sde!4v1690466346963!5m2!1spl!2sde"
              loading="lazy"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Contact;
