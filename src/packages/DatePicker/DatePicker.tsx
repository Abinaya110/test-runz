import classNames from "classnames/bind";
import SvgCalendar from "../../icons/SvgCalendar";
import LabelWrapper from "../LabelWrapper/LabelWrapper";
import styles from "./datepicker.module.scss";
import { DatePicker as DatePickerAntd } from "antd";

const cx = classNames.bind(styles);
type Props = {
  label?: string;
  disabled?: boolean;
  value?: any;
  onChange?: (a: any) => void;
};
const DatePicker = ({ label, disabled, value, onChange }: Props) => {
  return (
    <LabelWrapper label={label}>
      <DatePickerAntd
        disabled={disabled}
        className={cx("datepicker", { disabled })}
        suffixIcon={<SvgCalendar />}
        value={value}
        onChange={onChange}
      />
    </LabelWrapper>
  );
};

export default DatePicker;
