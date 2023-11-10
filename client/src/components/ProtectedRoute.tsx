import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AccessForbidden from "../views/AccessForbidden";

type Props = {
  children: ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const { user } = useContext(AuthContext);
  return <>{user ? children : <AccessForbidden />}</>;
}

export default ProtectedRoute;
