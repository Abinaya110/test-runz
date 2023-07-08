import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
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
  const { visibleIcon, isVisible } = useVisibilityIcon();
  const handleSignUp = () => navigate(routes.SIGNUP);
  const handleForgot = () => navigate(routes.FORGOT_PASSWORD);

  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      localStorage.setItem(AUTH_TOKEN, "cool");
      navigate(routes.MY_PAGE);
    },
    validate,
  });
  return (
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
        <Flex>
          <Text type="title" className={styles.loginTitle}>
            Log in to your Test Runz account
          </Text>
          <InputText
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            white
            label={"E-mail"}
            message={formik.errors.email}
            status={formik.touched.email && formik.errors.email ? "error" : ""}
          />
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <InputText
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              white
              label={"Password"}
              message={formik.errors.password}
              status={
                formik.touched.password && formik.errors.password ? "error" : ""
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
      }
    />
  );
};

export default LoginScreen;
