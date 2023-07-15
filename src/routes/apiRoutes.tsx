import { authFetchUrl, proceduresFetchUrl } from "../utils/apiConfig";

export const signUpApi = authFetchUrl("register");
export const authMeApi = authFetchUrl("me");
export const googleLoginApi = authFetchUrl("googlelogin");

export const procedureApi = proceduresFetchUrl("procedure");
export const procedureByIdApi = (id: string) => {
  return proceduresFetchUrl(`procedure/byid/${id}`);
};
export const procedureByTitleApi = (title: string) => {
  return proceduresFetchUrl(`procedure/title/${title}`);
};
export const procedureUpdateAndDeleteApi = (id: string) => {
  return proceduresFetchUrl(`procedure/${id}`);
};
