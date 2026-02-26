import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const userId = sessionStorage.getItem("id");

  if (userId) {
    return <Navigate to="/page" replace />;
  }

  return children;
};

export default PublicRoute;