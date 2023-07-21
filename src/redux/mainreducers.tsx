import {
  authMeReducers,
  signUpReducers,
  uploadReducers,
} from "../modules/LoginModule/store/loginReducer";
import {
  moreInfoListReducers,
  moreInfoUserReducers,
  moreInfoUserUpdateReducers,
} from "../modules/MyPageModule/store/mypageReducer";
import { procedureReducers } from "../modules/ProceduresModule/store/proceduresReducers";

export const reducers = {
  signUpReducers,
  authMeReducers,
  procedureReducers,
  moreInfoListReducers,
  moreInfoUserReducers,
  uploadReducers,
  moreInfoUserUpdateReducers,
};
