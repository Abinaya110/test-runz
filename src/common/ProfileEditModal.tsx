import { Modal } from "antd";
import Flex from "../packages/Flex/Flex";
import styles from "./profileeditmodal.module.css";
import Button from "../packages/Button/Button";
import SvgProfileEdit from "../icons/SvgProfileEdit";
import InputText from "../packages/InputText/InputText";
import SvgUserInput from "../icons/SvgUserInput";
import SelectTag from "../packages/SelectTag/SelectTag";
import { useFormik } from "formik";
import { isEmpty } from "../utils/validators";
import ErrorMessage from "../packages/ErrorMessage/ErrorMessage";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import {
  authMeMiddleWare,
  authMeUpdateMiddleWare,
} from "../modules/LoginModule/store/loginMiddleware";

const userFrame = require("../images/userFrame.png");

type formType = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  organisation: string;
  department: string;
  designation: string;
  requestorId: string;
};

const initialValues: formType = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  organisation: "",
  department: "",
  designation: "",
  requestorId: "",
};

const ProfileEditModal = () => {
  const dispatch: AppDispatch = useDispatch();
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
    if (isEmpty(values.mobile)) {
      errors.mobile = "Mobile field is required";
    }
    if (isEmpty(values.organisation)) {
      errors.organisation = "Organisation field is required";
    }
    if (isEmpty(values.department)) {
      errors.department = "Department field is required";
    }
    if (isEmpty(values.designation)) {
      errors.designation = "Designation field is required";
    }
    if (isEmpty(values.requestorId)) {
      errors.requestorId = "Requestor ID field is required";
    }
    return errors;
  };

  const handleSubmit = (values: formType) => {
    dispatch(authMeUpdateMiddleWare({ firstuse: false })).then(() => {
      dispatch(authMeMiddleWare());
    });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    // validate,
  });

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
      bodyStyle={
        {
          // overflowY: "scroll",
          // height: window.innerHeight - 130,
        }
      }
    >
      <Flex className={styles.overAll}>
        <img alt="bg" className={styles.image} src={userFrame} />

        <Flex center className={styles.profileEdit}>
          <SvgProfileEdit />
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
        <Flex row flex={1} className={styles.marginVer}>
          <Flex flex={1} className={styles.inputFlexMarginRight}>
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
          <Flex flex={1} className={styles.inputFlexMarginLeft}>
            <InputText
              value={formik.values.mobile}
              onChange={formik.handleChange("mobile")}
              label="Mobile"
              required
              placeholder="000000023"
            />
            <ErrorMessage
              name="mobile"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
        <div style={{ flex: 1 }}>
          <SelectTag
            value={formik.values.organisation}
            onChange={formik.handleChange("organisation")}
            options={[{ label: "ss", value: "11" }]}
            placeholder="Select"
            label="Organisation"
          />
          <ErrorMessage
            name="organisation"
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>
        {/* <InputText
          label="Organisation"
          required
          placeholder="Organisation name"
          actionLeft={() => <SvgOrganisation />}
        /> */}
        <div style={{ flex: 1 }} className={styles.marginVer}>
          <SelectTag
            value={formik.values.department}
            onChange={formik.handleChange("department")}
            options={[{ label: "ss", value: "11" }]}
            placeholder="Select"
            label="Department"
          />
          <ErrorMessage
            name="department"
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>
        <Flex row flex={1}>
          <Flex flex={1} className={styles.inputFlexMarginRight}>
            <SelectTag
              value={formik.values.designation}
              onChange={formik.handleChange("designation")}
              options={[{ label: "ss", value: "11" }]}
              placeholder="Select"
              label="Designation"
            />
            <ErrorMessage
              name="designation"
              touched={formik.touched}
              errors={formik.errors}
            />
            {/* <InputText
              actionLeft={() => <SvgDesignation />}
              label="Designation"
              required
              placeholder="Designation"
            /> */}
          </Flex>
          <Flex flex={1} className={styles.inputFlexMarginLeft}>
            <InputText
              value={formik.values.requestorId}
              onChange={formik.handleChange("requestorId")}
              label="Requestor ID/Tester ID"
              required
              placeholder="Requestor ID/Tester ID"
              actionLeft={() => <SvgUserInput />}
            />
            <ErrorMessage
              name="requestorId"
              touched={formik.touched}
              errors={formik.errors}
            />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ProfileEditModal;
