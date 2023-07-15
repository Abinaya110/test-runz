import LableWithIcon from "../../common/LableWithIcon";
import SvgCalendar from "../../icons/SvgCalendar";
import SvgSearch from "../../icons/SvgSearch";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import styles from "./procedurecustomheader.module.css";

export const ProcedureHeader = () => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        type="bodyBold"
        color="shade-3"
        label="Runz details"
        actionRight={() => <SvgSort />}
        containerClassName={styles.sortTitleFlex}
      />

      <Flex row center flex={1}>
        <div style={{ flex: 1 }}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="ID"
          />
        </div>

        <div className={styles.inputMargin}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Department"
          />
        </div>
        <div style={{ flex: 1 }}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Lab"
          />
        </div>
        <div className={styles.inputMargin}>
          <InputText
            white
            size="small"
            placeholder="Procedure"
            actionRight={() => <SvgSearch height={20} width={20} />}
          />
        </div>
      </Flex>
    </Flex>
  );
};

export const CreatedOnHeader = () => {
  return (
    <Flex className={styles.createdFlex}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
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

export const CreatedByHeader = () => {
  return (
    <Flex className={styles.createdFlex}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created By"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        white
        size="small"
        placeholder="DD/MM/YYYY"
        actionRight={() => <SvgSearch />}
      />
    </Flex>
  );
};
