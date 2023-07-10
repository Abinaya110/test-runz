import axios from "axios";
import { isEmpty } from "./validators";

export const setAuthorization = (token: string) => {
  if (!isEmpty(token)) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
