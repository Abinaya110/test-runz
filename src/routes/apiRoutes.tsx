import { authFetchUrl, proceduresFetchUrl } from "../utils/apiConfig";

export const signUpApi = authFetchUrl("register");
export const authMeApi = authFetchUrl("me");
export const googleLoginApi = authFetchUrl("googlelogin");

export const procedureApi = proceduresFetchUrl("procedure");
