import { Modal } from "antd";
import styles from "./createnewrunzmodal.module.css";
import Flex from "../../packages/Flex/Flex";
import Button from "../../packages/Button/Button";
import Text from "../../packages/Text/Text";
import SvgClose from "../../icons/SvgClose";
import SelectTag from "../../packages/SelectTag/SelectTag";
import InputText from "../../packages/InputText/InputText";

type Props = {
  open: boolean;
  cancelClick: () => void;
  suubmit: () => void;
};
const CreateNewRunzModal = ({ open, suubmit, cancelClick }: Props) => {
  return (
    <Modal
      width={700}
      onCancel={cancelClick}
      title={<Text type="title">Create new Runz</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex row end center className={styles.footer}>
          <Button
            onClick={cancelClick}
            className={styles.cancelBtn}
            types="tertiary-1"
          >
            Create
          </Button>
          <Button onClick={suubmit} className={styles.yesBtn}>
            Create
          </Button>
        </Flex>
      }
    >
      <Flex className={styles.overAll}>
        <Flex row className={styles.inputFlexMargin}>
          <Flex flex={1} className={styles.inputMarginRight20}>
            <SelectTag options={[]} label="Department" />
          </Flex>
          <Flex flex={1}>
            <SelectTag options={[]} label="Category" />
          </Flex>
        </Flex>
        <Flex className={styles.inputFlexMargin}>
          <SelectTag options={[]} label="Procedure name" required />
        </Flex>
        <Flex row className={styles.inputFlexMargin}>
          <Flex flex={1} className={styles.inputMarginRight20}>
            <InputText label="Procedure ID (autogenerated)" />
          </Flex>
          <Flex flex={1}>
            <SelectTag options={[]} label="Select teacher" />
          </Flex>
        </Flex>
        <Flex row className={styles.inputFlexMargin}>
          <Flex flex={1} className={styles.inputMarginRight20}>
            <InputText label="28/05/2023" />
          </Flex>
          <Flex flex={1}>
            <InputText label="Select teacher" />
          </Flex>
        </Flex>
        <Flex className={styles.inputFlexMargin}>
          <InputText label="Test objective" />
        </Flex>
        <Flex row className={styles.inputFlexMargin}>
          <Flex flex={1} className={styles.inputMarginRight20}>
            <SelectTag options={[]} label="Current status" />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CreateNewRunzModal;
