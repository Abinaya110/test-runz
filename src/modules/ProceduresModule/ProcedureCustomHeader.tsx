import LableWithIcon from "../../common/LableWithIcon";
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
      </Flex>
    </Flex>
  );
};

export const CreatedOnHeader = () => {
  return (
    <Flex center middle className={styles.createdFlex}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created on"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        keyboardType="date"
        white
        size="small"
        placeholder="DD/MM/YYYY"
      />
    </Flex>
  );
};

export const CreatedByHeader = () => {
  return (
    <Flex center middle className={styles.createdFlex}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created By"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <InputText
        keyboardType="date"
        white
        size="small"
        placeholder="DD/MM/YYYY"
      />
    </Flex>
  );
};
