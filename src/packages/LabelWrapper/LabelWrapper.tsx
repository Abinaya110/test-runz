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
  error?: boolean;
  message?: string;
};

const LabelWrapper = ({ required, children, label, error, message }: Props) => {
  let messageColor: textColorsType = "error";

  if (error) {
    messageColor = "error";
  }
  return !isEmpty(label) ? (
    <Flex className={cx("overAll")}>
      <Flex between row className={cx("labelConatiner")}>
        <Flex row>
          <Text
            color={"primary"}
            className={cx("labelText")}
            type="captionBold"
          >
            {label}
          </Text>
          {required && (
            <Text type="captionBold" color={"theme"}>
              *
            </Text>
          )}
        </Flex>
        <Text type="captionRegular" color={messageColor}>
          {message}
        </Text>
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
