import { FormikProps } from "formik";
import LableWithIcon from "../../common/LableWithIcon";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import styles from "./runzcustomheader.module.css";
import { formFilterType } from "./RunzScreen";

export const RunzDetailsHeader = ({
  formikFilter,
}: {
  formikFilter: FormikProps<formFilterType>;
}) => {
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
            value={formikFilter.values.id}
            isClearable
            onChange={(event) => {
              if (event) {
                formikFilter.setFieldValue("id", event);
              } else {
                formikFilter.setFieldValue("id", "");
              }
            }}
          />
        </div>

        <div className={styles.inputMargin}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Department"
            value={formikFilter.values.department}
            isClearable
            onChange={(event) => {
              if (event) {
                formikFilter.setFieldValue("department", event);
              } else {
                formikFilter.setFieldValue("department", "");
              }
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Lab"
            value={formikFilter.values.lab}
            isClearable
            onChange={(event) => {
              if (event) {
                formikFilter.setFieldValue("lab", event);
              } else {
                formikFilter.setFieldValue("lab", "");
              }
            }}
          />
        </div>
      </Flex>
    </Flex>
  );
};

export const RunzCreatedOnHeader = ({
  formikFilter,
}: {
  formikFilter: FormikProps<formFilterType>;
}) => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created on"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />
      <Flex flex={1}>
        <InputText
          value={formikFilter.values.createdOn}
          onChange={formikFilter.handleChange("createdOn")}
          white
          size="small"
          keyboardType="date"
        />
      </Flex>
    </Flex>
  );
};
export const RunzDueDateHeader = ({
  formikFilter,
}: {
  formikFilter: FormikProps<formFilterType>;
}) => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Due date"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />
      <Flex flex={1}>
        <InputText
          white
          size="small"
          keyboardType="date"
          value={formikFilter.values.dueDate}
          onChange={formikFilter.handleChange("dueDate")}
        />
      </Flex>
    </Flex>
  );
};

export const RunzStatusHeader = ({
  formikFilter,
}: {
  formikFilter: FormikProps<formFilterType>;
}) => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Status"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />
      <div style={{ flex: 1 }}>
        <SelectTag
          options={[{ label: "ss", value: "11" }]}
          inputHeight={35}
          value={formikFilter.values.status}
          isClearable
          onChange={(event) => {
            if (event) {
              formikFilter.setFieldValue("status", event);
            } else {
              formikFilter.setFieldValue("status", "");
            }
          }}
        />
      </div>
    </Flex>
  );
};

export const RunzAssignedHeader = ({
  formikFilter,
}: {
  formikFilter: FormikProps<formFilterType>;
}) => {
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Assigned by"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />

      <div style={{ flex: 1 }}>
        <SelectTag
          options={[{ label: "ss", value: "11" }]}
          inputHeight={35}
          value={formikFilter.values.assignedBy}
          isClearable
          onChange={(event) => {
            if (event) {
              formikFilter.setFieldValue("assignedBy", event);
            } else {
              formikFilter.setFieldValue("assignedBy", "");
            }
          }}
        />
      </div>
    </Flex>
  );
};
