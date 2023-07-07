import { Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from "../routes/routesPath";
import { AUTH_TOKEN } from "./localStoreConst";
const useAuth = () => {
  const user = localStorage.getItem(AUTH_TOKEN) !== null ? true : false;
  return user && user;
};
const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={routes.LOGIN} state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
