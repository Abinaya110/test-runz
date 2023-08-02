import { Modal } from "antd";
import Flex from "../../packages/Flex/Flex";
import styles from "./createoreditprocedure.module.css";
import SvgClose from "../../icons/SvgClose";
import Text from "../../packages/Text/Text";
import Button from "../../packages/Button/Button";
import InputText from "../../packages/InputText/InputText";
import { FormikProps } from "formik";
import { formType } from "./ProceduresScreen";
import Loader from "../../packages/Loader/Loader";
import moment from "moment";

type Props = {
  cancelClick: () => void;
  open: boolean;
  submit: () => void;
  title: string;
  formik: FormikProps<formType>;
  isEdit?: boolean;
  dataList: any;
  isLoader: boolean;
};
const CreateOrEditProcedure = ({
  cancelClick,
  open,
  submit,
  title,
  formik,
  isEdit,
  dataList,
  isLoader,
}: Props) => {
  return (
    <Modal
      width={700}
      onCancel={cancelClick}
      title={<Text type="title">{title}</Text>}
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
            Cancel
          </Button>
          <Button onClick={submit} className={styles.yesBtn}>
            {isEdit ? "Save" : "Create"}
          </Button>
        </Flex>
      }
    >
      <Flex className={styles.overAll}>
        {isLoader && <Loader />}
        {isEdit && (
          <Flex row className={styles.inputFlexMargin}>
            <Flex flex={1} className={styles.inputMarginRight20}>
              <InputText
                value={dataList?.procedure?._id}
                disabled
                label="Procedure ID (autogenerated)"
              />
            </Flex>
            <Flex flex={1}>
              <InputText
                label="Created on"
                disabled
                value={moment(dataList?.procedure?.createdAt).format(
                  "DD/MM/YYYY"
                )}
              />
            </Flex>
          </Flex>
        )}

        <Flex row className={styles.inputFlexMargin}>
          <Flex flex={1} className={styles.inputMarginRight20}>
            <InputText
              disabled
              label="Department"
              value={dataList?.user?.department?.toString()}
            />
          </Flex>
          <Flex flex={1}>
            <InputText
              disabled
              label="Laboratory"
              value={dataList?.user?.labtype?.toString()}
            />
          </Flex>
        </Flex>
        <Flex flex={1} className={styles.inputFlexMargin}>
          <InputText
            status={formik.touched.title && formik.errors.title ? "error" : ""}
            message={formik.errors.title}
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            label="Procedure name"
            required
          />
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CreateOrEditProcedure;
