import { useState, useEffect } from "react";
import LableWithIcon from "../../common/LableWithIcon";
import SvgPlus from "../../icons/SvgPlus";
import Button from "../../packages/Button/Button";
import Flex from "../../packages/Flex/Flex";
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
import CreateOrEditProcedure from "./CreateOrEditProcedure";
import SvgCancel from "../../icons/SvgCancel";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routesPath";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  procedureCreateMiddleWare,
  procedureMiddleWare,
} from "./store/proceduresMiddleware";
import Loader from "../../packages/Loader/Loader";
import { useFormik } from "formik";
import { ROLE_STUDENT } from "../../utils/constants";
import NotAuthorizedModal from "../../common/NotAuthorizedModal";

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

export type formType = {
  title: string;
  html: string;
};
const initialValues: formType = {
  title: "",
  html: "",
};
const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.title)) {
    errors.title = "This field is required";
  }
  return errors;
};

const ProceduresScreen = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [createProcedure, setCreateProcedure] = useState(false);
  const [isPermission, setPermission] = useState(false);

  useEffect(() => {
    dispatch(procedureMiddleWare());
  }, []);

  const { isLoading, authMeData } = useSelector(
    ({ procedureReducers, authMeReducers }: RootState) => {
      return {
        isLoading: procedureReducers.isLoading,
        authMeData: authMeReducers.data,
      };
    }
  );

  const columns = [
    {
      title: "",
      renderTitle: () => <ProcedureHeader />,
      dataIndex: "eventType",
      key: "eventType",
      flex: 8,
      rowOnClick: (a: any) => {
        navigate(routes.PROCEDURE_EDIT);
      },
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
      rowOnClick: (a: any) => {
        console.log("a", a);
      },
    },
    {
      title: "",
      renderTitle: () => <CreatedByHeader />,
      dataIndex: "Username",
      key: "Username",
      flex: 2,
      align: "center",
      rowOnClick: (a: any) => {
        console.log("a", a);
      },
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
  const handleSubmit = (values: formType) => {
    dispatch(procedureCreateMiddleWare({ title: values.title, html: "" })).then(
      (res) => {
        console.log("res", res);

        // setCreateProcedure(false);
        // Alert("Procedure created successfully.");
        // console.log("values", values);
      }
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  return (
    <Flex className={styles.overAll}>
      {isLoading && <Loader />}
      {/* <NotAuthorizedModal open onClick={() => {}} /> */}
      <CreateOrEditProcedure
        formik={formik}
        title="Create new procedure"
        open={createProcedure}
        submit={formik.handleSubmit}
        cancelClick={() => {
          setCreateProcedure(false);
        }}
      />
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

      <YesOrNo
        noBtnTitle="Cancel"
        yesBtnTitle="Ok"
        title="Notice"
        icon={<SvgCancel />}
        open={isPermission}
        yesClick={() => {
          setPermission(false);
        }}
        noClick={() => {
          setPermission(false);
        }}
        description={
          <Flex>
            <Text align="center" type="bodyBold" color="shade-2">
              To duplicate please select only one procedure.
            </Text>
            <Text align="center" type="captionBold" color="shade-3">
              Multiple duplicates are not allowed
            </Text>
          </Flex>
        }
      />

      <Table
        rowPointer
        pagination
        onPageChange={handlePage}
        currentPage={currentPage}
        hideActions={
          selectedRows.length === 0 || authMeData.role === ROLE_STUDENT
        }
        actionTitle="Procedure"
        actionTitleBtn={() => (
          <Button
            disabled={authMeData.role === ROLE_STUDENT}
            onClick={() => {
              setCreateProcedure(true);
            }}
          >
            <LableWithIcon
              label={
                selectedRows.length !== 0 ? "Duplicate" : "Create procedure"
              }
              actionLeft={() => <SvgPlus />}
            />
          </Button>
        )}
        closeAction={() => {
          setSelectedRows([]);
        }}
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
