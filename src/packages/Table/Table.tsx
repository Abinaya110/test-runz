import classNames from "classnames/bind";
import { ReactChild } from "react";
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
  itemsPerPage?: number;
  onPageChange: (a: any) => void;
};

const defaultProps: DefaultProps = {
  columns: [],
  dataSource: [],
  showHeader: true,
  itemsPerPage: 10,
  onPageChange: () => {},
};

type Props = {
  scrollHeight?: number;
  rowSelection?: Function;
  rowSelectionAll?: Function;
  disableMultiSelect?: boolean;
  fixedHeight?: number | string;
  customHeader?: ReactChild;
  actionTitle?: string;
  actionTitleBtn?: Function;
  hideActions?: boolean;
  currentPage?: number;
  rowUnSelectAll?: Function;
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
  actionTitleBtn,
  actionTitle,
  hideActions,
  currentPage,
  onPageChange,
  itemsPerPage,
  rowSelectionAll,
  rowUnSelectAll,
}: Props) => {
  const totalRows = dataSource.length;

  // Calculate the starting and ending indices for the current page
  const indexOfLastItem = Number(currentPage) * Number(itemsPerPage);
  const indexOfFirstItem = indexOfLastItem - Number(itemsPerPage);

  // Slice the array of items to display only the items for the current page
  const currentItems = dataSource.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the number of pages
  const totalPages = Math.ceil(totalRows / Number(itemsPerPage));

  return (
    <Flex>
      {typeof rowSelection === "function" && (
        <TableActions
          actionTitle={actionTitle}
          actionTitleBtn={actionTitleBtn}
          hideActions={hideActions}
          dataSource={currentItems}
          disableMultiSelect={disableMultiSelect}
          rowSelection={rowSelectionAll}
          rowUnSelectAll={rowUnSelectAll}
        />
      )}
      {customHeader && (
        <Flex className={cx("headerContainer")}>{customHeader}</Flex>
      )}
      <Flex className={cx("overAll")}>
        {showHeader && (
          <TableTitle
            rowSelection={rowSelection}
            columns={columns}
            dataSource={currentItems}
            disableMultiSelect={disableMultiSelect}
          />
        )}

        <div
          style={{
            height: fixedHeight ? fixedHeight : "100%",
          }}
          className={cx({ rowScroll: scrollHeight || fixedHeight })}
        >
          {currentItems.length ? (
            currentItems.map((item, index) => (
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
            onPageChange={onPageChange}
            maxPages={itemsPerPage}
          />
        </div>
      </Flex>
    </Flex>
  );
};

Table.defaultProps = defaultProps;

export default Table;
