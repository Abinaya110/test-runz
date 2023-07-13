import axios from "axios";
import { isEmpty } from "./validators";

export const setAuthorization = (token: string) => {
  if (!isEmpty(token)) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const authFetchUrl = (url: string) => {
  const result = `https://testrunzauthserve.onrender.com/auth/${url}`;
  return result;
};

export const proceduresFetchUrl = (url: string) => {
  const result = `https://testrunzproceserv.onrender.com/${url}`;
  return result;
};
