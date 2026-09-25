import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Array-based ProtectedRoute Guard enforcing strict workspace role isolation.
 */
function ProtectedRoute({ allowedRoles = [] }) {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  const userRole = currentUser.role.toLowerCase();
  const isAllowed = allowedRoles.map((r) => r.toLowerCase()).includes(userRole);

  if (!isAllowed) {
    // Redirect unauthorized user to their own role dashboard
    const targetDashboard = `/${userRole}/dashboard`;
    return <Navigate to={targetDashboard} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
