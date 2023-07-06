import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../utils/firebase";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import SvgGoogle from "../../icons/SvgGoogle";
import styles from "./googlesignin.module.css";
import Text from "../Text/Text";

const GoogleSignIn = () => {
  const navigate = useNavigate();
  const handlerGoogleSignIn = (e: any) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        //  console.error(err);
      });
  };

  return (
    <Button
      onClick={handlerGoogleSignIn}
      className={styles.btnContainer}
      style={{ marginTop: 20 }}
    >
      <Flex row center>
        <SvgGoogle />
        <Text type="bodyBold" className={styles.marginLeft}>
          Sign up with Google
        </Text>
      </Flex>
    </Button>
  );
};

export default GoogleSignIn;
