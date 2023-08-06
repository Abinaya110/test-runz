import { useMemo } from "react";
import { FormikProps } from "formik";
import LableWithIcon from "../../common/LableWithIcon";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { isEmpty } from "../../utils/validators";
import { MoreInfoList } from "../MyPageModule/store/mypage.types";
import { designationOptions } from "../LoginModule/mock";
import styles from "./userscreentableheader.module.css";
import { filterFormType } from "./UserTab";
import { STATUS_OPTIONS } from "./mock";
import { log } from "console";

export const UserDetailsHeader = ({
  moreInfoList,
  formik,
}: {
  moreInfoList: MoreInfoList[];
  formik: FormikProps<filterFormType>;
}) => {
  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list.organization === formik.values.organisation?.organization
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [formik.values.organisation]);

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
            isClearable
            isSearchable
            inputHeight={35}
            placeholder="Select organisation"
            value={formik.values.organisation}
            onChange={(event) => {
              formik.setFieldValue("department", "");
              formik.setFieldValue("lab", "");
              if (event) {
                formik.setFieldValue("organisation", {
                  organization: event.organization,
                  _id: event._id,
                });
              } else {
                formik.setFieldValue("organisation", "");
              }
            }}
            options={moreInfoList}
            getOptionLabel={(option) => option.organization}
            getOptionValue={(option) => option._id}
          />
        </div>

        <Flex flex={1} marginRight={8} marginLeft={8}>
          <SelectTag
            isClearable
            isSearchable
            isDisabled={isEmpty(formik.values.organisation)}
            inputHeight={35}
            placeholder="Select department"
            required
            value={formik.values.department}
            onChange={(event) => {
              if (event) {
                formik.setFieldValue("department", event);
              } else {
                formik.setFieldValue("department", "");
              }
            }}
            options={
              getDepartmentOption?.department
                ? getDepartmentOption?.department
                : []
            }
          />
        </Flex>

        <Flex flex={1}>
          <SelectTag
            isClearable
            isSearchable
            isDisabled={isEmpty(formik.values.organisation)}
            inputHeight={35}
            placeholder="Select lab"
            value={formik.values.lab}
            onChange={(event) => {
              if (event) {
                formik.setFieldValue("lab", event);
              } else {
                formik.setFieldValue("lab", "");
              }
            }}
            options={
              getDepartmentOption?.labtype ? getDepartmentOption?.labtype : []
            }
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export const AddOnHeader = ({
  formik,
}: {
  formik: FormikProps<filterFormType>;
}) => {
  return (
    <Flex className={styles.createdFlex} flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Created on"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />
      <Flex flex={1}>
        <InputText
          keyboardType="date"
          value={formik.values.addOn}
          onChange={formik.handleChange("addOn")}
          white
          size="small"
          placeholder="DD/MM/YYYY"
        />
      </Flex>
    </Flex>
  );
};

export const RoleHeader = ({
  formik,
}: {
  formik: FormikProps<filterFormType>;
}) => {
  return (
    <Flex flex={1} className={styles.inputMarginSettings}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Role"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />
      <Flex flex={1}>
        <SelectTag
          isClearable
          isSearchable
          value={formik.values.role}
          onChange={(event) => {
            if (event) {
              formik.setFieldValue("role", event);
            } else {
              formik.setFieldValue("role", "");
            }
          }}
          options={designationOptions}
          inputHeight={35}
          placeholder="Select Role"
        />
      </Flex>
    </Flex>
  );
};

export const StatusHeader = ({
  formik,
}: {
  formik: FormikProps<filterFormType>;
}) => {
  return (
    <Flex flex={1} className={styles.inputMarginSettings}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlexSettings}
        label="Status"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />
      <Flex flex={1}>
        <SelectTag
          isClearable
          isSearchable
          value={formik.values.status}
          onChange={(event) => {
            if (event) {
              formik.setFieldValue("status", event);
            } else {
              formik.setFieldValue("status", "");
            }
          }}
          options={STATUS_OPTIONS}
          inputHeight={35}
          placeholder="Select status"
        />
      </Flex>
    </Flex>
  );
};
