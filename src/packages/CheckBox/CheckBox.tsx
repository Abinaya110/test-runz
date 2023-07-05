import React, { memo, useCallback } from "react";
import CheckboxLabel from "./CheckboxLabel";
import styles from "./checkbox.module.css";
import SvgCheckBox from "../../icons/SvgCheckBox";
import SvgCheckBoxOutline from "../../icons/SvgCheckBoxOutline";
import { textColorsType } from "../Text/textTypes";

type DefaultPropsTypes = {
  name?: string;
  size?: number;
  labelColor?: textColorsType;
};

const defaultProps: DefaultPropsTypes = {
  size: 24,
  name: "",
  labelColor: "shade-3",
};

export type CheckBoxEventType = {
  target: {
    value: any[];
  };
};

type Props = {
  onClick?: (args: any) => void;
  onBlur?: (args: any) => void;
  checked?: boolean;
  size?: number;
  color?: string;
  label?: import("react").ReactNode;
  value?: any[];
  labelColor?: textColorsType;
} & typeof defaultProps;

const CheckBox = ({
  size,
  onClick,
  checked,
  onBlur,
  label,
  labelColor,
  name,
  value,
}: Props) => {
  const handleOnClick = useCallback(
    (e: any) => {
      const isValuePresent = Array.isArray(value);
      if (typeof onClick === "function") {
        if (!value) {
          e.target.value = [name];
        } else if (isValuePresent) {
          if (value.includes(name)) {
            const filteredValue = value.filter((v) => v !== name);
            e.target.value = filteredValue;
          } else {
            e.target.value = [...value, name];
          }
        }
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <div
      role={"button"}
      tabIndex={-1}
      onClick={handleOnClick}
      onBlur={onBlur}
      className={styles.container}
    >
      {checked ? (
        <SvgCheckBox width={size} height={size} />
      ) : (
        <SvgCheckBoxOutline width={size} height={size} />
      )}
      <CheckboxLabel label={label} labelColor={labelColor} />
    </div>
  );
};

CheckBox.defaultProps = defaultProps;

export default memo(CheckBox);
