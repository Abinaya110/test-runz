import LableWithIcon from "../../common/LableWithIcon";
import SvgCalendar from "../../icons/SvgCalendar";
import SvgSearch from "../../icons/SvgSearch";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import styles from "./userscreentableheader.module.css";

export const UserDetailsHeader = () => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        type="bodyBold"
        color="shade-3"
        label="User details"
        actionRight={() => <SvgSort />}
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

        <Flex flex={1} marginRight={8} marginLeft={8}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Department"
          />
        </Flex>
        <Flex flex={1}>
          <InputText
            white
            size="small"
            placeholder="Procedure"
            actionRight={() => <SvgSearch height={20} width={20} />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export const AddOnHeader = () => {
  return (
    <Flex className={styles.createdFlex} flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Created on"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="DD/MM/YYYY"
        actionRight={() => <SvgCalendar />}
      />
    </Flex>
  );
};

export const RoleHeader = () => {
  return (
    <Flex flex={1} className={styles.inputMarginSettings}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Role"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="Select Role"
        actionRight={() => <SvgSearch height={20} width={20} />}
      />
    </Flex>
  );
};

export const StatusHeader = () => {
  return (
    <Flex flex={1} className={styles.inputMarginSettings}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Status"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="Select status"
        actionRight={() => <SvgSearch height={20} width={20} />}
      />
    </Flex>
  );
};
