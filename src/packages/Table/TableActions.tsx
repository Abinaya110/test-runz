import classNames from "classnames/bind";
import SvgClose from "../../icons/SvgClose";
import SvgDelete from "../../icons/SvgDelete";
import SvgSearch from "../../icons/SvgSearch";
import Button from "../Button/Button";
import CheckBox from "../CheckBox/CheckBox";
import Flex from "../Flex/Flex";
import InputText from "../InputText/InputText";
import Text from "../Text/Text";
import styles from "./tableactions.module.css";

const cx = classNames.bind(styles);

type Props = {
  hideActions?: boolean;
};
const TableActions = ({ hideActions }: Props) => {
  return (
    <Flex>
      <Flex row between center className={styles.titleContainer}>
        <Text type="title" color="shade-2">
          Procedures
        </Text>
        <Button disabled>Create procedure</Button>
      </Flex>
      <div className={styles.actionHeight}>
        <Flex row center between className={cx({ hideActions })}>
          <Flex row center>
            <Button className={styles.closeAction}>
              <Flex row center>
                <SvgClose />
                <Text
                  type={"captionBold"}
                  className={styles.closeActionText}
                  size={16}
                  color="error"
                >
                  Close actions
                </Text>
              </Flex>
            </Button>
            <div className={styles.actionMargin}>
              <CheckBox
                type="text-shade-2"
                label="Select all"
                labelColor="shade-2"
              />
            </div>
            <div className={styles.actionMargin}>
              <CheckBox
                type="text-shade-2"
                label="Deselect all"
                labelColor="shade-2"
              />
            </div>
            <Button types="link">
              <Flex row center>
                <SvgDelete />
                <Text
                  className={styles.closeActionText}
                  type={"captionBold"}
                  color="shade-2"
                >
                  Delete
                </Text>
              </Flex>
            </Button>
          </Flex>
          <InputText
            white
            placeholder="Search"
            actionRight={() => <SvgSearch />}
          />
        </Flex>
      </div>
    </Flex>
  );
};

export default TableActions;
