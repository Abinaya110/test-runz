import { useState } from "react";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import styles from "./userstab.module.css";
import { ACTIVE_USER_DATA } from "../RunzModule/mock";
import { isEmpty } from "../../utils/validators";
import ScreenHeader from "./SettingScreenHeader";
import Table from "../../packages/Table/Table";
import {
  AddOnHeader,
  RoleHeader,
  StatusHeader,
  UserDetailsHeader,
} from "./UserScreenTableHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";
import Text from "../../packages/Text/Text";

const UserTab = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [createNewRunz, setCreateNewRunz] = useState(false);

  const { data } = useSelector(({ getUserListReducers }: RootState) => {
    return {
      data: getUserListReducers.data,
    };
  });

  console.log("data", data);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      renderTitle: () => <UserDetailsHeader />,
      flex: 7,
    },
    {
      title: "Time Remaining",
      dataIndex: "time",
      key: "time",
      align: "center",
      flex: 1.5,
      renderTitle: () => <AddOnHeader />,
      render: (value: string) => (
        <Text type="bodyMedium" align="center">
          {moment(value).format("L")}
        </Text>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      flex: 1.5,
      renderTitle: () => <RoleHeader />,
      render: (value: string) => (
        <Text type="bodyMedium" align="center" transform="capitalize">
          {value}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "activeStatus",
      key: "activeStatus",
      align: "center",
      flex: 1.5,
      renderTitle: () => <StatusHeader />,
      render: (value: string) => (
        <Text type="bodyMedium" align="center">
          {value ? "Active" : "InActive"}
        </Text>
      ),
    },
  ];

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
      <Flex>
        <CheckBox
          type="black"
          checked={isChecked}
          onClick={() => handleChecked(row)}
        />
      </Flex>
    );
  };

  const handleAllSelections = (row: any) => {
    return (
      <Flex>
        <CheckBox
          type="text-shade-2"
          label="Select all"
          labelColor="shade-2"
          checked
          onClick={() => handleAllChecked(row)}
        />
      </Flex>
    );
  };
  const handleAllUnSelections = () => {
    return (
      <Flex>
        <CheckBox
          type="text-shade-2"
          label="Deselect all"
          labelColor="shade-2"
          onClick={() => setSelectedRows([])}
        />
      </Flex>
    );
  };
  const handlePage = (page: number) => {
    setSelectedRows([]);
    setCurrentPage(page);
  };

  const handleDeleteOpen = () => setDeleteModal(true);
  const handleSubmitOpen = () => setSubmitModal(true);
  const handleShareOpen = () => setShareModal(true);
  return (
    <Flex>
      <ScreenHeader
        title={"User Management"}
        description={"Add edit and delete users."}
        isSearch={false}
        isBtn={true}
      />
      <Flex className={styles.tableOverall}>
        <Table
          onPageChange={handlePage}
          currentPage={currentPage}
          hideActions={selectedRows.length === 0}
          rowSelection={handleSelections}
          rowSelectionAll={handleAllSelections}
          dataSource={data}
          columns={columns}
          rowUnSelectAll={handleAllUnSelections}
          rowDeleteAction={handleDeleteOpen}
          rowSubmitAction={handleSubmitOpen}
          rowShareAction={handleShareOpen}
        />
      </Flex>
    </Flex>
  );
};

export default UserTab;
