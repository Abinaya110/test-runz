import classNames from "classnames/bind";
import Flex from "../Flex/Flex";
import Rows, { ColumnItem } from "./Rows";
import TableTitle from "./TableTitle";
import Text from "../Text/Text";
import styles from "./table.module.css";
import TableActions from "./TableActions";
import { ReactChild } from "react";
import InputText from "../InputText/InputText";

const cx = classNames.bind(styles);

export type tableColors = "white" | "theme";

type DefaultProps = {
  columns: ColumnItem[];
  dataSource: { [key: string]: any }[];
  rowPointer?: boolean;
  showHeader?: boolean;
};

const defaultProps: DefaultProps = {
  columns: [],
  dataSource: [],
  showHeader: true,
};

type Props = {
  scrollHeight?: number;
  rowSelection?: Function;
  disableMultiSelect?: boolean;
  fixedHeight?: number | string;
  customHeader?: ReactChild;
} & typeof defaultProps;

const Table = ({
  dataSource,
  columns,
  scrollHeight,
  rowPointer,
  rowSelection,
  disableMultiSelect,
  fixedHeight,
  showHeader,
  customHeader,
}: Props) => {
  const totalRows = dataSource.length;

  return (
    <Flex className={cx("overAll")}>
      <TableActions />
      {customHeader && (
        <Flex className={styles.headerContainer}>{customHeader}</Flex>
      )}
      {showHeader && (
        <TableTitle
          rowSelection={rowSelection}
          columns={columns}
          dataSource={dataSource}
          disableMultiSelect={disableMultiSelect}
        />
      )}

      <div
        style={{
          height: fixedHeight ? fixedHeight : "100%",
        }}
        className={cx({ rowScroll: scrollHeight || fixedHeight })}
      >
        {dataSource.length ? (
          dataSource.map((item, index) => (
            <div
              key={index}
              className={cx("rowHover", {
                rowPointer: rowPointer,
              })}
            >
              <Rows
                key={index}
                item={item}
                columns={columns}
                rowIndex={index}
                scrollHeight={scrollHeight}
                totalRows={totalRows}
                rowSelection={rowSelection}
                disableMultiSelect={disableMultiSelect}
              />
            </div>
          ))
        ) : (
          <Flex center>
            <Text color="error" bold="bold">
              No Records to display!!
            </Text>
          </Flex>
        )}
      </div>
    </Flex>
  );
};

Table.defaultProps = defaultProps;

export default Table;
