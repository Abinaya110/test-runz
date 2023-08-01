import {
  authFetchUrl,
  fetchUrl,
  moreInfoFetchUrl,
  proceduresFetchUrl,
} from "../utils/apiConfig";

export const uploadApi = fetchUrl("upload");

export const signUpApi = authFetchUrl("register");
export const authMeApi = authFetchUrl("me");
export const googleLoginApi = authFetchUrl("googlelogin");
export const microsoftLoginApi = authFetchUrl("microsoftlogin");
export const linkedinLoginApi = authFetchUrl("linkedinlogin");

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

export const moreInfoListApi = moreInfoFetchUrl(`moreinfo/list`);
export const moreInfoUserApi = moreInfoFetchUrl(`moreinfo/user`);
export const moreInfoApi = moreInfoFetchUrl(`moreinfo`);
export const getUserListApi = moreInfoFetchUrl("moreinfo");
export const getUserListUpdateApi = (id: string) => {
  return moreInfoFetchUrl(`moreinfo/${id}`);
};

export const settingApi = (id: string) => {
  const result = fetchUrl(`setting/${id}`);
  return result;
};

export const settingUpdateApi = (id: string) => {
  const result = fetchUrl(`setting/${id}`);
  return result;
};

export const authCreateApi = authFetchUrl("create");
export const authDisableApi = authFetchUrl("remove");
