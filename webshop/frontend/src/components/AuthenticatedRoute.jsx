import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const AuthenticatedRoute = ({ children, ...rest }) => {
  let { user } = useContext(UserContext);

  return !user ? <Navigate to="/login" /> : children;
};

export default AuthenticatedRoute;
