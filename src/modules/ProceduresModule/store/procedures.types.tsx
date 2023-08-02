export interface Procedures {
  user: User;
  data?: DataEntity[];
}
export interface User {
  _id: string;
  email: string;
  userId: string;
  __v: number;
  createdAt: string;
  department?: string[];
  labtype?: string[];
  name: string;
  organization: string;
  procedureIds?: string[];
  role: string;
  updatedAt: string;
  userCounter: string;
}
export interface DataEntity {
  id: string;
  title: string;
}

export interface ProceduresReducerState {
  isLoading: boolean;
  error: string;
  data: Procedures;
}

export interface ProceduresID {
  user?: User;
  procedure?: Procedure;
}

export interface Procedure {
  _id: string;
  title: string;
  html: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProcedureByIdReducerState {
  isLoading: boolean;
  error: string;
  data: ProceduresID;
}
