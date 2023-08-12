import { useState, useEffect, useMemo } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormikHelpers, useFormik } from "formik";
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
import { routes } from "../../routes/routesPath";
import store, { AppDispatch, RootState } from "../../redux/store";
import {
  duplicateProcedureMiddleWare,
  procedureCreateMiddleWare,
  procedureDeleteMiddleWare,
  procedureMiddleWare,
} from "./store/proceduresMiddleware";
import Loader from "../../packages/Loader/Loader";
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

export type filterFormType = {
  department: any;
  lab: any;
  createdOn: string;
  id: any;
  createdBy: any;
};

const filterFormTypeInitialValues: filterFormType = {
  department: "",
  lab: "",
  createdOn: "",
  createdBy: "",
  id: "",
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
  const [isSearch, setSearch] = useState("");

  useEffect(() => {
    dispatch(procedureMiddleWare({}));
  }, []);

  const { isLoading, authMeData, dataList, moreInfoList, duplicateLoader } =
    useSelector(
      ({
        procedureReducers,
        authMeReducers,
        moreInfoListReducers,
        duplicateProcedureReducers,
      }: RootState) => {
        return {
          isLoading: procedureReducers.isLoading,
          authMeData: authMeReducers.data,
          dataList: procedureReducers.data,
          moreInfoList: moreInfoListReducers.data,
          duplicateLoader: duplicateProcedureReducers.isLoading,
        };
      }
    );

  const handleNavigate = (row: any) =>
    navigate(`${routes.PROCEDURE_EDIT}?id=${row.id}`);

  const formikFilter = useFormik({
    initialValues: filterFormTypeInitialValues,
    onSubmit: () => {},
  });

  const columns = [
    {
      title: "",
      renderTitle: () => (
        <ProcedureHeader
          dataList={dataList}
          moreInfoList={moreInfoList}
          formik={formikFilter}
        />
      ),
      dataIndex: "title",
      key: "title",
      flex: 8,
      rowOnClick: handleNavigate,
      render: (value: string, row: any) => {
        const getOrganization = moreInfoList?.filter(
          (list) => list._id === dataList?.organization
        );
        const myDepartmentArray = dataList?.department;
        const resultDepartment = myDepartmentArray?.join(",");

        const myLabArray = dataList?.labtype;
        const resultLab = myLabArray?.join(",");
        return (
          <Flex>
            <Text color="shade-3" type="captionBold">
              {row?.id} / {resultDepartment} / {resultLab} /{" "}
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
      title: "",
      renderTitle: () => <CreatedOnHeader formik={formikFilter} />,
      dataIndex: "createdOn",
      key: "createdOn",
      flex: 2,
      render: (value: string) => (
        <Text align="center" transform="capitalize" type="bodyBold">
          {moment(value).format("DD/MM/YYYY")}
        </Text>
      ),
      align: "center",
      rowOnClick: handleNavigate,
    },
    {
      title: "",
      renderTitle: () => (
        <CreatedByHeader formik={formikFilter} dataList={dataList} />
      ),
      dataIndex: "createdBy",
      key: "createdBy",
      flex: 2,
      align: "center",
      rowOnClick: handleNavigate,
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

  const handleSubmit = (
    values: formType,
    formikHelpers: FormikHelpers<formType>
  ) => {
    setLoader(true);
    dispatch(
      procedureCreateMiddleWare({
        title: values.title,
        html: "",
        createdBy: authMeData?.name,
      })
    )
      .then((res) => {
        if (res.payload?.createdProcedure) {
          formikHelpers.resetForm();
          setCreateProcedure(false);
          Alert("Procedure created successfully.");
          navigate(
            `${routes.PROCEDURE_EDIT}?id=${res.payload?.createdProcedure}`
          );
        }
        setLoader(false);
      })
      .catch(() => setLoader(false));
  };

  const validate = (values: formType) => {
    const filterDuplicate = dataList?.procedureIds?.filter(
      (list) =>
        list.title?.toLocaleUpperCase() === values.title?.toLocaleUpperCase()
    );
    const errors: Partial<formType> = {};
    if (isEmpty(values.title)) {
      errors.title = "This field is required";
    } else if (filterDuplicate.length !== 0 || filterDuplicate === undefined) {
      errors.title = "Procedure name is duplicate";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validate,
  });

  const handleCloseAction = () => setSelectedRows([]);

  const handleDelete = () => {
    setLoader(true);
    store
      .dispatch(procedureDeleteMiddleWare({ ids: selectedRows }))
      .then(() => {
        setLoader(false);
        handleCloseAction();
        Alert("Procedure deleted sucessfully.");
        setDeleteModal(false);
        dispatch(procedureMiddleWare({}));
      })
      .catch(() => {
        setLoader(false);
      });
  };

  const checkDuplicate = selectedRows.length !== 0;

  const handleCreateAndDuplicate = () => {
    if (checkDuplicate) {
      if (selectedRows.length === 1) {
        const filterRow = dataList.procedureIds.filter(
          (list) => list.id === selectedRows.toString()
        );
        setCreateProcedure(true);
        formik.setFieldValue("title", filterRow[0].title);
        // store
        //   .dispatch(duplicateProcedureMiddleWare({ ids: selectedRows }))
        //   .then(() => {
        //     handleCloseAction();
        //     Alert("Duplicated sucessfully.");
        //     dispatch(procedureMiddleWare({}));
        //   });
      } else {
        setPermission(true);
      }
    } else {
      setCreateProcedure(true);
    }
  };

  useEffect(() => {
    const datePicker = formikFilter.values.createdOn
      ? moment(formikFilter.values.createdOn).startOf("day").toISOString()
      : "";
    store.dispatch(
      procedureMiddleWare({
        department: formikFilter.values.department?.label
          ? formikFilter.values.department.label
          : "",
        labtype: formikFilter.values.lab?.label
          ? formikFilter.values.lab.label
          : "",
        createdOn: datePicker,
        createdBy: formikFilter.values.createdBy?.label
          ? formikFilter.values.createdBy.label
          : "",
        id: formikFilter.values.id?.label ? formikFilter.values.id.label : "",
      })
    );
  }, [formikFilter.values]);

  const filterData = useMemo(() => {
    const result = dataList?.procedureIds?.filter(
      (list) =>
        list?.title
          ?.toLocaleLowerCase()
          .includes(isSearch?.toLocaleLowerCase()) ||
        list?.id?.toLocaleLowerCase().includes(isSearch?.toLocaleLowerCase()) ||
        list?.createdBy
          ?.toLocaleLowerCase()
          .includes(isSearch?.toLocaleLowerCase())
    );
    return dataList?.procedureIds?.length > 0
      ? result
      : dataList?.procedureIds
      ? dataList?.procedureIds
      : [];
  }, [dataList?.procedureIds, isSearch]);
  return (
    <Flex
      className={styles.overAll}
      height={window.innerHeight - HEADER_HEIGHT}
    >
      {(isLoading || duplicateLoader) && <Loader />}
      {/* <NotAuthorizedModal open onClick={() => {}} /> */}
      <CreateOrEditProcedure
        formik={formik}
        title="Create new procedure"
        open={createProcedure}
        submit={formik.handleSubmit}
        cancelClick={() => {
          setCreateProcedure(false);
          formik.resetForm();
        }}
        dataList={dataList}
        isLoader={isLoader}
      />
      <YesOrNo
        title="Confirmation"
        icon={<SvgDelete1 />}
        open={deleteModal}
        yesClick={handleDelete}
        noClick={() => {
          setDeleteModal(false);
        }}
        isLoader={isLoader}
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
            onClick={handleCreateAndDuplicate}
          >
            <LableWithIcon
              label={checkDuplicate ? "Duplicate" : "Create procedure"}
              actionLeft={() => <SvgPlus />}
            />
          </Button>
        )}
        closeAction={handleCloseAction}
        rowSelection={handleSelections}
        rowSelectionAll={handleAllSelections}
        dataSource={filterData}
        columns={columns}
        rowUnSelectAll={handleAllUnSelections}
        rowDeleteAction={handleDeleteOpen}
        searchOnChange={(event) => {
          setSearch(event.target.value);
        }}
        searchValue={isSearch}
      />
    </Flex>
  );
};

export default ProceduresScreen;
