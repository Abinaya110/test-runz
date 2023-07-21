import Flex from "../../packages/Flex/Flex";
import styles from "./profilescreen.module.css";
import InputText from "../../packages/InputText/InputText";
import SvgDesignation from "../../icons/SvgDesignation";
import SvgOrganisation from "../../icons/SvgOrganisation";
import SvgUserInput from "../../icons/SvgUserInput";
import SvgProfileEdit from "../../icons/SvgProfileEdit";
import ScreenHeader from "./SettingScreenHeader";
import Accordion from "../../packages/Accordian/Accordian";
import { getPasswordStrength, useVisibilityIcon } from "../../utils/helpers";
import { Collapse, CollapseProps } from "antd";
import SvgArrowDown from "../../icons/SvgArrowDown";
import SvgArrowUp from "../../icons/SvgArrowUp";
import Text from "../../packages/Text/Text";
import { useEffect, useMemo, useRef } from "react";
import { isEmpty } from "../../utils/validators";
import { useFormik } from "formik";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  moreInfoListMiddleWare,
  moreInfoMiddleWare,
  moreInfoUserMiddleWare,
} from "../MyPageModule/store/mypageMiddleware";
import {
  authMeMiddleWare,
  authMeUpdateMiddleWare,
  uploadMiddleWare,
} from "../LoginModule/store/loginMiddleware";
import ErrorMessage from "../../packages/ErrorMessage/ErrorMessage";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { designationOptions } from "../LoginModule/mock";
import Button from "../../packages/Button/Button";
import Loader from "../../packages/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { statusType } from "../../packages/InputText/inputTextTypes";

export type formType = {
  firstName: string;
  lastName: string;
  email: string;
  organization: any;
  department: any;
  lab: any;
  profile: any;
};

const initialValues: formType = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  department: "",
  lab: "",
  profile: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.firstName)) {
    errors.firstName = "First Name field is required";
  }
  if (isEmpty(values.lastName)) {
    errors.lastName = "Last Name field is required";
  }
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  }

  if (isEmpty(values.organization)) {
    errors.organization = "organization field is required";
  }
  if (isEmpty(values.department)) {
    errors.department = "Department field is required";
  }
  if (isEmpty(values.lab)) {
    errors.lab = "Lab type field is required";
  }
  return errors;
};

type formTypePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const initialPasswordValues: formTypePassword = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const validatePassword = (values: formTypePassword) => {
  const errors: Partial<formTypePassword> = {};
  if (isEmpty(values.oldPassword)) {
    errors.oldPassword = "Old password field is required";
  }
  if (isEmpty(values.newPassword)) {
    errors.newPassword = "Password field is required";
  } else if (getPasswordStrength(values.newPassword) !== "Strong strength") {
    errors.newPassword = getPasswordStrength(values.newPassword);
  }

  if (isEmpty(values.confirmPassword)) {
    errors.confirmPassword = "Password field is required";
  } else if (
    values.newPassword.length !== 0 &&
    values.confirmPassword.length !== 0 &&
    values.newPassword !== values.confirmPassword
  ) {
    errors.confirmPassword = "Password not matched";
  }

  return errors;
};

const ProfileScreen = () => {
  const { visibleIcon, isVisible, visibleIconOne, isVisibleOne } =
    useVisibilityIcon();
  const dispatch: AppDispatch = useDispatch();
  const fileInputRef = useRef<any>(null);

  const handleProfileClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    dispatch(moreInfoListMiddleWare());
  }, []);

  const {
    moreInfoData,
    moreInfoList,
    uploadLoader,
    updateLoader,
    moreInfoUserLoader,
    authMeLoader,
  } = useSelector(
    ({
      authMeReducers,
      moreInfoUserReducers,
      moreInfoListReducers,
      uploadReducers,
      moreInfoUserUpdateReducers,
    }: RootState) => {
      return {
        moreInfoData: moreInfoUserReducers.data,
        moreInfoList: moreInfoListReducers.data,
        uploadLoader: uploadReducers.isLoading,
        updateLoader: moreInfoUserUpdateReducers.isLoading,
        authMeLoader: authMeReducers.isLoading,
        moreInfoUserLoader: moreInfoUserReducers.isLoading,
      };
    }
  );

  const handleSubmit = (values: formType) => {
    if (values.profile?.name) {
      let formData = new FormData();
      formData.append("image", values.profile);
      dispatch(uploadMiddleWare({ formData })).then((res) => {
        if (res.payload?.imageUrl) {
          const beforeQuestionMark = res.payload.imageUrl.split("?")[0];
          dispatch(
            moreInfoMiddleWare({
              activeStatus: false,
              imageUrl: beforeQuestionMark,
              firstname: values.firstName,
              lastname: values.lastName,
              email: values.email,
              organization: values.organization,
              department: values.department.value,
              labtype: values.lab,
            })
          ).then(() => {
            dispatch(moreInfoUserMiddleWare());
          });
          dispatch(
            authMeUpdateMiddleWare({
              activeStatus: false,
              imageUrl: beforeQuestionMark,
              firstname: values.firstName,
              lastname: values.lastName,
              email: values.email,
              organization: values.organization,
              department: values.department.value,
              labtype: values.lab,
            })
          ).then(() => {
            dispatch(authMeMiddleWare());
          });
        }
      });
    } else {
      dispatch(
        moreInfoMiddleWare({
          activeStatus: false,
          imageUrl: formik.values.profile,
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          organization: values.organization,
          department: values.department,
          labtype: values.lab,
        })
      ).then(() => {
        dispatch(moreInfoUserMiddleWare());
      });
      dispatch(
        authMeUpdateMiddleWare({
          activeStatus: false,
          imageUrl: formik.values.profile,
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          organization: values.organization,
          department: values.department,
          labtype: values.lab,
        })
      ).then(() => {
        dispatch(authMeMiddleWare());
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  const formikPassword = useFormik({
    initialValues: initialPasswordValues,
    onSubmit: () => {},
    validate: validatePassword,
  });

  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list.organization === formik.values.organization?.organization
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [formik.values.organization]);

  useEffect(() => {
    if (!isEmpty(moreInfoData?.firstname)) {
      formik.setFieldValue("firstName", moreInfoData.firstname);
      formik.setFieldValue("lastName", moreInfoData.lastname);
      formik.setFieldValue(
        "organization",
        typeof moreInfoData.organization === "string"
          ? {
              organization: moreInfoData.organization,
              _id: moreInfoData._id,
            }
          : moreInfoData.organization
      );
      formik.setFieldValue(
        "department",
        typeof moreInfoData.department === "string"
          ? {
              label: moreInfoData.department,
              value: moreInfoData.department,
            }
          : moreInfoData.department
      );
      formik.setFieldValue("lab", moreInfoData.labtype);
    }
    formik.setFieldValue("email", moreInfoData.email);
    formik.setFieldValue("profile", moreInfoData.imageUrl);
  }, [moreInfoData]);

  let passwordMessage: statusType = "";
  if (
    getPasswordStrength(formikPassword.values.newPassword) ===
      "Weak strength" &&
    formikPassword.values.newPassword.length > 0
  ) {
    passwordMessage = "error";
  } else if (
    getPasswordStrength(formikPassword.values.newPassword) === "Medium strength"
  ) {
    passwordMessage = "theme";
  } else if (
    getPasswordStrength(formikPassword.values.newPassword) === "Strong strength"
  ) {
    passwordMessage = "success";
  } else {
    passwordMessage = "";
  }

  let confirmPasswordStatus: statusType = "";
  let confirmPasswordMessage = "";
  if (
    formikPassword.values.newPassword.length !== 0 &&
    formikPassword.values.newPassword === formikPassword.values.confirmPassword
  ) {
    confirmPasswordStatus = "success";
    confirmPasswordMessage = "Password matched";
  } else if (
    formikPassword.values.newPassword.length !== 0 &&
    formikPassword.values.confirmPassword.length !== 0 &&
    formikPassword.values.newPassword !== formikPassword.values.confirmPassword
  ) {
    confirmPasswordStatus = "error";
  } else {
    confirmPasswordStatus = "";
    confirmPasswordMessage = "";
  }

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <Text type="subTitle" color="shade-2">
          General settings
        </Text>
      ),
      children: (
        <Flex>
          <Flex row flex={1}>
            <Flex flex={1} className={styles.inputFlexMarginRight}>
              <InputText
                value={formik.values.firstName}
                onChange={formik.handleChange("firstName")}
                label="First name"
                required
                placeholder="First name"
              />
              <ErrorMessage
                name="firstName"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
            <Flex flex={1} className={styles.inputFlexMarginLeft}>
              <InputText
                value={formik.values.lastName}
                onChange={formik.handleChange("lastName")}
                placeholder="Last name"
                label="Last name"
                required
              />
              <ErrorMessage
                name="lastName"
                touched={formik.touched}
                errors={formik.errors}
              />
            </Flex>
          </Flex>
          <Flex flex={1} className={styles.marginVer}>
            <InputText
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              placeholder="username@gmail.com"
              label="Email"
              required
            />
            <ErrorMessage
              name="email"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>

          <div style={{ flex: 1 }}>
            <SelectTag
              required
              value={formik.values.organization}
              onChange={(event) => {
                formik.setFieldValue("department", "");
                formik.setFieldValue("lab", "");
                formik.setFieldValue("organization", {
                  organization: event.organization,
                  _id: event._id,
                });
              }}
              options={moreInfoList}
              placeholder="Select"
              label="Organization"
              getOptionLabel={(option) => option.organization}
              getOptionValue={(option) => option._id}
            />
            <ErrorMessage
              name="organization"
              touched={formik.touched}
              errors={formik.errors}
            />
          </div>

          <div style={{ flex: 1 }} className={styles.marginVer}>
            <SelectTag
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
              placeholder="Select"
              label="Department"
            />
            <ErrorMessage
              name="department"
              touched={formik.touched}
              errors={formik.errors}
            />
          </div>
          <div style={{ flex: 1 }}>
            <SelectTag
              required
              isMulti
              value={formik.values.lab}
              onChange={(event) => {
                formik.setFieldValue("lab", event);
              }}
              options={
                getDepartmentOption?.department
                  ? getDepartmentOption?.department
                  : []
              }
              placeholder="Select"
              label="Lab Types"
            />
            <ErrorMessage
              name="department"
              touched={formik.touched}
              errors={formik.errors}
            />
          </div>
          <Flex row flex={1} marginTop={16}>
            <Flex flex={1} className={styles.inputFlexMarginRight}>
              <SelectTag
                value={designationOptions.filter(
                  (option) => option.value === moreInfoData.role
                )}
                required
                isDisabled
                options={designationOptions}
                label="Designation"
              />
            </Flex>
            <Flex flex={1} className={styles.inputFlexMarginLeft}>
              <InputText
                disabled
                value={moreInfoData.userId}
                label="Requestor ID/Tester ID"
                required
                actionLeft={() => <SvgUserInput />}
              />
            </Flex>
          </Flex>
        </Flex>
      ),
    },
    {
      key: "2",
      label: (
        <Text type="subTitle" color="shade-2">
          Change password
        </Text>
      ),
      children: (
        <form autoComplete="off">
          <Flex>
            <InputText
              autoComplete="new-password"
              label="Enter old password"
              required
              value={formikPassword.values.oldPassword}
              onChange={formikPassword.handleChange("oldPassword")}
            />
            <Flex marginTop={20} marginBottom={20}>
              <InputText
                autoComplete="new-password"
                value={formikPassword.values.confirmPassword}
                onChange={formik.handleChange("confirmPassword")}
                label={"Enter new password"}
                keyboardType={isVisible ? "text" : "password"}
                actionRight={visibleIcon}
                message={
                  formikPassword.errors.newPassword ||
                  getPasswordStrength(formikPassword.values.newPassword)
                }
                status={
                  formikPassword.touched.newPassword &&
                  formikPassword.errors.newPassword
                    ? "error"
                    : passwordMessage
                }
              />
            </Flex>
            <InputText
              value={formikPassword.values.confirmPassword}
              onChange={formikPassword.handleChange("confirmPassword")}
              label={"Enter confirm password"}
              keyboardType={isVisibleOne ? "text" : "password"}
              actionRight={visibleIconOne}
              message={
                formikPassword.errors.confirmPassword || confirmPasswordMessage
              }
              status={
                formikPassword.touched.confirmPassword &&
                formikPassword.errors.confirmPassword
                  ? "error"
                  : confirmPasswordStatus
              }
            />
          </Flex>
        </form>
      ),
    },
  ];

  return (
    <Flex className={styles.overAll} flex={1} between>
      {(uploadLoader || updateLoader || moreInfoUserLoader || authMeLoader) && (
        <Loader />
      )}
      <Flex>
        <ScreenHeader
          title={"Profile Settings"}
          description={
            "Edit your profile appearance / name / contact info etc."
          }
          isSearch
        />

        <Flex row marginTop={24}>
          <Flex marginRight={30}>
            <input
              style={{ display: "none" }}
              ref={fileInputRef}
              accept="image/*"
              type="file"
              onChange={(event: any) => {
                formik.setFieldValue("profile", event.target.files[0]);
              }}
            />
            <Flex center middle className={styles.profileEdit}>
              <SvgProfileEdit onClick={handleProfileClick} />

              {formik.values.profile?.name ? (
                <img
                  style={{
                    position: "absolute",
                    borderRadius: 100,
                    objectFit: "cover",
                  }}
                  height={168}
                  width={168}
                  src={URL.createObjectURL(formik.values.profile)}
                />
              ) : (
                <img
                  style={{
                    position: "absolute",
                    borderRadius: 100,
                    objectFit: "cover",
                  }}
                  height={168}
                  width={168}
                  src={formik.values.profile}
                />
              )}
            </Flex>
          </Flex>
          <Collapse
            ghost
            style={{ minWidth: 600 }}
            expandIconPosition="end"
            accordion
            expandIcon={({ isActive }) =>
              !isActive ? <SvgArrowDown /> : <SvgArrowUp />
            }
            defaultActiveKey={["1"]}
            items={items}
          />
        </Flex>
      </Flex>

      <Flex end className={styles.btnContainer}>
        <Button onClick={formik.handleSubmit}>Save</Button>
      </Flex>
    </Flex>
  );
};

export default ProfileScreen;
