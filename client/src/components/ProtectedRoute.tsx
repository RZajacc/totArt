import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AccessForbidden from "../views/AccessForbidden";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { user, loader } = useContext(AuthContext);
  return (
    <>
      {loader ? (
        <h1>loading.........</h1>
      ) : user ? (
        children
      ) : (
        <AccessForbidden />
      )}
    </>
  );
}

export default ProtectedRoute;
