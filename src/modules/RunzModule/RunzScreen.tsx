import { useEffect, useState } from "react";
import Flex from "../../packages/Flex/Flex";
import CheckBox from "../../packages/CheckBox/CheckBox";
import { isEmpty } from "../../utils/validators";
import Table from "../../packages/Table/Table";
import {
  RunzAssignedHeader,
  RunzCreatedOnHeader,
  RunzDetailsHeader,
  RunzDueDateHeader,
  RunzStatusHeader,
} from "./RunzCustomHeader";
import Button from "../../packages/Button/Button";
import LableWithIcon from "../../common/LableWithIcon";
import SvgPlus from "../../icons/SvgPlus";
import YesOrNo from "../../common/YesOrNo";
import SvgDelete1 from "../../icons/SvgDelete1";
import SvgSubmitReport from "../../icons/SvgSubmitReport";
import Alert from "../../packages/Alert/Alert";
import ShareRunzModal from "./ShareRunzModal";
import CreateNewRunzModal from "./CreateNewRunzModal";
import styles from "./runzscreen.module.css";
import Text from "../../packages/Text/Text";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routesPath";
import { HEADER_HEIGHT } from "../../utils/constants";
import store, { RootState } from "../../redux/store";
import {
  getRunzCreateMiddleWare,
  getRunzListMiddleWare,
} from "./store/runzMiddleware";
import { useSelector } from "react-redux";
import Loader from "../../packages/Loader/Loader";
import { FormikHelpers, useFormik } from "formik";
import { procedureMiddleWare } from "../ProceduresModule/store/proceduresMiddleware";
import { getUserListMiddleWare } from "../SettingsModule/store/settingsMiddleware";
import moment from "moment";

export type formType = {
  procedureName: any;
  testObjective: string;
  setDueDate: string;
  assignTo: any;
};

const initialValues: formType = {
  procedureName: "",
  testObjective: "",
  setDueDate: "",
  assignTo: "",
};

const validate = (values: formType) => {
  const errors: Partial<formType> = {};
  if (isEmpty(values.procedureName)) {
    errors.procedureName = "Procedure Name field is required";
  }
  if (isEmpty(values.testObjective)) {
    errors.testObjective = "Test Objective field is required";
  }
  if (isEmpty(values.setDueDate)) {
    errors.setDueDate = "Set Due Date is required";
  }
  if (isEmpty(values.assignTo)) {
    errors.assignTo = "AssignTo is required";
  }
  return errors;
};

const RunzScreen = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [createNewRunz, setCreateNewRunz] = useState(false);
  const [isLoader, setLoader] = useState(false);

  useEffect(() => {
    store.dispatch(getRunzListMiddleWare());
    store.dispatch(procedureMiddleWare({}));
    store.dispatch(getUserListMiddleWare({}));
  }, []);

  const { isLoading, runzListdata } = useSelector(
    ({ getRunzListReducers }: RootState) => {
      return {
        isLoading: getRunzListReducers.isLoading,
        runzListdata: getRunzListReducers.data,
      };
    }
  );

  const columns = [
    {
      title: "",
      dataIndex: "details",
      key: "details",
      renderTitle: () => <RunzDetailsHeader />,
      flex: 6,
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
      render: (value: string, row: any) => {
        return (
          <Flex>
            <Text color="shade-3" type="captionBold">
              {row.detailsDes}ssss
            </Text>
            <Text type="bodyBold">{value}</Text>
          </Flex>
        );
      },
    },
    {
      title: "",
      dataIndex: "Createdon",
      key: "Createdon",
      flex: 1.5,
      renderTitle: () => <RunzCreatedOnHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
    },
    {
      title: "",
      dataIndex: "Duedate",
      key: "Duedate",
      flex: 1.5,
      renderTitle: () => <RunzDueDateHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
    },
    {
      title: "",
      dataIndex: "Status",
      key: "Status",
      flex: 1.5,
      renderTitle: () => <RunzStatusHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
      },
    },
    {
      title: "",
      dataIndex: "Assignedby",
      key: "Assignedby",
      flex: 1.5,
      renderTitle: () => <RunzAssignedHeader />,
      align: "center",
      rowOnClick: (a: any) => {
        navigate(routes.RUNZ_EIDT);
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

  const handleCreate = (
    values: formType,
    formikHelpers: FormikHelpers<formType>
  ) => {
    setLoader(true);
    const assignList: any =
      Array.isArray(values.assignTo) &&
      values.assignTo?.map((list: any) => {
        return { userId: list.userId, date: list.createdAt };
      });

    store
      .dispatch(
        getRunzCreateMiddleWare({
          procedureId: values.procedureName?.id,
          procedurename: values.procedureName?.title,
          testobjective: values.testObjective,
          dueDate: moment(values.setDueDate).local().toISOString(),
          assignTo: assignList,
        })
      )
      .then(() => {
        setLoader(false);
        Alert("Runz created successfully.");
        setCreateNewRunz(false);
        formikHelpers.resetForm();
        store.dispatch(getRunzListMiddleWare());
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleCreate,
    validate,
  });

  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      {isLoading && <Loader />}
      <CreateNewRunzModal
        formik={formik}
        title="Create new Runz"
        open={createNewRunz}
        cancelClick={() => {
          setCreateNewRunz(false);
        }}
        submit={formik.handleSubmit}
        isLoader={isLoader}
      />
      <ShareRunzModal
        open={shareModal}
        shareOnClick={() => {
          Alert("Runs shared successfully.");
          setShareModal(false);
        }}
        cancelClick={() => {
          setShareModal(false);
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
        title="Submit"
        icon={<SvgSubmitReport />}
        open={submitModal}
        yesClick={() => {
          Alert("Runs submitted successfully.");
          setSubmitModal(false);
        }}
        noClick={() => {
          setSubmitModal(false);
        }}
        description="Are you sure you want to submit the runs?"
      />
      <Table
        rowPointer
        onPageChange={handlePage}
        currentPage={currentPage}
        hideActions={selectedRows.length === 0}
        actionTitle="Runz"
        actionTitleBtn={() => (
          <Button onClick={() => setCreateNewRunz(true)}>
            <LableWithIcon label="Create runz" actionLeft={() => <SvgPlus />} />
          </Button>
        )}
        rowSelection={handleSelections}
        rowSelectionAll={handleAllSelections}
        dataSource={runzListdata}
        columns={columns}
        rowUnSelectAll={handleAllUnSelections}
        rowDeleteAction={handleDeleteOpen}
        rowSubmitAction={handleSubmitOpen}
        rowShareAction={handleShareOpen}
        pagination
        closeAction={() => {
          setSelectedRows([]);
        }}
      />
    </Flex>
  );
};

export default RunzScreen;
