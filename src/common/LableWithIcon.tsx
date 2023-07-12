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
  labelSize?: number;
};

const LableWithIcon = ({
  label,
  actionLeft,
  actitionRight,
  color,
  type,
  containerClassName,
  labelSize,
}: Props) => {
  return (
    <Flex className={containerClassName} row center>
      {typeof actionLeft === "function" && (
        <div style={{ marginRight: 4 }}>{actionLeft()}</div>
      )}
      <Text size={labelSize} color={color} type={type}>
        {label}
      </Text>
      {typeof actitionRight === "function" && (
        <div style={{ marginLeft: 4 }}>{actitionRight()}</div>
      )}
    </Flex>
  );
};

export default LableWithIcon;
