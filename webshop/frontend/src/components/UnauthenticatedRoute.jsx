import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const UnauthenticatedRoute = ({ children, ...rest }) => {
  let { user } = useContext(UserContext);

  return user ? <Navigate to="/shop" /> : children;
};

export default UnauthenticatedRoute;
