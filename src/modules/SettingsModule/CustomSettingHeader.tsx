import LableWithIcon from "../../common/LableWithIcon";
import SvgCalendar from "../../icons/SvgCalendar";
import SvgSearch from "../../icons/SvgSearch";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import styles from "../RunzModule/runzcustomheader.module.css";
import SelectTag from "../../packages/SelectTag/SelectTag";

const CustomSettingHeader = () => {
  return (
    <Flex row flex={1} className={styles.container}>
      <Flex flex={1}>
        <LableWithIcon
          type="bodyBold"
          color="shade-3"
          label="User details"
          actitionRight={() => <SvgSort />}
          containerClassName={styles.sortTitleFlexSettings}
        />

<Flex row center flex={1}>
          <div style={{ flex: 1 }}>
            <SelectTag
              options={[{ label: "ss", value: "11" }]}
              inputHeight={35}
              placeholder="ID"
            />
          </div>

          <div className={styles.inputMarginSettings}>
            <SelectTag
              options={[{ label: "ss", value: "11" }]}
              inputHeight={35}
              placeholder="Department"
            />
          </div>
          <div className={styles.inputMarginSettings}>
            <InputText
              white
              size="small"
              placeholder="Procedure"
              actionRight={() => <SvgSearch height={20} width={20} />}
            />
          </div>
        </Flex>
      </Flex>
      <Flex row center flex={1}>
        <Flex className={styles.createdFlex} flex={1}>
          <LableWithIcon
            containerClassName={styles.sortTitleFlexSettings}
            label="Created on"
            type="bodyBold"
            color="shade-3"
            actitionRight={() => <SvgSort />}
          />

          <InputText
            white
            size="small"
            placeholder="DD/MM/YYYY"
            actionRight={() => <SvgCalendar />}
          />
        </Flex>

        <Flex flex={1} className={styles.inputMarginSettings}>
          <LableWithIcon
            containerClassName={styles.sortTitleFlexSettings}
            label="Role"
            type="bodyBold"
            color="shade-3"
            actitionRight={() => <SvgSort />}
          />

          <InputText
            white
            size="small"
            placeholder="Select Role"
            actionRight={() => <SvgSearch height={20} width={20} />}
          />
        </Flex>

        <Flex flex={1} className={styles.inputMarginSettings}>
          <LableWithIcon
            containerClassName={styles.sortTitleFlexSettings}
            label="Status"
            type="bodyBold"
            color="shade-3"
            actitionRight={() => <SvgSort />}
          />

          <InputText
            white
            size="small"
            placeholder="Select status"
            actionRight={() => <SvgSearch height={20} width={20} />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomSettingHeader;
