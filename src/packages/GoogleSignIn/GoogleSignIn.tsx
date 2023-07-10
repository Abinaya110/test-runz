import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import SvgGoogle from "../../icons/SvgGoogle";
import styles from "./googlesignin.module.css";
import Text from "../Text/Text";

type Props = {
  onClick: (a: any) => void;
};
const GoogleSignIn = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
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
