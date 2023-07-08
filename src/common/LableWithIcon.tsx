import Flex from "../packages/Flex/Flex";
import Text from "../packages/Text/Text";
import { textColorsType, textType } from "../packages/Text/textTypes";

type Props = {
  label: string;
  actionLeft?: Function;
  actitionRight?: Function;
  color?: textColorsType;
  type?: textType;
  containerClassName?: string;
};

const LableWithIcon = ({
  label,
  actionLeft,
  actitionRight,
  color,
  type,
  containerClassName,
}: Props) => {
  return (
    <Flex className={containerClassName} row center>
      {typeof actionLeft === "function" && (
        <div style={{ marginRight: 8 }}>{actionLeft()}</div>
      )}
      <Text color={color} type={type}>
        {label}
      </Text>
      {typeof actitionRight === "function" && (
        <div style={{ marginLeft: 8 }}>{actitionRight()}</div>
      )}
    </Flex>
  );
};

export default LableWithIcon;
