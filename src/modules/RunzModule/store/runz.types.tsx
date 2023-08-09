export interface RunzReducerState {
  isLoading: boolean;
  error: string;
  data: any;
}

export interface GetRunzListDetails {
  experiment: Experiment;
}
export interface Experiment {
  _id: string;
  procedureId: string;
  procedurename: string;
  testobjective: string;
  dueDate: string;
  status: string;
  assignTo?: AssignToEntity[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface AssignToEntity {
  userId: string;
  date: string;
  _id: string;
}

export interface RunzDetailsReducerState {
  isLoading: boolean;
  error: string;
  data: GetRunzListDetails;
}

export interface RunzList {
  _id: string;
  procedureId: string;
  procedurename: string;
  testobjective: string;
  dueDate: string;
  status: string;
  datas: string;
  organization: string;
  department: string;
  labType: string;
  createdBy: string;
  assignTo?: AssignToEntity[] | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface AssignToEntity {
  userId: string;
  date: string;
  _id: string;
}

export interface RunzListReducerState {
  isLoading: boolean;
  error: string;
  data?: RunzList[];
}
