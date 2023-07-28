import { useMemo } from "react";
import LableWithIcon from "../../common/LableWithIcon";
import SvgCalendar from "../../icons/SvgCalendar";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { MoreInfoList } from "../MyPageModule/store/mypage.types";
import styles from "./userscreentableheader.module.css";
import { FormikProps } from "formik";
import { filterFormType } from "./UserTab";
import { isEmpty } from "../../utils/validators";

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
            inputHeight={35}
            placeholder="Select organisation"
            value={formik.values.organisation}
            onChange={(event) => {
              formik.setFieldValue("department", "");
              formik.setFieldValue("lab", "");
              formik.setFieldValue("organisation", {
                organization: event.organisation,
                _id: event._id,
              });
            }}
            options={moreInfoList}
            getOptionLabel={(option) => option.organization}
            getOptionValue={(option) => option._id}
          />
        </div>

        <Flex flex={1} marginRight={8} marginLeft={8}>
          <SelectTag
            isDisabled={isEmpty(formik.values.organisation)}
            inputHeight={35}
            placeholder="Select department"
            required
            value={formik.values.department}
            onChange={(event) => {
              formik.setFieldValue("department", event);
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
            isDisabled={isEmpty(formik.values.organisation)}
            inputHeight={35}
            placeholder="Select lab"
            isMulti
            value={formik.values.lab}
            onChange={(event) => {
              formik.setFieldValue("lab", event);
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
      <div style={{ flex: 1 }}>
        <SelectTag
          options={[{ label: "ss", value: "11" }]}
          inputHeight={35}
          placeholder="Select Role"
        />
      </div>
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
      <div style={{ flex: 1 }}>
        <SelectTag
          options={[{ label: "ss", value: "11" }]}
          inputHeight={35}
          placeholder="Select status"
        />
      </div>
    </Flex>
  );
};
