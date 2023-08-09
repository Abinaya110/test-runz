import { Modal } from "antd";
import { useEffect, useMemo, useRef } from "react";
import Flex from "../../packages/Flex/Flex";
import styles from "./profileeditmodal.module.css";
import Button from "../../packages/Button/Button";
import SvgProfileEdit from "../../icons/SvgProfileEdit";
import InputText from "../../packages/InputText/InputText";
import SvgUserInput from "../../icons/SvgUserInput";
import SelectTag from "../../packages/SelectTag/SelectTag";
import { useFormik } from "formik";
import { isEmpty } from "../../utils/validators";
import ErrorMessage from "../../packages/ErrorMessage/ErrorMessage";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  moreInfoMiddleWare,
  moreInfoUserMiddleWare,
} from "../MyPageModule/store/mypageMiddleware";
import { designationOptions } from "./mock";
import {
  authMeMiddleWare,
  authMeUpdateMiddleWare,
  uploadMiddleWare,
} from "./store/loginMiddleware";
import Loader from "../../packages/Loader/Loader";

const userFrame = require("../../images/userFrame.png");

type formType = {
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

const ProfileEditModal = () => {
  const dispatch: AppDispatch = useDispatch();
  const fileInputRef = useRef<any>(null);

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
              organization: values.organization._id,
              department: values.department.value,
              labtype: values.lab.value,
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
              organization: values.organization._id,
              department: values.department.value,
              labtype: values.lab.value,
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
          organization: values.organization._id,
          department: values.department.value,
          labtype: values.lab.value,
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
          organization: values.organization._id,
          department: values.department.value,
          labtype: values.lab.value,
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

  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list.organization === formik.values.organization?.organization
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [formik.values.organization]);

  useEffect(() => {
    if (isEmpty(moreInfoData?.firstname) && !isEmpty(moreInfoData?.name)) {
      const nameArray = moreInfoData?.name?.split(" ");
      const firstName = nameArray[0];
      const lastName = nameArray[nameArray.length - 1];
      formik.setFieldValue("firstName", firstName);
      formik.setFieldValue("lastName", lastName);
    } else if (!isEmpty(moreInfoData?.firstname)) {
      formik.setFieldValue("firstName", moreInfoData.firstname);
      formik.setFieldValue("lastName", moreInfoData.lastname);
    }
    if (!isEmpty(moreInfoData.organization)) {
      const getOrganization = moreInfoList.filter(
        (list) => list._id === moreInfoData.organization
      );
      if (getOrganization.length > 0) {
        formik.setFieldValue("organization", {
          organization: getOrganization[0].organization,
          _id: getOrganization[0]._id,
        });
      }
      const getDepartment = moreInfoData.department.map((list: any) => {
        return { label: list, value: list };
      });

      formik.setFieldValue("department", getDepartment);
      const getLab = moreInfoData.labtype.map((list: any) => {
        return { label: list, value: list };
      });
      formik.setFieldValue("lab", getLab);
    }
    formik.setFieldValue("email", moreInfoData.email);
    formik.setFieldValue("profile", moreInfoData.imageUrl);
  }, [moreInfoData]);

  const handleProfileClick = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Modal
      rootClassName={styles.root}
      width={700}
      title={false}
      centered
      open
      closable={false}
      footer={
        <Flex end className={styles.footer}>
          <Button onClick={formik.handleSubmit} className={styles.yesBtn}>
            Submit
          </Button>
        </Flex>
      }
    >
      {(uploadLoader || updateLoader || moreInfoUserLoader || authMeLoader) && (
        <Loader />
      )}
      <Flex className={styles.overAll}>
        <img alt="bg" className={styles.image} src={userFrame} />
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
            isMulti
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
              getDepartmentOption?.labtype ? getDepartmentOption?.labtype : []
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
    </Modal>
  );
};

export default ProfileEditModal;
