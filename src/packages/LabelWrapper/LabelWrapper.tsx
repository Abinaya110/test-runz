import { memo } from "react";
import classNames from "classnames/bind";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import styles from "./labelwarpper.module.css";
import { isEmpty } from "../../utils/validators";
import { textColorsType } from "../Text/textTypes";

const cx = classNames.bind(styles);

type Props = {
  required?: boolean;
  children?: import("react").ReactNode;
  label?: string;
  bold?: boolean;
  isFocus?: boolean;
  error?: boolean;
  labelColor?: textColorsType;
};

const LabelWrapper = ({ required, children, label }: Props) => {
  let requiredErrorColor: textColorsType;
  let labelErrorColor: textColorsType;

  labelErrorColor = "primary";
  requiredErrorColor = "theme";

  return !isEmpty(label) ? (
    <Flex className={cx("overAll")}>
      <Flex row className={cx("labelConatiner")}>
        <Text
          color={labelErrorColor}
          className={cx("labelText")}
          type="captionBold"
        >
          {label}
        </Text>
        {required && (
          <Text type="captionBold" color={requiredErrorColor}>
            *
          </Text>
        )}
      </Flex>
      {children}
    </Flex>
  ) : (
    <>{children}</>
  );
};

export default memo(
  LabelWrapper,
  (prevProps, nextProps) => prevProps.children === nextProps.children
);
