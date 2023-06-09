import jwtDecode from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
import useContent from "../hooks/useContent";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useContent();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;

  const roles = decoded?.UserInfo?.roles || [];

  return roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
