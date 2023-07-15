import {
  authMeReducers,
  signUpReducers,
} from "../modules/LoginModule/store/loginReducer";
import { procedureReducers } from "../modules/ProceduresModule/store/proceduresReducers";

export const reducers = {
  signUpReducers,
  authMeReducers,
  procedureReducers,
};
