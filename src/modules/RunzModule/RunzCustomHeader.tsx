import LableWithIcon from "../../common/LableWithIcon";
import SvgCalendar from "../../icons/SvgCalendar";
import SvgSearch from "../../icons/SvgSearch";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import styles from "./runzcustomheader.module.css";

const RunzCustomHeader = () => {
  return (
    <Flex row flex={1} className={styles.container}>
      <Flex flex={1}>
        <LableWithIcon
          type="bodyBold"
          color="shade-3"
          label="Runz details"
          actitionRight={() => <SvgSort />}
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
      <Flex row center flex={1}>
        <Flex className={styles.createdFlex} flex={1}>
          <LableWithIcon
            containerClassName={styles.sortTitleFlex}
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
        <Flex flex={1}>
          <LableWithIcon
            containerClassName={styles.sortTitleFlex}
            label="Due date"
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
        <Flex flex={1} className={styles.inputMargin}>
          <LableWithIcon
            containerClassName={styles.sortTitleFlex}
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
        <Flex flex={1}>
          <LableWithIcon
            containerClassName={styles.sortTitleFlex}
            label="Assigned by"
            type="bodyBold"
            color="shade-3"
            actitionRight={() => <SvgSort />}
          />

          <InputText
            white
            size="small"
            placeholder="Select teacher"
            actionRight={() => <SvgSearch height={20} width={20} />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RunzCustomHeader;
