import { IsEmptyValueType } from "./validatorsTypes";

export const isEmpty = (value: IsEmptyValueType): boolean =>
  value === undefined || value === null || value === "";
