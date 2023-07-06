import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Button from "../../packages/Button/Button";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import { routes } from "../../routes/routesPath";
import SvgMicrosoft from "../../icons/SvgMicrosoft";
import SvgLinkedIn from "../../icons/SvgLinkedIn";
import InputText from "../../packages/InputText/InputText";
import { getPasswordStrength, useVisibilityIcon } from "../../utils/helpers";
import { isEmpty, isValidEmail } from "../../utils/validators";
import { statusType } from "../../packages/InputText/inputTextTypes";
import GoogleSignIn from "../../packages/GoogleSignIn/GoogleSignIn";
import LoginFrame from "./LoginFrame";
import HelpAndTerms from "./HelpAndTerms";
import styles from "./loginscreen.module.css";
import MicrosoftSignIn from "../../packages/MicrosoftSignIn/MicrosoftSignIn";
import LinkedinSignIn from "../../packages/LinkedinSignIn/LinkedinSignIn";

type formType = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const initialValues: formType = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};

  if (isEmpty(values.name)) {
    errors.name = "Name field is required";
  }
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Invalid email entered";
  }
  if (isEmpty(values.password)) {
    errors.password = "Password field is required";
  } else if (getPasswordStrength(values.password) !== "Strong strength") {
    errors.password = getPasswordStrength(values.password);
  }

  if (isEmpty(values.confirmPassword)) {
    errors.confirmPassword = "Password field is required";
  } else if (
    values.password.length !== 0 &&
    values.confirmPassword.length !== 0 &&
    values.password !== values.confirmPassword
  ) {
    errors.confirmPassword = "Password not matched";
  }

  return errors;
};

const SignUpScreen = () => {
  const navigate = useNavigate();
  const { visibleIcon, isVisible, isVisibleOne, visibleIconOne } =
    useVisibilityIcon();

  const handleLogin = () => navigate(routes.LOGIN);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {},
    validate,
  });

  let passwordMessage: statusType = "";
  if (getPasswordStrength(formik.values.password) === "Weak strength") {
    passwordMessage = "error";
  } else if (
    getPasswordStrength(formik.values.password) === "Medium strength"
  ) {
    passwordMessage = "theme";
  } else if (
    getPasswordStrength(formik.values.password) === "Strong strength"
  ) {
    passwordMessage = "success";
  } else {
    passwordMessage = "";
  }

  let confirmPasswordStatus: statusType = "";
  let confirmPasswordMessage = "";
  if (
    formik.values.password.length !== 0 &&
    formik.values.password === formik.values.confirmPassword
  ) {
    confirmPasswordStatus = "success";
    confirmPasswordMessage = "Password matched";
  } else if (
    formik.values.password.length !== 0 &&
    formik.values.confirmPassword.length !== 0 &&
    formik.values.password !== formik.values.confirmPassword
  ) {
    confirmPasswordStatus = "error";
  } else {
    confirmPasswordStatus = "";
    confirmPasswordMessage = "";
  }

  return (
    <LoginFrame
      leftChild={
        <Flex between flex={1}>
          <Flex>
            <Text type={"h4"}>Welcome to</Text>
            <Text type={"h2"}>Test Runz</Text>
            <Flex className={styles.signUpVia}>
              <Text type="title" color={"tertiary-shade-2"}>
                Sign up via
              </Text>
              <GoogleSignIn />

              <MicrosoftSignIn />
              <LinkedinSignIn />
            </Flex>
          </Flex>

          <HelpAndTerms />
        </Flex>
      }
      rightChild={
        <Flex>
          <Text type="title" className={styles.loginTitle}>
            Sign up for a free Test Runz account
          </Text>

          <InputText
            value={formik.values.name}
            onChange={formik.handleChange("name")}
            label={"Full name"}
            message={formik.errors.name}
            status={formik.touched.name && formik.errors.name ? "error" : ""}
          />
          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <InputText
              label={"E-mail"}
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              message={formik.errors.email}
              status={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
            />
          </div>
          <InputText
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            label={"Password"}
            keyboardType={isVisible ? "text" : "password"}
            actionRight={visibleIcon}
            message={
              formik.errors.password ||
              getPasswordStrength(formik.values.password)
            }
            status={
              formik.touched.password && formik.errors.password
                ? "error"
                : passwordMessage
            }
          />
          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <InputText
              value={formik.values.confirmPassword}
              onChange={formik.handleChange("confirmPassword")}
              label={"Confirm password"}
              keyboardType={isVisibleOne ? "text" : "password"}
              actionRight={visibleIconOne}
              message={formik.errors.confirmPassword || confirmPasswordMessage}
              status={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "error"
                  : confirmPasswordStatus
              }
            />
          </div>

          {/* <CheckBox label={"Remember me"} /> */}
          <Flex row className={styles.readTextContainer}>
            <CheckBox />
            <Text type="captionRegular" className={styles.readText}>
              I have read and understood and agree with terms of service and
              Privacy policy of Test Runz
            </Text>
          </Flex>

          <Button className={styles.btnStyle} onClick={formik.handleSubmit}>
            Signup for free
          </Button>
          <Flex row center>
            <Text type="captionRegular">Already have an account? </Text>
            <Button onClick={handleLogin} types="link">
              <Text type="captionBold" className={styles.signUpText}>
                Click here to log in.
              </Text>
            </Button>
          </Flex>
        </Flex>
      }
    />
  );
};

export default SignUpScreen;
