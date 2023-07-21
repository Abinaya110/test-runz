import { Navigate, Outlet, useLocation } from "react-router-dom";
import { routes } from "../routes/routesPath";
import { AUTH_TOKEN } from "./localStoreConst";
import axios from "axios";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = localStorage.getItem(AUTH_TOKEN) !== null ? true : false;
  return user && user;
};

const getToken = localStorage.getItem(AUTH_TOKEN);
axios.defaults.headers.common["Authorization"] = `Bearer ${getToken}`;

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();

  const { data, authLoader } = useSelector(
    ({ moreInfoUserReducers }: RootState) => {
      return {
        data: moreInfoUserReducers.data,
        authLoader: moreInfoUserReducers.isLoading,
      };
    }
  );

  return isAuth ? (
    <> {data.activeStatus || authLoader ? <></> : <Outlet />}</>
  ) : (
    <Navigate to={routes.LOGIN} state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
