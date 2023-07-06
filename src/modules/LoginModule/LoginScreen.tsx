import { useNavigate } from "react-router-dom";
import Button from "../../packages/Button/Button";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./loginscreen.module.css";
import { routes } from "../../routes/routesPath";
import InputText from "../../packages/InputText/InputText";
import LoginFrame from "./LoginFrame";
import HelpAndTerms from "./HelpAndTerms";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleSignUp = () => navigate(routes.SIGNUP);
  const handleForgot = () => navigate(routes.FORGOT_PASSWORD);

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
          <InputText white label={"E-mail"} />
          <div style={{ marginTop: 16, marginBottom: 8 }}>
            <InputText keyboardType="password" label={"Password"} />
          </div>
          <Flex row center between>
            <CheckBox label={"Remember me"} />
            <Button onClick={handleForgot} types="link">
              <Text color="shade-3">Forget your password?</Text>
            </Button>
          </Flex>
          <Button className={styles.btnStyle}>Log in</Button>
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
