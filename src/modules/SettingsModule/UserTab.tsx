import { useMemo, useState } from "react";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import styles from "./userstab.module.css";
import { isEmpty } from "../../utils/validators";
import ScreenHeader from "./SettingScreenHeader";
import Table from "../../packages/Table/Table";
import {
  AddOnHeader,
  RoleHeader,
  StatusHeader,
  UserDetailsHeader,
} from "./UserScreenTableHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import moment from "moment";
import Text from "../../packages/Text/Text";
import CreateNewUserModal from "./CreateNewUserModal";
import { FormikHelpers, useFormik } from "formik";
import YesOrNo from "../../common/YesOrNo";
import SvgDelete1 from "../../icons/SvgDelete1";
import Alert from "../../packages/Alert/Alert";

export type formType = {
  firstName: string;
  lastName: string;
  email: string;
  organization: any;
  department: any;
  lab: any;
  role: any;
  status: any;
};

const initialValues: formType = {
  firstName: "",
  lastName: "",
  email: "",
  organization: "",
  department: "",
  lab: "",
  role: "",
  status: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.firstName)) {
    errors.firstName = "First Name field is required";
  }
  if (isEmpty(values.lastName)) {
    errors.lastName = "Last Name field is required";
  }
  if (isEmpty(values.email)) {
    errors.email = "Email field is required";
  }

  if (isEmpty(values.organization)) {
    errors.organization = "organization field is required";
  }
  if (isEmpty(values.department)) {
    errors.department = "Department field is required";
  }
  if (isEmpty(values.lab)) {
    errors.lab = "Lab type field is required";
  }
  if (isEmpty(values.role)) {
    errors.role = "Role field is required";
  }
  if (isEmpty(values.status)) {
    errors.status = "Status field is required";
  }
  return errors;
};

export type filterFormType = {
  organisation: any;
  department: any;
  lab: any;
  addOn: string;
  role: any;
  status: any;
};
const UserTab = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const { data, moreInfoList } = useSelector(
    ({ getUserListReducers, moreInfoListReducers }: RootState) => {
      return {
        data: getUserListReducers.data,
        moreInfoList: moreInfoListReducers.data,
      };
    }
  );

  const formikFilter = useFormik({
    initialValues: {
      organisation: "",
      department: "",
      lab: "",
      addOn: "",
      role: "",
      status: "",
    },
    onSubmit: () => {},
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      renderTitle: () => (
        <UserDetailsHeader moreInfoList={moreInfoList} formik={formikFilter} />
      ),
      flex: 6,
      render: (value: string, row: any) => {
        return (
          <Flex>
            <Text color="shade-3" type="captionBold">
              {value}
            </Text>
            <Text type="bodyBold">{value}</Text>
          </Flex>
        );
      },
    },
    {
      title: "Time Remaining",
      dataIndex: "time",
      key: "time",
      align: "center",
      flex: 2,
      renderTitle: () => <AddOnHeader />,
      render: (value: string) => (
        <Text type="bodyBold" align="center">
          {moment(value).format("L")}
        </Text>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      flex: 2,
      renderTitle: () => <RoleHeader />,
      render: (value: string) => (
        <Text type="bodyBold" align="center" transform="capitalize">
          {value}
        </Text>
      ),
    },
    {
      title: "Status",
      dataIndex: "activeStatus",
      key: "activeStatus",
      align: "center",
      flex: 2,
      renderTitle: () => <StatusHeader />,
      render: (value: string) => (
        <Text type="bodyBold" align="center">
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

  const handleSubmitUser = (
    values: formType,
    formikHelpers: FormikHelpers<formType>
  ) => {
    Alert("User created successfully.");
    formikHelpers.resetForm();
    setCreateNew(false);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmitUser,
    validate,
  });

  const getDepartmentOption: any = useMemo(() => {
    const result = moreInfoList.filter(
      (list) => list.organization === formik.values.organization?.organization
    );
    return result ? result[0] : { department: [], labtype: [] };
  }, [formik.values.organization]);

  return (
    <Flex>
      <YesOrNo
        title="Confirmation"
        icon={<SvgDelete1 />}
        open={deleteModal}
        yesClick={() => {
          Alert("User deleted successfully.");
          setDeleteModal(false);
        }}
        noClick={() => {
          setDeleteModal(false);
        }}
        description="Are you sure you want to delete the user?"
      />

      <CreateNewUserModal
        open={createNew}
        submit={formik.handleSubmit}
        cancel={() => {
          formik.resetForm();
          setCreateNew(false);
        }}
        formik={formik}
        getDepartmentOption={getDepartmentOption}
        moreInfoList={moreInfoList}
      />
      <ScreenHeader
        title={"User Management"}
        description={"Add edit and delete users."}
        onClick={() => setCreateNew(true)}
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
        />
      </Flex>
    </Flex>
  );
};

export default UserTab;
