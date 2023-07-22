export interface Settings {
  notification: Notification;
  roleSetting: RoleSetting;
  _id: string;
  organizationId: string;
  __v: number;
}
export interface Notification {
  procdure: ProcdureOrTasksubmitOrMessage;
  tasksubmit: ProcdureOrTasksubmitOrMessage;
  message: ProcdureOrTasksubmitOrMessage;
}
export interface ProcdureOrTasksubmitOrMessage {
  notification: boolean;
  mail: boolean;
}
export interface RoleSetting {
  procedure: Procedure;
  profile: Profile;
}
export interface Procedure {
  admin: AdminOrRequesterOrTester;
  requester: AdminOrRequesterOrTester;
  tester: AdminOrRequesterOrTester;
}
export interface AdminOrRequesterOrTester {
  create: boolean;
  delete: boolean;
  edit: boolean;
  view: boolean;
  assign: boolean;
  share: boolean;
}
export interface Profile {
  admin: AdminOrRequesterOrTester1;
  requester: AdminOrRequesterOrTester1;
  tester: AdminOrRequesterOrTester1;
}
export interface AdminOrRequesterOrTester1 {
  edituser: boolean;
  changepass: boolean;
  editorg: boolean;
}

export interface SettingsReducerState {
  isLoading: boolean;
  error: string;
  data?: Settings;
}

export interface UpdateReducerState {
  isLoading: boolean;
  error: string;
}

export interface GetUserList {
  _id: string;
  activeStatus: boolean;
  imageUrl: string;
  name: string;
  email: string;
  firebaseId: string;
  timeZone: string;
  firstuse: boolean;
  role: string;
  created_at: string;
  updated_at: string;
  __v: number;
  firstname?: string | null;
  lastname?: string | null;
}

export interface GetUserListReducerState {
  isLoading: boolean;
  error: string;
  data: GetUserList[];
}
