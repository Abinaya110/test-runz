export interface signUpReducerState {
  isLoading: boolean;
  error: string;
}

export interface AuthMe {
  _id: string;
  name: string;
  email: string;
  firebaseId: string;
  timeZone: string;
  role: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface AuthMeReducerState {
  isLoading: boolean;
  error: string;
  data: AuthMe;
}