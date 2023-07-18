import { useState } from "react";
import Button from "../packages/Button/Button";
import SvgEye from "../icons/SvgEye";

export const useVisibilityIcon = () => {
  const [isVisible, setVisible] = useState(false);
  const [isVisibleOne, setVisibleOne] = useState(false);

  const hanldeToggle = () => {
    setVisible(!isVisible);
  };

  const hanldeToggleOne = () => {
    setVisibleOne(!isVisibleOne);
  };

  const visibleIcon = () => {
    return (
      <Button
        onClick={hanldeToggle}
        types="link"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgEye fill={isVisible ? "#996A69" : "#A8A8A8"} />
      </Button>
    );
  };

  const visibleIconOne = () => {
    return (
      <Button
        onClick={hanldeToggleOne}
        types="link"
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SvgEye fill={isVisibleOne ? "#996A69" : "#A8A8A8"} />
      </Button>
    );
  };

  return { visibleIcon, isVisible, visibleIconOne, isVisibleOne };
};

export const getPasswordStrength = (password: string) => {
  if (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[!@#$%^&*]/.test(password)
  ) {
    return "Strong strength";
  } else if (
    password.length >= 6 &&
    /[a-zA-Z]/.test(password) &&
    (/\d/.test(password) || /[!@#$%^&*]/.test(password))
  ) {
    return "Medium strength";
  } else {
    return "Weak strength";
  }
};

// export const isValidPhoneNumber=(phoneNumber:any, countryCode:any)=> {
//   try {
//     const parsedNumber = PhoneNumber(phoneNumber, countryCode);

//     return parsedNumber.isValid();
//   } catch (error) {
//     return false;
//   }
// }
