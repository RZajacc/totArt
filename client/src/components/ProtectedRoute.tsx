import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AccessForbidden from "../views/AccessForbidden";
import LoadingPage from "./LoadingPage";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { user, loader } = useContext(AuthContext);
  return (
    <>{loader ? <LoadingPage /> : user ? children : <AccessForbidden />}</>
  );
}

export default ProtectedRoute;
