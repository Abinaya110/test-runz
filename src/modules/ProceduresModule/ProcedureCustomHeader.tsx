import { FormikProps } from "formik";
import { useMemo } from "react";
import LableWithIcon from "../../common/LableWithIcon";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { MoreInfoList } from "../MyPageModule/store/mypage.types";
import { filterFormType } from "./ProceduresScreen";
import styles from "./procedurecustomheader.module.css";
import { Procedures } from "./store/procedures.types";

export const ProcedureHeader = ({
  moreInfoList,
  formik,
  dataList,
}: {
  moreInfoList: MoreInfoList[];
  formik: FormikProps<filterFormType>;
  dataList: Procedures;
}) => {
  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list._id === dataList?.organization
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [dataList?.organization]);

  const getIdOptions: any = dataList?.procedureIds?.map((list) => {
    return { label: list.id, value: list.id };
  });
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
            isClearable
            isSearchable
            options={getIdOptions?.length > 0 ? getIdOptions : []}
            inputHeight={35}
            placeholder="ID"
            value={formik.values.id}
            onChange={(event) => {
              formik.setFieldValue("id", event);
            }}
          />
        </div>

        <div className={styles.inputMargin}>
          <SelectTag
            isClearable
            isSearchable
            inputHeight={35}
            placeholder="Department"
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
        </div>
        <div style={{ flex: 1 }}>
          <SelectTag
            isClearable
            isSearchable
            inputHeight={35}
            placeholder="Lab"
            value={formik.values.lab}
            onChange={(event) => {
              formik.setFieldValue("lab", event);
            }}
            options={
              getDepartmentOption?.labtype ? getDepartmentOption?.labtype : []
            }
          />
        </div>
      </Flex>
    </Flex>
  );
};

export const CreatedOnHeader = ({
  formik,
}: {
  formik: FormikProps<filterFormType>;
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
          keyboardType="date"
          white
          size="small"
          placeholder="DD/MM/YYYY"
          value={formik.values.createdOn}
          onChange={formik.handleChange("createdOn")}
        />
      </Flex>
    </Flex>
  );
};

export const CreatedByHeader = ({
  formik,
  dataList,
}: {
  formik: FormikProps<filterFormType>;
  dataList: Procedures;
}) => {
  const getNameOptions: any = dataList?.procedureIds?.map((list) => {
    return { label: list.createdBy, value: list.createdBy };
  });
  const uniqueData = getNameOptions?.filter(
    (item: any, index: any, self: any) => {
      // Find the index of the first occurrence of the item in the array
      const firstIndex = self.findIndex(
        (obj: any) => obj.label === item.label && obj.value === item.value
      );
      // Keep only the first occurrence (index matches the current index)
      return index === firstIndex;
    }
  );

  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created By"
        type="bodyBold"
        color="shade-3"
        actionRight={() => <SvgSort />}
      />
      <Flex flex={1}>
        <SelectTag
          isClearable
          isSearchable
          inputHeight={35}
          placeholder="Created By"
          value={formik.values.createdBy}
          onChange={(event) => {
            formik.setFieldValue("createdBy", event);
          }}
          options={uniqueData?.length > 0 ? uniqueData : []}
        />
      </Flex>
    </Flex>
  );
};
