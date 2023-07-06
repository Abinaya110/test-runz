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
