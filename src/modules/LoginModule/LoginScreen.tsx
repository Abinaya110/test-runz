import { useNavigate } from "react-router-dom";
import SvgInfo from "../../icons/SvgInfo";
import Button from "../../packages/Button/Button";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import Text from "../../packages/Text/Text";
import styles from "./loginscreen.module.css";
import { routes } from "../../routes/routesPath";
const frameImg = require("../../images/loginFrame.png");

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleSignUp = () => navigate(routes.SIGNUP);
  return (
    <div
      className={styles.overAllContainer}
      style={{ height: window.innerHeight - 1, display: "flex" }}
    >
      <Flex className={styles.overAll}>
        <img src={frameImg} alt="frame" className={styles.image} />
        <Flex row className={styles.container}>
          <Flex between flex={6} className={styles.welcomeContainer}>
            <Flex>
              <Text type={"h4"}>Welcome to</Text>
              <Text type={"h2"}>Test Runz</Text>
            </Flex>

            <Flex between row center>
              <Flex row center>
                <SvgInfo />
                <Text color="shade-2" className={styles.chooseLang}>
                  English (United states)
                </Text>
              </Flex>

              <Flex row center>
                <Text color="shade-2">Help</Text>
                <Text color="shade-2" className={styles.terms}>
                  Terms
                </Text>
                <Text color="shade-2">Privacy</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex flex={6} className={styles.inputContainer}>
            <Text type="title" className={styles.loginTitle}>
              Log in to your Test Runz account
            </Text>
            <InputText label={"E-mail"} />
            <div style={{ marginTop: 16, marginBottom: 8 }}>
              <InputText password label={"Password"} />
            </div>
            <Flex row center between>
              <CheckBox label={"Remember me"} />
              <Text color="shade-3">Forget your password?</Text>
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
        </Flex>
      </Flex>
    </div>
  );
};

export default LoginScreen;
