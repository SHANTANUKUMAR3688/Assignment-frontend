import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userId = sessionStorage.getItem("id");

  if (!userId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;