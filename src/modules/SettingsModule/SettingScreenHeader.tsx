import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settingscreenheader.module.css";
import InputText from "../../packages/InputText/InputText";
import Button from "../../packages/Button/Button";
import SvgSearch from "../../icons/SvgSearch";

const SettingScreenHeader = (props: any) => {
  const { title, description, isSearch, isBtn } = props;

  const handleLogin = () => {};
  return (
    <Flex row between className={styles.overAll}>
      <Flex>
        <Text color="shade-2" type="title">
          {title}
        </Text>

        <Text style={{ marginTop: 4 }} color="shade-2" type="bodyMedium">
          {description}
        </Text>
      </Flex>

      <Flex>
        {isSearch && (
          <InputText placeholder="Search" actionRight={() => <SvgSearch />} />
        )}

        {isBtn && (
          <Button
            style={{ marginLeft: 4 }}
            types="primary"
            onClick={handleLogin}
          >
            + Add New
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default SettingScreenHeader;
