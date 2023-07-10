import { useNavigate } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
import Button from "../../packages/Button/Button";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./loginscreen.module.css";
import { routes } from "../../routes/routesPath";
import InputText from "../../packages/InputText/InputText";
import LoginFrame from "./LoginFrame";
import HelpAndTerms from "./HelpAndTerms";
import { isEmpty, isValidEmail } from "../../utils/validators";
import { useVisibilityIcon } from "../../utils/helpers";
import { AUTH_TOKEN } from "../../utils/localStoreConst";
import { auth } from "../../utils/firebase";
import { useState } from "react";
import Loader from "../../packages/Loader/Loader";
import { setAuthorization } from "../../utils/apiConfig";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { authMeMiddleWare } from "./store/loginMiddleware";

type formType = {
  email: string;
  password: string;
};

const initialValues: formType = {
  email: "",
  password: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  } else if (!isValidEmail(values.email)) {
    errors.email = "Invalid email entered";
  }
  if (isEmpty(values.password)) {
    errors.password = "Password field is required";
  }
  return errors;
};

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLoader, setLoader] = useState(false);
  const dipatch: AppDispatch = useDispatch();

  const { visibleIcon, isVisible } = useVisibilityIcon();
  const handleSignUp = () => navigate(routes.SIGNUP);
  const handleForgot = () => navigate(routes.FORGOT_PASSWORD);
  const handleSubmit = (
    values: formType,
    formikHelpers: FormikHelpers<any>
  ) => {
    setLoader(true);
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res: any) => {
        setLoader(false);
        if (res.user?._delegate?.accessToken) {
          setAuthorization(res.user?._delegate?.accessToken);
          localStorage.setItem(AUTH_TOKEN, res.user?._delegate?.accessToken);
          dipatch(authMeMiddleWare());

          navigate(routes.MY_PAGE);
        }
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          formikHelpers.setFieldError("email", "Email is not found");
        }
        setLoader(false);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });
  return (
    <>
      {isLoader && <Loader />}
      <LoginFrame
        leftChild={
          <Flex between flex={1}>
            <Flex>
              <Text type={"h4"}>Welcome to</Text>
              <Text type={"h2"}>Test Runz</Text>
            </Flex>

            <HelpAndTerms />
          </Flex>
        }
        rightChild={
          <form autoComplete="off">
            <Flex>
              <Text type="title" className={styles.loginTitle}>
                Log in to your Test Runz account
              </Text>
              <InputText
                autoComplete="off"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                white
                label={"E-mail"}
                message={formik.errors.email}
                status={
                  formik.touched.email && formik.errors.email ? "error" : ""
                }
              />
              <div style={{ marginTop: 16, marginBottom: 8 }}>
                <InputText
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  white
                  label={"Password"}
                  message={formik.errors.password}
                  status={
                    formik.touched.password && formik.errors.password
                      ? "error"
                      : ""
                  }
                  keyboardType={isVisible ? "text" : "password"}
                  actionRight={visibleIcon}
                />
              </div>
              <Flex row center between>
                <CheckBox label={"Remember me"} />
                <Button onClick={handleForgot} types="link">
                  <Text color="shade-3">Forget your password?</Text>
                </Button>
              </Flex>
              <Button className={styles.btnStyle} onClick={formik.handleSubmit}>
                Log in
              </Button>
              <Flex row center>
                <Text type="captionRegular">Don’t have an account yet? </Text>
                <Button onClick={handleSignUp} types="link">
                  <Text type="captionBold" className={styles.signUpText}>
                    Click here to Sign up!
                  </Text>
                </Button>
              </Flex>
            </Flex>
          </form>
        }
      />
    </>
  );
};

export default LoginScreen;
