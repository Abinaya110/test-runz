import { Dropdown, MenuProps, Button as ButtonAntd } from "antd";
import LableWithIcon from "../../common/LableWithIcon";
import SvgArrowDown from "../../icons/SvgArrowDown";
import SvgEdit from "../../icons/SvgEdit";
import SvgShare from "../../icons/SvgShare";
import SvgSubmit from "../../icons/SvgSubmit";
import Button from "../../packages/Button/Button";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import {
  error,
  gray4,
  primaryShade4,
  success,
  textShade1,
  white,
  yellow,
} from "../../theme/colors";
import styles from "./raunzeditscreen.module.css";
import Badge from "../../packages/Badge/Badge";
import { useCallback, useEffect, useState } from "react";
import SvgNewWindow from "../../icons/SvgNewWindow";
import SvgUnWindow from "../../icons/SvgUnWindow";
import ButtonGroup from "../../packages/ButtonGroup/ButtonGroup";
import RunzRichText from "./RunzRichText";
import SvgPrint from "../../icons/SvgPrint";
import CreateNewRunzModal from "./CreateNewRunzModal";
import Alert from "../../packages/Alert/Alert";
import LineCharts from "../../common/LineChart/LineCharts";
import ResizePanel from "../../packages/ResizePanel/ResizePanel";
import store, { AppDispatch, RootState } from "../../redux/store";
import {
  getRunzListDetailsMiddleWare,
  getRunzUpdatesMiddleWare,
} from "./store/runzMiddleware";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../packages/Loader/Loader";
import moment from "moment";
import {
  procedureByIdMiddleWare,
  procedureMiddleWare,
} from "../ProceduresModule/store/proceduresMiddleware";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { isEmpty } from "../../utils/validators";
import { getUserListMiddleWare } from "../SettingsModule/store/settingsMiddleware";
import parse from "html-react-parser";
import * as html2json from "html2json";
import Toast from "../../packages/Toast/Toast";
import { isEmptyObject } from "../../utils/helpers";

const items: MenuProps["items"] = [
  {
    label: "Not started",
    key: "error",
    style: {
      backgroundColor: error,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      color: white,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      padding: "8px 16px",
    },
  },
  {
    label: "Completed",
    key: "success",
    style: {
      backgroundColor: success,
      borderRadius: 0,
      color: white,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      padding: "8px 16px",
    },
  },
  {
    label: "Working",
    key: "primary",
    style: {
      backgroundColor: yellow,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      color: white,
      fontFamily: "Poppins-Regular",
      fontSize: 14,
      padding: "8px 16px",
    },
  },
];

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

const LabelWithColumn = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Flex>
      <Text type="captionBold" color="shade-3">
        {title}
      </Text>
      <Text type="button-2" color="shade-2" style={{ marginTop: 4 }}>
        {value}
      </Text>
    </Flex>
  );
};

const RunzEditScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [state, setState] = useState({ box1: 0, box2: 0 });
  const [isStatus, setStatus] = useState<any>("error");
  const [isMore, setMore] = useState<boolean>(false);
  const [isFull, setFull] = useState<boolean>(false);
  const [isTab, setTab] = useState("Results");
  const [editNewRunz, setEditNewRunz] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const [htmlInput, setHtmlInput] = useState<any>({});
  const getRunzId: any = searchParams.get("id");
  const [expResult, setResult] = useState<any>("");
  const [expRemarks, setRemarks] = useState<any>("");

  useEffect(() => {
    dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
    dispatch(procedureByIdMiddleWare({ id: searchParams.get("procedureId") }));
    dispatch(getUserListMiddleWare({}));
    dispatch(procedureMiddleWare({}));
  }, []);

  const {
    isLoading,
    runzData,
    procedureByIDLoader,
    procedureData,
    moreInfoList,
    getRunzUpdatesLoader,
    getUserListdata,
  } = useSelector(
    ({
      getRunzListDetailsReducers,
      procedureByIDReducers,
      moreInfoListReducers,
      getRunzUpdatesReducers,
      getUserListReducers,
    }: RootState) => {
      return {
        isLoading: getRunzListDetailsReducers.isLoading,
        runzData: getRunzListDetailsReducers.data,
        procedureByIDLoader: procedureByIDReducers.isLoading,
        procedureData: procedureByIDReducers.data,
        moreInfoList: moreInfoListReducers.data,
        getRunzUpdatesLoader: getRunzUpdatesReducers.isLoading,
        getUserListdata: getUserListReducers.data,
      };
    }
  );

  // ["not started", "opened", "completed"]
  useEffect(() => {
    if (runzData?.experiment?.status === "not started") {
      setStatus("error");
    } else if (runzData?.experiment?.status === "success") {
      setStatus("success");
    } else if (runzData?.experiment?.status === "opened") {
      setStatus("primary");
    }
  }, [runzData?.experiment?.status]);

  const onMouseDown = useCallback(
    ([key1, key2]: any, dragKey: any) =>
      () => {
        const onMove = (e: any) => {
          const { movementX } = e;
          const minWidth = 150;

          setState((x: any) => {
            // get new sizes
            const firstWidth = x[key1] + movementX;
            const scndWidth = x[key2] - movementX;

            // check constraints
            if (
              (firstWidth < minWidth && firstWidth < x[key1]) ||
              (scndWidth < minWidth && scndWidth < x[key2])
            ) {
              return x;
            }

            return {
              ...x,
              [key1]: firstWidth,
              [key2]: scndWidth,
            };
          });
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", () => {
          window.removeEventListener("mousemove", onMove);
          // setResizeIsActive("");
        });
      },
    [setState]
  );

  const menuProps = {
    items,
    onClick: (event: any) => {
      setStatus(event.key);

      if (event.key === "error") {
        store
          .dispatch(
            getRunzUpdatesMiddleWare({
              id: getRunzId,
              status: "not started",
            })
          )
          .then(() => {
            setStatus(event.key);
            dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          });
      } else if (event.key === "success") {
        store
          .dispatch(
            getRunzUpdatesMiddleWare({
              id: getRunzId,
              status: "success",
            })
          )
          .then(() => {
            setStatus(event.key);
            dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          });
      } else if (event.key === "primary") {
        store
          .dispatch(
            getRunzUpdatesMiddleWare({
              id: getRunzId,
              status: "opened",
            })
          )
          .then(() => {
            setStatus(event.key);
            dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          });
      }
    },
  };

  let status = "Not started";
  if (isStatus === "error") {
    status = "Not started";
  } else if (isStatus === "success") {
    status = "Completed";
  } else if (isStatus === "primary") {
    status = "Working";
  }

  const handleTab = (value: string) => {
    setTab(value);
  };

  const getOrganization = moreInfoList?.filter(
    (list) => list._id === runzData?.experiment?.organization
  );

  const myDepartmentArray = procedureData?.user?.department;
  const resultDepartment = myDepartmentArray?.join(",");

  const myLabArray = procedureData?.user?.labtype;
  const resultLab = myLabArray?.join(",");

  const handleEdit = (values: formType) => {
    const assignList: any =
      Array.isArray(values.assignTo) &&
      values.assignTo?.map((list: any) => {
        return { userId: list.userId, date: list.createdAt };
      });

    store
      .dispatch(
        getRunzUpdatesMiddleWare({
          id: getRunzId,
          procedureId: values.procedureName?.id,
          procedurename: values.procedureName?.title,
          testobjective: values.testObjective,
          dueDate: moment(values.setDueDate).local().toISOString(),
          assignTo: assignList,
        })
      )
      .then(() => {
        setSearchParams({
          id: getRunzId,
          procedureId: values.procedureName?.id,
        });
        Alert("Runz saved successfully.");
        dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
        dispatch(procedureByIdMiddleWare({ id: values.procedureName?.id }));
        setEditNewRunz(false);
      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleEdit,
    validate,
  });

  const handleOpenEdit = () => {
    formik.setFieldValue("procedureName", {
      title: runzData?.experiment?.procedurename,
      id: runzData?.experiment?.procedureId,
    });
    setEditNewRunz(true);
    formik.setFieldValue("testObjective", runzData?.experiment?.testobjective);
    formik.setFieldValue(
      "setDueDate",
      moment(runzData?.experiment.dueDate).format("YYYY-MM-DD")
    );
    const commonObjects = getUserListdata.filter((obj2) =>
      runzData?.experiment.assignTo?.some((obj1) => obj1.userId === obj2.userId)
    );
    formik.setFieldValue("assignTo", commonObjects);
  };

  const htmlData: any = procedureData.procedure?.html
    ? procedureData.procedure?.html
    : "";

  const htmlToJSON: any = html2json.html2json(htmlData);
  const uses = htmlToJSON?.child.map((ele: any) => ele);

  const handleHtmlInput = () => {
    let objects = {};
    // @ts-ignore
    let inputEl = document.getElementById("content").querySelectorAll("input");
    inputEl.forEach((ele) => {
      const { id, value } = ele;
      let temp = { [id]: value };
      objects = { ...objects, temp };
      setHtmlInput((prev: any) => ({ ...prev, [id]: value }));
      // @ts-ignore
      ele.onChange = (e) => {
        const { id, value } = e.target;
        setHtmlInput((prev: any) => ({ ...prev, [id]: value }));
      };
    });
  };

  const handleSave = () => {
    handleHtmlInput();
    let vals = Object.values(htmlInput);
    const empty = vals.filter((item) => item === "");
    if (empty.length > 0) {
      Toast("Must fill all Required Readings", "LONG", "error");
    } else if (empty.length === 0) {
      handleHtmlInput();

      store
        .dispatch(
          getRunzUpdatesMiddleWare({
            id: getRunzId,
            datas: JSON.stringify(htmlInput),
            remark: expRemarks,
            expresult: expResult,
          })
        )
        .then(() => {
          Alert("Your work has been saved");
          dispatch(getRunzListDetailsMiddleWare({ id: getRunzId }));
          setEditNewRunz(false);
        })
        .catch(() => {
          Toast("Something went wrong! Try again", "LONG", "error");
        });
    }
  };

  useEffect(() => {
    if (!isEmpty(runzData.experiment?.expresult)) {
      setResult(runzData.experiment.expresult);
    }
    if (!isEmpty(runzData.experiment?.remark)) {
      setRemarks(runzData.experiment.remark);
    }
  }, [runzData.experiment?.remark, runzData.experiment?.expresult]);

  useEffect(() => {
    if (!isEmpty(runzData.experiment?.datas)) {
      const filtered =
        runzData.experiment?.datas &&
        Object.entries(JSON.parse(runzData.experiment?.datas)).filter(
          ([key]) => key !== ""
        );
      const obj = filtered && Object.fromEntries(filtered);
      if (!isEmptyObject(obj) && !procedureByIDLoader) {
        for (const [key, values] of Object.entries(obj)) {
          if (values && document.getElementById(key)) {
            // @ts-ignore
            document.getElementById(key).value = values;
          }
        }
      }
    }
  }, [runzData.experiment?.datas, procedureByIDLoader]);

  return (
    <Flex className={styles.overAll}>
      {(isLoading || procedureByIDLoader || getRunzUpdatesLoader) && <Loader />}
      <CreateNewRunzModal
        title="Edit Runz"
        open={editNewRunz}
        cancelClick={() => {
          setEditNewRunz(false);
        }}
        submit={formik.handleSubmit}
        isLoader={false}
        formik={formik}
        btnTitle="Save"
      />

      <Flex className={styles.header}>
        <Flex row center between>
          <Flex>
            <Text color="shade-3" type="captionBold">
              {runzData?.experiment?.procedureId} / {resultDepartment} /{" "}
              {resultLab} /{" "}
              {getOrganization &&
                getOrganization.length === 1 &&
                getOrganization[0]?.organization}
            </Text>
            <Text className={styles.subTitle} type="subTitle">
              {runzData?.experiment?.procedurename}
            </Text>
          </Flex>
          <Flex row center>
            <Button types="link">
              <LableWithIcon
                actionLeft={() => <SvgSubmit fill={textShade1} />}
                label="Submit"
                type="button-2"
              />
            </Button>
            <Button types="link" className={styles.svgShare}>
              <LableWithIcon
                actionLeft={() => <SvgShare fill={textShade1} />}
                label="Share"
                type="button-2"
              />
            </Button>
            <Button types="link" onClick={handleOpenEdit}>
              <LableWithIcon
                actionLeft={() => <SvgEdit fill={textShade1} />}
                label="Edit"
                type="button-2"
              />
            </Button>
            <Button
              onClick={() => setMore(!isMore)}
              types="link"
              className={styles.svgMore}
            >
              <LableWithIcon
                actionRight={() => <SvgArrowDown fill={textShade1} />}
                label="More Info"
                type="button-2"
              />
            </Button>
          </Flex>
        </Flex>
        {isMore && (
          <Flex center row between className={styles.moreFlex}>
            <LabelWithColumn
              title="Test objective"
              value={runzData?.experiment?.testobjective}
            />
            <LabelWithColumn
              title="Assigned by"
              value={runzData?.experiment?.createdBy}
            />
            <LabelWithColumn
              title="Created on"
              value={moment(runzData?.experiment?.createdAt).format(
                "DD/MM/YYYY (ddd)"
              )}
            />
            <LabelWithColumn
              title="Due date"
              value={moment(runzData?.experiment?.dueDate).format(
                "DD/MM/YYYY (ddd)"
              )}
            />

            <Flex>
              <Dropdown menu={menuProps} overlayStyle={{ marginBottom: 8 }}>
                <ButtonAntd className={styles.statusBtn}>
                  <LableWithIcon
                    type="captionBold"
                    label="Status"
                    actionRight={() => (
                      <SvgArrowDown
                        height={20}
                        width={20}
                        fillOne={primaryShade4}
                      />
                    )}
                  />
                </ButtonAntd>
              </Dropdown>
              <Badge className={styles.badge} type={isStatus}>
                {status}
              </Badge>
            </Flex>
          </Flex>
        )}
      </Flex>
      <div className={styles.borderBottom} />
      <Flex row height={window.innerHeight - 179}>
        <ResizePanel
          setInitialWidth={(box1: any) =>
            setState((state) => ({ ...state, box1 }))
          }
          width={state.box1}
        >
          <Flex
            height={window.innerHeight - 179}
            className={styles.textContent}
          >
            <Button
              onClick={() => setFull(!isFull)}
              types="link"
              className={styles.svgNewWindow}
            >
              {isFull ? <SvgUnWindow /> : <SvgNewWindow />}
            </Button>

            {procedureData.procedure?.html && (
              <div id="content">
                <form onChange={handleHtmlInput}>
                  {uses.map((el: any) =>
                    parse(htmlToJSON && html2json.json2html(el))
                  )}
                </form>
              </div>
            )}
          </Flex>
        </ResizePanel>
        <div
          style={{
            height: "100%",
            width: 4,
            backgroundColor: gray4,
            cursor: "ew-resize",
          }}
          onMouseDown={onMouseDown(["box1", "box2"], 1)}
        />
        <ResizePanel
          setInitialWidth={(box2: any) =>
            setState((state) => ({ ...state, box2 }))
          }
          width={state.box2}
        >
          <Flex>
            <ButtonGroup
              defaultSelected={"Results"}
              buttons={["Results", "Charts", "Remarks"]}
              onButtonChange={handleTab}
            />
            <Flex height={window.innerHeight - 303}>
              {isTab === "Results" && (
                <Flex className={styles.actionFlex}>
                  <RunzRichText
                    onEditorChange={(event: any) => setResult(event)}
                    value={expResult}
                    height={"100%"}
                  />
                </Flex>
              )}
              {isTab === "Charts" && (
                <div style={{ overflowY: "scroll", padding: 10 }}>
                  <LineCharts />
                </div>
              )}
              {isTab === "Remarks" && (
                <Flex className={styles.actionFlex}>
                  <RunzRichText
                    onEditorChange={(event: any) => setRemarks(event)}
                    value={expRemarks}
                    height={"100%"}
                  />
                </Flex>
              )}
            </Flex>
            <Flex row center between className={styles.footer}>
              <Button types="tertiary-1">Back</Button>
              <Flex row center>
                {/* <SvgPrint /> */}
                <Button onClick={handleSave} style={{ marginLeft: 8 }}>
                  Save
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </ResizePanel>
      </Flex>
    </Flex>
  );
};

export default RunzEditScreen;
