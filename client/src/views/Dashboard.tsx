import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container } from "react-bootstrap";

function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Container>
        <h1>Welcome : {user?.userName}</h1>
        <p>Your email: {user?.email}</p>
        <img src={user?.userImage} alt="userImage" width={"150px"} />
      </Container>
    </>
  );
}

export default Dashboard;
