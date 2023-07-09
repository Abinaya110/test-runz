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
import RowSelection from "./RowSelection";

const cx = classNames.bind(styles);

type Props = {
  hideActions?: boolean;
  actionTitle?: string;
  actionTitleBtn?: Function;
  rowUnSelectAll?: Function;
  dataSource: { [key: string]: any }[];
  rowSelection?: Function;
  disableMultiSelect?: boolean;
};

const TableActions = ({
  hideActions,
  actionTitle,
  actionTitleBtn,
  dataSource,
  rowSelection,
  disableMultiSelect,
  rowUnSelectAll,
}: Props) => {
  return (
    <Flex>
      <Flex row between center className={styles.titleContainer}>
        <Text type="title" color="shade-2">
          {actionTitle}
        </Text>
        {typeof actionTitleBtn === "function" && <>{actionTitleBtn()}</>}
      </Flex>
      <Flex between className={styles.actionHeight}>
        <Flex row center between>
          <Flex row center className={cx({ hideActions })}>
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
              <RowSelection
                rowSelection={rowSelection}
                disableMultiSelect={disableMultiSelect}
                item={dataSource}
              />
            </div>
            <div className={styles.actionMargin}>
              <RowSelection
                rowSelection={rowUnSelectAll}
                disableMultiSelect={disableMultiSelect}
                item={dataSource}
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
          {hideActions && <div />}
          <InputText
            white
            placeholder="Search"
            actionRight={() => <SvgSearch />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TableActions;
