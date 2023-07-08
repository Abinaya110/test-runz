import { textColorsType } from "../Text/textTypes";

export type buttonTypes =
  | "primary"
  | "secondary"
  | "link"
  | "tertiary"
  | "link-1";

export const buttonHelper = (types?: buttonTypes, disabled?: boolean) => {
  let textColor: textColorsType = "primary";
  if (types === "primary") {
    textColor = "primary";
  } else if (types === "secondary") {
    textColor = "theme";
  } else if (types === "link") {
    textColor = "link";
  } else if (types === "link-1") {
    textColor = "primary";
  }

  if (disabled && types === "primary") {
    textColor = "shade-2";
  } else if (disabled && types === "secondary") {
    textColor = "theme";
  } else if (disabled && types !== "secondary") {
    textColor = "white";
  }

  return { textColor };
};
