import PropTypes from "prop-types";
import { useAuth } from "../hooks/useAuth";

// Protected route component
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, loading, role } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    window.location.href = "/unauthorized";
    return null;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
};
