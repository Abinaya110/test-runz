import { Input, ConfigProvider } from "antd";
import {
  error,
  gray3,
  white,
  primaryShade1,
  primaryShade3,
} from "../../theme/colors";
import LabelWrapper from "../LabelWrapper/LabelWrapper";
import { CSSProperties } from "react";
import { InputStatus } from "antd/es/_util/statusUtils";

type Props = {
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  name?: string;
  label?: string;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  onChange?: (a: any) => void;
  maxLength?: number;
  minLength?: number;
  onKeyPress?: (a: any) => void;
  style?: CSSProperties;
  password?: boolean;
  status?: InputStatus;
};
const InputText = ({ onChange, status, label, password, required }: Props) => {
  return (
    <LabelWrapper label={label} required={required}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              colorBorder: gray3,
              colorBgContainer: white,
              colorError: error,
              colorPrimaryActive: primaryShade1,
              colorPrimaryHover: primaryShade3,
              borderRadius: 10,
            },
          },
        }}
      >
        {password ? (
          <Input.Password status={status} size="large" onChange={onChange} />
        ) : (
          <Input status={status} size="large" onChange={onChange} />
        )}
      </ConfigProvider>
    </LabelWrapper>
  );
};

export default InputText;
