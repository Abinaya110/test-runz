import { useNavigate } from "react-router-dom";
import SvgGoogle from "../../icons/SvgGoogle";
import Button from "../../packages/Button/Button";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./loginscreen.module.css";
import { routes } from "../../routes/routesPath";
import SvgMicrosoft from "../../icons/SvgMicrosoft";
import SvgLinkedIn from "../../icons/SvgLinkedIn";
import InputText from "../../packages/InputText/InputText";
import LoginFrame from "./LoginFrame";
import HelpAndTerms from "./HelpAndTerms";

const SignUpScreen = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate(routes.LOGIN);
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
              <Button className={styles.signUpBtn} style={{ marginTop: 20 }}>
                <Flex row center>
                  <SvgGoogle />
                  <Text type="bodyBold" className={styles.marginLeft}>
                    Sign up with Google
                  </Text>
                </Flex>
              </Button>
              <Button className={styles.signUpBtn} style={{ margin: "16px 0" }}>
                <Flex row center>
                  <SvgMicrosoft />
                  <Text type="bodyBold" className={styles.marginLeft}>
                    Sign up with Microsoft
                  </Text>
                </Flex>
              </Button>
              <Button className={styles.signUpBtn}>
                <Flex row center>
                  <SvgLinkedIn />
                  <Text type="bodyBold" className={styles.marginLeft}>
                    Sign up with Linkedin
                  </Text>
                </Flex>
              </Button>
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

          <InputText label={"Full name"} />
          <div style={{ marginTop: 12, marginBottom: 12 }}>
            <InputText label={"E-mail"} />
          </div>
          <InputText label={"Password"} />
          <div style={{ marginTop: 12, marginBottom: 8 }}>
            <InputText label={"Confirm password"} />
          </div>

          <CheckBox label={"Remember me"} />
          <Flex row className={styles.readTextContainer}>
            <CheckBox />
            <Text type="captionRegular" className={styles.readText}>
              I have read and understood and agree with terms of service and
              Privacy policy of Test Runz
            </Text>
          </Flex>

          <Button className={styles.btnStyle}>Signup for free</Button>
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
