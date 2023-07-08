import classNames from "classnames/bind";
import { ReactChild, SetStateAction, useState } from "react";
import Flex from "../Flex/Flex";
import Text from "../Text/Text";
import Pagination from "../Pagination/Pagination";
import styles from "./table.module.css";
import TableActions from "./TableActions";
import Rows, { ColumnItem } from "./Rows";
import TableTitle from "./TableTitle";

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
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;
  const handlePageChange = (page: SetStateAction<number>) => {
    setCurrentPage(page);
  };
  return (
    <Flex>
      <TableActions />
      {customHeader && (
        <Flex className={styles.headerContainer}>{customHeader}</Flex>
      )}
      <Flex className={cx("overAll")}>
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
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Flex>
    </Flex>
  );
};

Table.defaultProps = defaultProps;

export default Table;
