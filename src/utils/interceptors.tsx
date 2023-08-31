import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch, resetStore } from "../redux/store";
import { AUTH_TOKEN } from "./localStoreConst";

export const useInterceptors = () => {
  const dispatch: AppDispatch = useDispatch();

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        // alert("Your session is expired please login again");
        window.location.reload();
        localStorage.removeItem(AUTH_TOKEN);
        dispatch(resetStore());
      }
      return error;
    }
  );
};
