import styles from "./microsoftsignIn.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import SvgMicrosoft from "../../icons/SvgMicrosoft";
import Text from "../Text/Text";
import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";

const provider = new OAuthProvider("microsoft.com");

// provider.setCustomParameters({
//   // Force re-consent.
//   prompt: "consent",
//   // Target specific email with login hint.
//   login_hint: "user@firstadd.onmicrosoft.com",
// });

provider.addScope("mail.read");
provider.addScope("calendars.read");

const MicrosoftSignIn = () => {
  const navigate = useNavigate();
  const handlerGoogleSignIn = (e: any) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.

        // Get the OAuth access token and ID Token
        const credential: any = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
      })
      .catch((error) => {
        // Handle error.
      });
  };

  return (
    <Button
      onClick={handlerGoogleSignIn}
      className={styles.btnContainer}
      style={{ marginTop: 20 }}
    >
      <Flex row center>
        <SvgMicrosoft />
        <Text type="bodyBold" className={styles.marginLeft}>
          Sign up with Microsoft
        </Text>
      </Flex>
    </Button>
  );
};

export default MicrosoftSignIn;
