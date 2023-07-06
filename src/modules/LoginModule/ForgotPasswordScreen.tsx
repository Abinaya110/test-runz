import { useNavigate, useSearchParams } from "react-router-dom";
import Captcha from "../../packages/Captcha/Captcha";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import LabelWrapper from "../../packages/LabelWrapper/LabelWrapper";
import Text from "../../packages/Text/Text";
import HelpAndTerms from "./HelpAndTerms";
import LoginFrame from "./LoginFrame";
import styles from "./forgotpasswordscreen.module.css";
import { useEffect, useState } from "react";
import { routes } from "../../routes/routesPath";
import Button from "../../packages/Button/Button";
import { isEmpty, isValidEmail } from "../../utils/validators";
import { useFormik } from "formik";
import { getPasswordStrength, useVisibilityIcon } from "../../utils/helpers";
import { statusType } from "../../packages/InputText/inputTextTypes";

const endTime = 60;

type formSendOtpType = {
  email: string;
};

type formEnterOtp = {
  otp: string;
};

type formResetPassword = {
  email: string;
  newPassword: string;
  confirmPassword: string;
};

const validateSendOtp = (values: formSendOtpType) => {
  const errors: Partial<formSendOtpType> = {};
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Invalid email entered";
  }

  return errors;
};

const validateEnterOtp = (values: formEnterOtp) => {
  const errors: Partial<formEnterOtp> = {};
  if (isEmpty(values.otp)) {
    errors.otp = "Otp field is required";
  }

  return errors;
};

const validateResetPassword = (values: formResetPassword) => {
  const errors: Partial<formResetPassword> = {};
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Invalid email entered";
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

const initialValuesSendOtop: formSendOtpType = {
  email: "",
};

const initialValuesEnterOtop: formEnterOtp = {
  otp: "",
};

const initialValuesResetPassword: formResetPassword = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams({ type: "" });
  const [isTime, setTime] = useState(endTime);
  const [isRunning, setIsRunning] = useState(false);
  const { visibleIcon, isVisible, isVisibleOne, visibleIconOne } =
    useVisibilityIcon();
  let getType = searchParams.get("type");

  useEffect(() => {
    let intervalId: any;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevElapsedTime) => prevElapsedTime - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setTime(endTime);
  };
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  useEffect(() => {
    handleStart();
  }, []);

  useEffect(() => {
    if (isTime === 0) {
      handleReset();
    }
  }, [isTime]);

  const disableResend = isTime !== 0;

  let title = "Forgot password";
  let titleDescription = "We will send you an OTP on your registered email-ID.";
  useEffect(() => {
    if (getType === "enter-otp") {
      title = "Enter OTP";
      titleDescription = "We will send you an OTP on your registered email-ID.";
    } else if (getType === "reset-password") {
      title = "Reset password";
      titleDescription = "We will send you an OTP on your registered email-ID.";
    } else {
      title = "Forgot password";
      titleDescription = "We will send you an OTP on your registered email-ID.";
    }
  }, [getType]);

  const handleLogin = () => navigate(routes.LOGIN);

  const handleSendOtp = () => {
    setSearchParams({ type: "enter-otp" });
  };
  const formikSendOtp = useFormik({
    initialValues: initialValuesSendOtop,
    onSubmit: handleSendOtp,
    validate: validateSendOtp,
  });

  const handleEnterOtp = () => {
    setSearchParams({ type: "reset-password" });
  };
  const formikEnterOtp = useFormik({
    initialValues: initialValuesEnterOtop,
    onSubmit: handleEnterOtp,
    validate: validateEnterOtp,
  });

  const handleResetPassword = () => {
    setSearchParams({ type: "reset-password" });
  };
  const formikRestPassword = useFormik({
    initialValues: initialValuesResetPassword,
    onSubmit: handleResetPassword,
    validate: validateResetPassword,
  });

  let passwordMessage: statusType = "";
  if (
    getPasswordStrength(formikRestPassword.values.newPassword) ===
    "Weak strength"
  ) {
    passwordMessage = "error";
  } else if (
    getPasswordStrength(formikRestPassword.values.newPassword) ===
    "Medium strength"
  ) {
    passwordMessage = "theme";
  } else if (
    getPasswordStrength(formikRestPassword.values.newPassword) ===
    "Strong strength"
  ) {
    passwordMessage = "success";
  } else {
    passwordMessage = "";
  }

  let confirmPasswordStatus: statusType = "";
  let confirmPasswordMessage = "";
  if (
    formikRestPassword.values.newPassword.length !== 0 &&
    formikRestPassword.values.newPassword ===
      formikRestPassword.values.confirmPassword
  ) {
    confirmPasswordStatus = "success";
    confirmPasswordMessage = "Password matched";
  } else if (
    formikRestPassword.values.newPassword.length !== 0 &&
    formikRestPassword.values.confirmPassword.length !== 0 &&
    formikRestPassword.values.newPassword !==
      formikRestPassword.values.confirmPassword
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
          </Flex>
          <Flex>
            <Text align="right" color="tertiary-shade-2" type="title">
              Forgot your password?
            </Text>
            <Text align="right" color="tertiary-shade-2" type="h4">
              Don't worry we got you
            </Text>
            <Text
              style={{ marginBottom: 10 }}
              align="right"
              color="tertiary-shade-2"
              type="h1"
            >
              Covered
            </Text>
            <HelpAndTerms />
          </Flex>
        </Flex>
      }
      rightChild={
        <Flex>
          <Text type="title">{title}</Text>
          <Text type="bodyMedium" className={styles.inputMargin}>
            {titleDescription}
          </Text>
          {isEmpty(getType) && (
            <>
              <InputText
                value={formikSendOtp.values.email}
                onChange={formikSendOtp.handleChange("email")}
                message={formikSendOtp.errors.email}
                status={
                  formikSendOtp.touched.email && formikSendOtp.errors.email
                    ? "error"
                    : ""
                }
                label="Registered email-id"
              />
              <Flex className={styles.captchaFlex}>
                <LabelWrapper>
                  <Captcha onClick={formikSendOtp.handleSubmit} />
                </LabelWrapper>
              </Flex>
            </>
          )}
          {getType === "enter-otp" && (
            <Flex>
              <InputText
                value={formikEnterOtp.values.otp}
                onChange={formikEnterOtp.handleChange("otp")}
                label="Enter otp"
                message={formikEnterOtp.errors.otp}
                status={
                  formikEnterOtp.touched.otp && formikEnterOtp.errors.otp
                    ? "error"
                    : ""
                }
              />
              <Flex center className={styles.resendFlex}>
                <Button
                  types="link"
                  onClick={() => {}}
                  style={{
                    pointerEvents: disableResend ? "none" : "auto",
                  }}
                >
                  <Text
                    type="captionBold"
                    color={disableResend ? "shade-3" : "theme"}
                  >
                    Resend OTP{" "}
                    <Text type="captionBold">
                      {disableResend ? `(${isTime})` : ""}
                    </Text>
                  </Text>
                </Button>
              </Flex>
              <Button
                onClick={formikEnterOtp.handleSubmit}
                className={styles.inputMargin}
              >
                Verify
              </Button>
            </Flex>
          )}

          {getType === "reset-password" && (
            <Flex>
              <InputText
                label="Registered email-id"
                value={formikRestPassword.values.email}
                onChange={formikRestPassword.handleChange("email")}
              />
              <div className={styles.inputMargin}>
                <InputText
                  label="New Password"
                  value={formikRestPassword.values.newPassword}
                  onChange={formikRestPassword.handleChange("newPassword")}
                  message={
                    formikRestPassword.errors.newPassword ||
                    getPasswordStrength(formikRestPassword.values.newPassword)
                  }
                  status={
                    formikRestPassword.touched.newPassword &&
                    formikRestPassword.errors.newPassword
                      ? "error"
                      : passwordMessage
                  }
                  keyboardType={isVisible ? "text" : "password"}
                  actionRight={visibleIcon}
                />
              </div>

              <InputText
                label="Confirm password"
                value={formikRestPassword.values.confirmPassword}
                onChange={formikRestPassword.handleChange("confirmPassword")}
                message={
                  formikRestPassword.errors.confirmPassword ||
                  confirmPasswordMessage
                }
                status={
                  formikRestPassword.touched.confirmPassword &&
                  formikRestPassword.errors.confirmPassword
                    ? "error"
                    : confirmPasswordStatus
                }
                keyboardType={isVisibleOne ? "text" : "password"}
                actionRight={visibleIconOne}
              />
              <Button
                onClick={formikRestPassword.handleSubmit}
                className={styles.inputMargin}
              >
                Reset
              </Button>
            </Flex>
          )}

          <Flex row>
            <Text type="captionRegular">Back to</Text>
            <Button
              style={{ marginLeft: 4 }}
              types="link"
              onClick={handleLogin}
            >
              <Text type="captionBold" color="secondary-shade-1">
                log in!
              </Text>
            </Button>
          </Flex>
        </Flex>
      }
    />
  );
};

export default ForgotPasswordScreen;
