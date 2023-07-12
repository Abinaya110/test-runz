import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./settings.module.css";
import InputText from "../../packages/InputText/InputText";
import Button from "../../packages/Button/Button";
import SvgSearch from "../../icons/SvgSearch";

const ScreenHeader = (props: any) => {
  const { title, description, isSearch, isBtn } = props;

  const handleLogin = () => {};
  return (
    <Flex row between className={styles.contentSpace}>
      <Flex column>
        <Text size={24} bold="semiBold" className={styles.rightHead}>
          {title}
        </Text>

        <Text size={16} bold="light" className={styles.rightHead}>
          {description}
        </Text>
      </Flex>

      <Flex column className={styles.rightSearch}>
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

export default ScreenHeader;
