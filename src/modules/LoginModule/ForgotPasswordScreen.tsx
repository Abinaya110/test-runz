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
import { isEmpty } from "../../utils/validators";

const endTime = 60;

const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams({ type: "" });
  const [isTime, setTime] = useState(endTime);
  const [isRunning, setIsRunning] = useState(false);
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
              <InputText label="Registered email-id" />
              <Flex className={styles.captchaFlex}>
                <LabelWrapper>
                  <Captcha
                    onClick={() => {
                      setSearchParams({ type: "enter-otp" });
                    }}
                  />
                </LabelWrapper>
              </Flex>
            </>
          )}
          {getType === "enter-otp" && (
            <Flex>
              <InputText label="Enter otp" />
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
              <Button className={styles.inputMargin}>Verify</Button>
            </Flex>
          )}

          {getType === "reset-password" && (
            <Flex>
              <InputText label="Registered email-id" />
              <div className={styles.inputMargin}>
                <InputText label="New Password" />
              </div>

              <InputText label="Confirm password" />
              <Button className={styles.inputMargin}>Reset</Button>
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
