import { Modal } from "antd";
import Text from "../../packages/Text/Text";
import SvgClose from "../../icons/SvgClose";
import Flex from "../../packages/Flex/Flex";
import styles from "./addpeoplemodal.module.css";
import Button from "../../packages/Button/Button";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { FormikProps } from "formik";
import { formType } from "./RunzScreen";

type Props = {
  options: any[];
  formik: FormikProps<formType>;
  open: boolean;
  cancel: () => void;
};

const AddPeopleModal = ({ options, formik, open, cancel }: Props) => {
  return (
    <Modal
      width={700}
      onCancel={() => {}}
      title={<Text type="title">Add people</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex row className={styles.footer}>
          <Button
            types="secondary"
            onClick={cancel}
            className={styles.cancelBtn}
          >
            Cancel
          </Button>
          <Button onClick={cancel} className={styles.yesBtn}>
            Save
          </Button>
        </Flex>
      }
    >
      <Flex>
        <SelectTag
          value={formik.values.assignTo}
          label="You have selected following people."
          options={options}
          isMulti
          isClearable
          isSearchable
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.userId}
          inputHeight={500}
          inputMaxHeight
          onChange={(event) => {
            if (event) {
              formik.setFieldValue("assignTo", event);
            } else {
              formik.setFieldValue("assignTo", "");
            }
          }}
        />
      </Flex>
    </Modal>
  );
};

export default AddPeopleModal;
