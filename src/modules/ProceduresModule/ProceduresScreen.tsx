import { useState } from "react";
import LableWithIcon from "../../common/LableWithIcon";
import SvgCalendar from "../../icons/SvgCalendar";
import SvgPlus from "../../icons/SvgPlus";
import SvgSearch from "../../icons/SvgSearch";
import SvgSort from "../../icons/SvgSort";
import Button from "../../packages/Button/Button";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import Table from "../../packages/Table/Table";
import Text from "../../packages/Text/Text";
import {
  CreatedByHeader,
  CreatedOnHeader,
  ProcedureHeader,
} from "./ProcedureCustomHeader";
import styles from "./proceduresscreen.module.css";
import { isEmpty } from "../../utils/validators";
import CheckBox from "../../packages/CheckBox/CheckBox";
import YesOrNo from "../../common/YesOrNo";
import SvgDelete1 from "../../icons/SvgDelete1";
import Alert from "../../packages/Alert/Alert";

export const ACTIVE_BACKING_BOARD: any = [
  {
    eventType: "PoID023659ADN/Dept-Computer science/Lab-Data structureker",
    eventName: "Bubble sort",
    date: "02/05/2022",
    Username: "Username",
    id: "1",
  },
  {
    eventType: "PoID023659ADN/Dept-Computer science/Lab-Data structureker",
    eventName: "Bubble sort",
    date: "02/05/2022",
    Username: "Username",
    id: "2",
  },
];

const columns = [
  {
    title: "",
    renderTitle: () => <ProcedureHeader />,
    dataIndex: "eventType",
    key: "eventType",
    flex: 8,
    render: (value: string, row: any) => {
      return (
        <Flex>
          <Text color="shade-3" type="captionBold">
            {value}
          </Text>
          <Text type="bodyBold">{row.eventName}</Text>
        </Flex>
      );
    },
  },

  {
    title: "",
    renderTitle: () => <CreatedOnHeader />,

    dataIndex: "date",
    key: "date",
    flex: 2,
    align: "center",
  },
  {
    title: "",
    renderTitle: () => <CreatedByHeader />,
    dataIndex: "Username",
    key: "Username",
    flex: 2,
    align: "center",
  },
];

const ProceduresScreen = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleAllChecked = (row: {
    id: any;
    filter: (arg0: (r: any) => boolean) => any[];
    length: number;
  }) => {
    if (Array.isArray(row)) {
      const orderNumbers = row.filter((r) => !isEmpty(r.id)).map((r) => r.id);
      setSelectedRows([...orderNumbers]);
    }
  };

  const handleSelections = (row: any) => {
    const isChecked = !Array.isArray(row)
      ? selectedRows.includes(row.id)
      : isAllRowChecked(selectedRows, row, row.length);
    return (
      <CheckBox
        type="black"
        checked={isChecked}
        onClick={() => handleChecked(row)}
      />
    );
  };

  const handleAllSelections = (row: any) => {
    return (
      <CheckBox
        type="text-shade-2"
        label="Select all"
        labelColor="shade-2"
        checked
        onClick={() => handleAllChecked(row)}
      />
    );
  };
  const handleAllUnSelections = () => {
    return (
      <CheckBox
        type="text-shade-2"
        label="Deselect all"
        labelColor="shade-2"
        onClick={() => setSelectedRows([])}
      />
    );
  };
  const handleDeleteOpen = () => setDeleteModal(true);
  const handlePage = (page: number) => {
    setSelectedRows([]);
    setCurrentPage(page);
  };
  return (
    <Flex>
      <YesOrNo
        title="Confirmation"
        icon={<SvgDelete1 />}
        open={deleteModal}
        yesClick={() => {
          Alert("Runs deleted sucessfully.");
          setDeleteModal(false);
        }}
        noClick={() => {
          setDeleteModal(false);
        }}
        description="Are you sure you want to delete the runs?"
      />
      <Table
        pagination
        onPageChange={handlePage}
        currentPage={currentPage}
        hideActions={selectedRows.length === 0}
        actionTitle="Procedure"
        actionTitleBtn={() => (
          <Button onClick={() => {}}>
            <LableWithIcon
              label="Create procedure"
              actionLeft={() => <SvgPlus />}
            />
          </Button>
        )}
        // showHeader={false}
        // customHeader={<ProcedureCustomHeader />}
        rowSelection={handleSelections}
        rowSelectionAll={handleAllSelections}
        dataSource={ACTIVE_BACKING_BOARD}
        columns={columns}
        rowUnSelectAll={handleAllUnSelections}
        rowDeleteAction={handleDeleteOpen}
      />
    </Flex>
  );
};

export default ProceduresScreen;
