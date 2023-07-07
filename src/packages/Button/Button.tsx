import classNames from "classnames/bind";
import Text from "../Text/Text";
import styles from "./button.module.css";
import { buttonHelper, buttonTypes } from "./buttonHelper";

const cx = classNames.bind(styles);

type Props = {
  children: import("react").ReactChild;
  types?: buttonTypes;
  className?: string;
  disabled?: boolean;
  onClick?: (arg: any) => void;
  style?: any;
  onKeyDown?: (arg: any) => void;
  textSize?: number;
  id?: string;
  type?: "button" | "submit" | "reset";
  height?: "small" | "medium" | "large";
};

const Button = ({
  children,
  types,
  className,
  disabled,
  onClick,
  style,
  onKeyDown,
  textSize,
  id,
  type,
  height,
}: Props) => {
  const buttonClassName = cx(
    {
      [`buttonTypes-${types}`]: types,
      [`disabled-${types}`]: disabled,
      [`height-${height}`]: height,
    },
    className,
    "common"
  );

  const { textColor } = buttonHelper(types, disabled);

  let size = 16;

  if (height === "small" || height === "medium") {
    size = 16;
  } else {
    size = 20;
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      style={style}
      disabled={disabled}
      className={buttonClassName}
      onKeyDown={onKeyDown}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <Text
          bold={height === "large" ? "bold" : "semiBold"}
          size={textSize || size}
          color={textColor}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </button>
  );
};

const defaultProps = {
  types: "primary",
  type: "button",
  height: "medium",
};

Button.defaultProps = defaultProps;

export default Button;