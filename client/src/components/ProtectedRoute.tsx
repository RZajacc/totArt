import { ReactNode, useContext } from "react";
import { Navigate, useNavigation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const navigate = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);

  console.log("User in protected routes--->", isLoggedIn);

  return (
    <>
      {navigate.state === "loading" ? (
        <p>Loading</p>
      ) : isLoggedIn ? (
        children
      ) : (
        <Navigate to={"/account"} />
      )}
      {/* {navigate.state === "loading" ? (
        <p>Loading...</p>
      ) : user ? (
        children
      ) : (
        <Navigate to={"/account"} />
      )} */}
    </>
  );
}

export default ProtectedRoute;
