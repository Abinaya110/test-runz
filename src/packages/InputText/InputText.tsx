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
  message?: string;
};

const InputText = ({ onChange, label, password, required, message }: Props) => {
  return (
    <LabelWrapper label={label} required={required} message={message}>
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
        <Input size="large" onChange={onChange} />
      </ConfigProvider>
    </LabelWrapper>
  );
};

export default InputText;
