import { useMemo, useState } from "react";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import Table from "../../packages/Table/Table";
import { isEmpty } from "../../utils/validators";
import Text from "../../packages/Text/Text";
import InputText from "../../packages/InputText/InputText";
import SvgSort from "../../icons/SvgSort";
import styles from "./mypagescreen.module.css";
import Badge from "../../packages/Badge/Badge";

export const ACTIVE_BACKING_BOARD = [
  {
    eventType: "Poker",
    eventName: "WSOP",
    amount: "$35.00",
    amountAvailable: "$35.00",
    time: "00 Days 10:22",
    potentialWin: "$1M",
    status: "Not Started",
    id: "1",
    name: "John Smith",
    winnings: "NA",
  },
  {
    eventType: "Poker",
    eventName: "Organization B",
    amount: "$35.00",
    amountAvailable: "$35.00",
    time: "00 Days 00:00 ",
    potentialWin: "$1M",
    status: "In progress",
    id: "2",
    name: "Elon Musk",
    winnings: "NA",
  },
  {
    eventType: "Poker",
    eventName: "Organization C",
    amount: "$1500.00",
    amountAvailable: "$1500.00",
    time: "Completed",
    potentialWin: "$1M",
    status: "Lost",
    id: "3",
    name: "Mike Angelo",
    winnings: "$0",
  },
  {
    eventType: "Poker",
    eventName: "Organization A",
    amount: "$165.00",
    amountAvailable: "$165.00",
    time: "Completed",
    potentialWin: "$500k",
    status: "Success",
    id: "4",
    name: "Sarah Whitmore",
    winnings: "$12,000",
  },
];

export const activeBackingBoard = () => [
  {
    title: "Event Type",
    dataIndex: "eventType",
    key: "eventType",
  },
  {
    title: "Event Name",
    dataIndex: "eventName",
    key: "eventName",
    flex: 1.5,
  },
  {
    title: "Amount Backed",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Backing Amount Available",
    dataIndex: "amountAvailable",
    key: "amountAvailable",
  },
  {
    title: "Time Remaining",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Potential Win",
    dataIndex: "potentialWin",
    key: "potentialWin",
  },
  {
    title: "Winnings",
    dataIndex: "winnings",
    key: "winnings",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    align: "center",
  },
];

const MyPageScreen = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const columns = useMemo(() => activeBackingBoard(), []);

  const isAllRowChecked = (
    selected: any[],
    data: any,
    perPage: number
  ): boolean => {
    let count = 0;
    if (Array.isArray(data) && data.length > 0) {
      data.forEach((d) => {
        const isSelected = selected.some((r) => r.unique_key === d.unique_key);
        if (isSelected) {
          count += 1;
        }
      });
    }
    return count === perPage;
  };

  const handleChecked = (row: {
    id: any;
    filter: (arg0: (r: any) => boolean) => any[];
    length: number;
  }) => {
    if (!Array.isArray(row)) {
      if (selectedRows.includes(row.id)) {
        const updatedRow = selectedRows.filter((s) => s !== row.id);
        setSelectedRows(updatedRow);
      } else {
        setSelectedRows([...selectedRows, row.id]);
      }
    } else if (Array.isArray(row)) {
      const orderNumbers = row.filter((r) => !isEmpty(r.id)).map((r) => r.id);
      if (isAllRowChecked(selectedRows, row, row.length)) {
        setSelectedRows([]);
      } else {
        setSelectedRows([...selectedRows, ...orderNumbers]);
      }
    }
  };

  const handleSelections = (row: any) => {
    const isChecked = !Array.isArray(row)
      ? selectedRows.includes(row.id)
      : isAllRowChecked(selectedRows, row, row.length);
    return (
      <Flex>
        <CheckBox
          type="black"
          checked={isChecked}
          onClick={() => handleChecked(row)}
        />
      </Flex>
    );
  };
  return (
    <Flex>
      <Table
        showHeader={false}
        customHeader={
          <Flex row between>
            <Flex>
              <Flex row center className={styles.sortTitleFlex}>
                <Text
                  style={{ marginRight: 8 }}
                  type="bodyBold"
                  color="shade-3"
                >
                  Procedure details
                </Text>
                <SvgSort />
              </Flex>
              <Flex row center>
                <InputText size="small" placeholder="ID" />
                <div className={styles.inputMargin}>
                  <InputText size="small" placeholder="Department" />
                </div>
                <InputText size="small" placeholder="Lab" />
                <div className={styles.inputMargin}>
                  <InputText size="small" placeholder="Procedure" />
                </div>
              </Flex>
            </Flex>
            <Flex row center>
              <Flex className={styles.createdFlex}>
                <Flex row center className={styles.sortTitleFlex}>
                  <Text
                    style={{ marginRight: 8 }}
                    type="bodyBold"
                    color="shade-3"
                  >
                    Created on
                  </Text>
                  <SvgSort />
                </Flex>

                <InputText size="small" placeholder="DD/MM/YYYY" />
              </Flex>
              <Flex>
                <Flex row center className={styles.sortTitleFlex}>
                  <Text
                    style={{ marginRight: 8 }}
                    type="bodyBold"
                    color="shade-3"
                  >
                    Created by
                  </Text>
                  <SvgSort />
                </Flex>

                <InputText size="small" placeholder="ID" />
              </Flex>
            </Flex>
          </Flex>
        }
        rowSelection={handleSelections}
        dataSource={ACTIVE_BACKING_BOARD}
        columns={columns}
      />
    </Flex>
  );
};

export default MyPageScreen;
