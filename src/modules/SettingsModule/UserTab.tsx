import { useEffect, useMemo, useRef, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Toast from "../../packages/Toast/Toast";
import CheckBox from "../../packages/CheckBox/CheckBox";
import Flex from "../../packages/Flex/Flex";
import { isEmpty } from "../../utils/validators";
import ScreenHeader from "./SettingScreenHeader";
import Table from "../../packages/Table/Table";
import {
  AddOnHeader,
  RoleHeader,
  StatusHeader,
  UserDetailsHeader,
} from "./UserScreenTableHeader";
import store, { RootState } from "../../redux/store";
import Text from "../../packages/Text/Text";
import CreateNewUserModal from "./CreateNewUserModal";
import { FormikHelpers, useFormik } from "formik";
import YesOrNo from "../../common/YesOrNo";
import SvgDelete1 from "../../icons/SvgDelete1";
import Alert from "../../packages/Alert/Alert";
import { error, success, white } from "../../theme/colors";
import SvgArrowDown from "../../icons/SvgArrowDown";
import {
  authCreateMiddleWare,
  authDisableMiddleWare,
  getUserListMiddleWare,
  getUserListUpdateMiddleWare,
} from "./store/settingsMiddleware";
import styles from "./userstab.module.css";

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

const filterFormTypeInitialValues: filterFormType = {
  organisation: "",
  department: "",
  lab: "",
  addOn: "",
  role: "",
  status: "",
};

const Status = ({ value, row, formikFilter }: any) => {
  const [isOpen, setOpen] = useState(false);
  const wrapperRef = useRef<any>(null);

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef);

  const handleUpdate = (value: boolean) => {
    if (row.activeStatus === value) {
      setOpen(false);
    } else {
      store
        .dispatch(
          getUserListUpdateMiddleWare({ id: row.userId, activeStatus: value })
        )
        .then(() => {
          const datePicker = formikFilter.values.addOn
            ? moment(formikFilter.values.addOn)
                .local()
                .startOf("day")
                .toISOString()
            : "";
          store.dispatch(
            getUserListMiddleWare({
              department: formikFilter.values.department?.label
                ? formikFilter.values.department.label
                : "",
              labtype: formikFilter.values.lab?.label
                ? formikFilter.values.lab.label
                : "",
              organization: formikFilter.values.organisation?._id
                ? formikFilter.values.organisation?._id
                : "",
              createdAt: datePicker,
              role: formikFilter.values.role?.value,
              activeStatus: formikFilter.values.status?.value
                ? formikFilter.values.status?.value === "Active"
                  ? true
                  : false
                : "",
            })
          );
        });
    }
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Flex row center middle>
        <Text
          color="white"
          type="smallBold"
          align="center"
          size={12}
          style={{
            backgroundColor: value ? success : error,
            borderRadius: 20,
            padding: "4px 10px",
            width: 80,
            marginRight: 8,
          }}
        >
          {value ? "Active" : "InActive"}
        </Text>
        <div
          style={{ cursor: "pointer" }}
          ref={wrapperRef}
          onClick={() => setOpen(true)}
        >
          <SvgArrowDown />
        </div>
      </Flex>
      {isOpen && (
        <div
          ref={wrapperRef}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            background: white,
            zIndex: 99,
            border: "1px solid",
            borderRadius: 4,
            cursor: "pointer",
            right: 20,
          }}
        >
          <Text
            onClick={() => {
              handleUpdate(true);
              setOpen(false);
            }}
            style={{ padding: 8, borderBottom: "1px solid" }}
          >
            Active
          </Text>
          <Text
            onClick={() => {
              handleUpdate(false);
              setOpen(false);
            }}
            style={{ padding: 8 }}
          >
            InActive
          </Text>
        </div>
      )}
    </div>
  );
};

const UserTab = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [isLoader, setLoader] = useState(false);
  const { data, moreInfoList } = useSelector(
    ({ getUserListReducers, moreInfoListReducers }: RootState) => {
      return {
        data: getUserListReducers.data,
        moreInfoList: moreInfoListReducers.data,
      };
    }
  );

  const formikFilter = useFormik({
    initialValues: filterFormTypeInitialValues,
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
        const getOrganization = moreInfoList?.filter(
          (list) => list._id === row?.organization
        );
        const myDepartmentArray = row?.department;
        const resultDepartment = myDepartmentArray?.join(",");
        const myLabArray = row?.labtype;
        const resultLab = myLabArray?.join(",");
        return (
          <Flex>
            <Text color="shade-3" type="captionBold">
              {row?.userCounter} / {resultDepartment} / {resultLab} /{" "}
              {getOrganization &&
                getOrganization.length === 1 &&
                getOrganization[0]?.organization}
            </Text>
            <Text transform="capitalize" type="bodyBold">
              {value}
            </Text>
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
      renderTitle: () => <AddOnHeader formik={formikFilter} />,
      render: (value: string) => (
        <Text type="bodyBold" align="center">
          {moment(value).format("DD/MM/YYYY")}
        </Text>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
      flex: 2,
      renderTitle: () => <RoleHeader formik={formikFilter} />,
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
      renderTitle: () => <StatusHeader formik={formikFilter} />,
      render: (value: string, row: any) => (
        <Status value={value} row={row} formikFilter={formikFilter} />
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

  const handleChecked = (row: any) => {
    if (!Array.isArray(row)) {
      if (selectedRows.includes(row.userId)) {
        const updatedRow = selectedRows.filter((s) => s !== row.userId);
        setSelectedRows(updatedRow);
      } else {
        setSelectedRows([...selectedRows, row.userId]);
      }
    } else if (Array.isArray(row)) {
      const orderNumbers = row
        .filter((r) => !isEmpty(r.userId))
        .map((r) => r.userId);
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
      const orderNumbers = row
        .filter((r) => !isEmpty(r.userId))
        .map((r) => r.userId);
      setSelectedRows([...orderNumbers]);
    }
  };

  const handleSelections = (row: any) => {
    const isChecked = !Array.isArray(row)
      ? selectedRows.includes(row.userId)
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
    setLoader(true);
    const getDepartment = values.department.map((list: any) => list.value);
    const getLab = values.lab.map((list: any) => list.value);
    store
      .dispatch(
        authCreateMiddleWare({
          firstname: values.firstName,
          lastname: values.lastName,
          email: values.email,
          organization: values.organization._id,
          department: getDepartment,
          lab: getLab,
          role: values.role.value,
          activeStatus: values.status.value === "Active" ? true : false,
        })
      )
      .then((res) => {
        setLoader(false);
        if (!isEmpty(res.payload?.error)) {
          Toast(res.payload?.error, "LONG", "error");
        } else if (res.payload) {
          Alert("User created successfully.");
          formikHelpers.resetForm();
          setCreateNew(false);
          store.dispatch(getUserListMiddleWare({}));
        }
      })
      .catch((error) => {
        setLoader(false);
      });
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

  const handleDelete = () => {
    setLoader(true);
    store
      .dispatch(authDisableMiddleWare({ ids: selectedRows }))
      .then((res) => {
        if (res.payload) {
          setSelectedRows([]);
          Alert("User deleted successfully.");
          setDeleteModal(false);
          store.dispatch(getUserListMiddleWare({}));
        }
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const datePicker = formikFilter.values.addOn
      ? moment(formikFilter.values.addOn).startOf("day").toISOString()
      : "";
    store.dispatch(
      getUserListMiddleWare({
        department: formikFilter.values.department?.label
          ? formikFilter.values.department.label
          : "",
        labtype: formikFilter.values.lab?.label
          ? formikFilter.values.lab.label
          : "",
        organization: formikFilter.values.organisation?._id
          ? formikFilter.values.organisation?._id
          : "",
        createdAt: datePicker,
        role: formikFilter.values.role?.value,
        activeStatus: formikFilter.values.status?.value
          ? formikFilter.values.status?.value === "Active"
            ? true
            : false
          : "",
      })
    );
  }, [formikFilter.values]);

  return (
    <Flex>
      <YesOrNo
        title="Confirmation"
        icon={<SvgDelete1 />}
        open={deleteModal}
        yesClick={handleDelete}
        noClick={() => {
          setDeleteModal(false);
        }}
        description="Are you sure you want to delete the user?"
        isLoader={isLoader}
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
        isLoader={isLoader}
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
          closeAction={() => setSelectedRows([])}
        />
      </Flex>
    </Flex>
  );
};

export default UserTab;
