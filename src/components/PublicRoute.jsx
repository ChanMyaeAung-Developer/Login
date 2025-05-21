import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("user");
  return isAuthenticated ?  <Navigate to="/Home" replace /> :children  ;
};

export default PublicRoute;