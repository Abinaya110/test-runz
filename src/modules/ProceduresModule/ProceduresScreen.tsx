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
  procedureByIdMiddleWare,
  procedureCreateMiddleWare,
  procedureMiddleWare,
} from "./store/proceduresMiddleware";
import Loader from "../../packages/Loader/Loader";
import { useFormik } from "formik";
import { HEADER_HEIGHT, ROLE_STUDENT } from "../../utils/constants";
import NotAuthorizedModal from "../../common/NotAuthorizedModal";

export type formType = {
  title: string;
  html: string;
};

const initialValues: formType = {
  title: "",
  html: " ",
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
  const [isLoader, setLoader] = useState(false);
  useEffect(() => {
    dispatch(procedureMiddleWare());
  }, []);

  const { isLoading, authMeData, dataList, procedureByIDisLoading } =
    useSelector(
      ({
        procedureReducers,
        authMeReducers,
        procedureByIDReducers,
      }: RootState) => {
        return {
          isLoading: procedureReducers.isLoading,
          authMeData: authMeReducers.data,
          dataList: procedureReducers.data,
          procedureByIDisLoading: procedureByIDReducers.isLoading,
        };
      }
    );

  const columns = [
    {
      title: "",
      renderTitle: () => <ProcedureHeader />,
      dataIndex: "title",
      key: "title",
      flex: 8,
      rowOnClick: (row: any) => {
        dispatch(procedureByIdMiddleWare({ id: row.id })).then(() => {
          navigate(routes.PROCEDURE_EDIT);
        });
      },
      render: (value: string, row: any) => {
        const myDepartmentArray = dataList?.user?.department;
        const resultDepartment = myDepartmentArray?.join(",");

        const myLabArray = dataList?.user?.labtype;
        const resultLab = myLabArray?.join(",");
        return (
          <Flex>
            <Text color="shade-3" type="captionBold">
              {row?.id} / {resultDepartment} / {resultLab} /{" "}
              {dataList?.user?.organization}
            </Text>
            <Text transform="capitalize" type="bodyBold">
              {value}
            </Text>
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
      rowOnClick: (row: any) => {
        dispatch(procedureByIdMiddleWare({ id: row.id })).then(() => {
          navigate(routes.PROCEDURE_EDIT);
        });
      },
    },
    {
      title: "",
      renderTitle: () => <CreatedByHeader />,
      dataIndex: "Username",
      key: "Username",
      flex: 2,
      align: "center",
      rowOnClick: (row: any) => {
        dispatch(procedureByIdMiddleWare({ id: row.id })).then(() => {
          navigate(routes.PROCEDURE_EDIT);
        });
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
    setLoader(true);
    dispatch(
      procedureCreateMiddleWare({
        title: values.title,
        html: "",
        createdBy: authMeData.name,
      })
    )
      .then((res) => {
        if (res.payload?._doc) {
          dispatch(procedureMiddleWare());
          setCreateProcedure(false);
          Alert("Procedure created successfully.");
        }
        setLoader(false);
      })
      .catch(() => setLoader(false));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      {(isLoading || procedureByIDisLoading) && <Loader />}
      {/* <NotAuthorizedModal open onClick={() => {}} /> */}
      <CreateOrEditProcedure
        formik={formik}
        title="Create new procedure"
        open={createProcedure}
        submit={formik.handleSubmit}
        cancelClick={() => {
          setCreateProcedure(false);
        }}
        dataList={dataList}
        isLoader={isLoader}
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
        dataSource={dataList?.data ? dataList.data : []}
        columns={columns}
        rowUnSelectAll={handleAllUnSelections}
        rowDeleteAction={handleDeleteOpen}
      />
    </Flex>
  );
};

export default ProceduresScreen;
