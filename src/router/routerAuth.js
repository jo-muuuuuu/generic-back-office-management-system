import { Navigate } from "react-router-dom";
import { getToken } from "../util";

const RouterAuth = ({ children }) => {
  // const token = localStorage.getItem("token");
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RouterAuth;
