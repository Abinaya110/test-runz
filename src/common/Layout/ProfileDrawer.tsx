import SvgClose from "../../icons/SvgClose";
import SvgDesignation from "../../icons/SvgDesignation";
import SvgLogOut from "../../icons/SvgLogOut";
import SvgOrganisation from "../../icons/SvgOrganisation";
import SvgProfileEdit from "../../icons/SvgProfileEdit";
import SvgUserInput from "../../icons/SvgUserInput";
import Button from "../../packages/Button/Button";
import Drawer from "../../packages/Drawer/Drawer";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import Text from "../../packages/Text/Text";
import { textShade1 } from "../../theme/colors";
import LableWithIcon from "../LableWithIcon";
import styles from "./profiledrawer.module.scss";

const userFrame = require("../../images/userFrame.png");
type Props = {
  open: boolean;
  onClose: () => void;
  handleLogout: () => void;
};

const ProfileDrawer = ({ open, onClose, handleLogout }: Props) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <Flex className={styles.overAll}>
        <img alt="bg" className={styles.image} src={userFrame} />
        <Flex row center between className={styles.titleFlex}>
          <Button types="link" onClick={onClose}>
            <SvgClose fill={textShade1} />
          </Button>
          <Button types="link" onClick={handleLogout}>
            <LableWithIcon
              label="Logout"
              type="bodyBold"
              actitionRight={() => <SvgLogOut />}
            />
          </Button>
        </Flex>
        <Flex center>
          <SvgProfileEdit />
          <Button height="small" className={styles.editBtn}>
            <Text type="smallBold">Edit profile</Text>
          </Button>
        </Flex>
        <Flex row flex={1}>
          <Flex flex={1} className={styles.inputFlexMarginRight}>
            <InputText
              disabled
              label="First name"
              required
              placeholder="First name"
            />
          </Flex>
          <Flex flex={1} className={styles.inputFlexMarginLeft}>
            <InputText placeholder="Last name" label="Last name" required />
          </Flex>
        </Flex>
        <Flex row flex={1} className={styles.marginVer}>
          <Flex flex={1} className={styles.inputFlexMarginRight}>
            <InputText
              placeholder="username@gmail.com"
              label="Email"
              required
            />
          </Flex>
          <Flex flex={1} className={styles.inputFlexMarginLeft}>
            <InputText label="Mobile" required placeholder="000000023" />
          </Flex>
        </Flex>
        <InputText
          label="Organisation"
          required
          placeholder="Organisation name"
          actionLeft={() => <SvgOrganisation />}
        />
        <div className={styles.marginVer}>
          <InputText
            label="Department"
            required
            placeholder="Department name"
          />
        </div>
        <Flex row flex={1}>
          <Flex flex={1} className={styles.inputFlexMarginRight}>
            <InputText
              actionLeft={() => <SvgDesignation />}
              label="Designation"
              required
              placeholder="Designation"
            />
          </Flex>
          <Flex flex={1} className={styles.inputFlexMarginLeft}>
            <InputText
              label="Requestor ID/Tester ID"
              required
              placeholder="Requestor ID/Tester ID"
              actionLeft={() => <SvgUserInput />}
            />
          </Flex>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default ProfileDrawer;
