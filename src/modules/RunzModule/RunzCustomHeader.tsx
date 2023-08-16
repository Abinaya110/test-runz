import { FormikProps } from "formik";
import LableWithIcon from "../../common/LableWithIcon";
import SvgSort from "../../icons/SvgSort";
import Flex from "../../packages/Flex/Flex";
import InputText from "../../packages/InputText/InputText";
import SelectTag from "../../packages/SelectTag/SelectTag";
import styles from "./runzcustomheader.module.css";
import { formFilterType } from "./RunzScreen";
import { useState } from "react";
import Button from "../../packages/Button/Button";
import moment from "moment";

export const RunzDetailsHeader = ({
  formikFilter,
  setData,
  isData,
  data,
}: {
  formikFilter: FormikProps<formFilterType>;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      a.testobjective.localeCompare(b.testobjective)
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      b.testobjective.localeCompare(a.testobjective)
    );
    setData(sortedData);
  };
  return (
    <Flex flex={1}>
      <LableWithIcon
        type="bodyBold"
        color="shade-3"
        label="Runz details"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
        containerClassName={styles.sortTitleFlex}
      />

      <Flex row center flex={1}>
        <div style={{ flex: 1 }}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="ID"
            value={formikFilter.values.id}
            isClearable
            onChange={(event) => {
              if (event) {
                formikFilter.setFieldValue("id", event);
              } else {
                formikFilter.setFieldValue("id", "");
              }
            }}
          />
        </div>

        <div className={styles.inputMargin}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Department"
            value={formikFilter.values.department}
            isClearable
            onChange={(event) => {
              if (event) {
                formikFilter.setFieldValue("department", event);
              } else {
                formikFilter.setFieldValue("department", "");
              }
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <SelectTag
            options={[{ label: "ss", value: "11" }]}
            inputHeight={35}
            placeholder="Lab"
            value={formikFilter.values.lab}
            isClearable
            onChange={(event) => {
              if (event) {
                formikFilter.setFieldValue("lab", event);
              } else {
                formikFilter.setFieldValue("lab", "");
              }
            }}
          />
        </div>
      </Flex>
    </Flex>
  );
};

export const RunzCreatedOnHeader = ({
  formikFilter,
  setData,
  isData,
  data,
}: {
  formikFilter: FormikProps<formFilterType>;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      moment(a.createdAt)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(b.createdAt).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      moment(b.createdAt)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(a.createdAt).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Created on"
        type="bodyBold"
        color="shade-3"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
      />
      <Flex flex={1}>
        <InputText
          value={formikFilter.values.createdOn}
          onChange={formikFilter.handleChange("createdOn")}
          white
          size="small"
          keyboardType="date"
        />
      </Flex>
    </Flex>
  );
};
export const RunzDueDateHeader = ({
  formikFilter,
  setData,
  isData,
  data,
}: {
  formikFilter: FormikProps<formFilterType>;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      moment(a.dueDate)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(b.dueDate).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      moment(b.dueDate)
        .format("DD/MM/YYYY hh:mm A")
        .localeCompare(moment(a.dueDate).format("DD/MM/YYYY hh:mm A"))
    );
    setData(sortedData);
  };
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Due date"
        type="bodyBold"
        color="shade-3"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
      />
      <Flex flex={1}>
        <InputText
          white
          size="small"
          keyboardType="date"
          value={formikFilter.values.dueDate}
          onChange={formikFilter.handleChange("dueDate")}
        />
      </Flex>
    </Flex>
  );
};

export const RunzStatusHeader = ({
  formikFilter,
  setData,
  isData,
  data,
}: {
  formikFilter: FormikProps<formFilterType>;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      a.status.localeCompare(b.status)
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      b.status.localeCompare(a.status)
    );
    setData(sortedData);
  };

  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Status"
        type="bodyBold"
        color="shade-3"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
      />
      <div style={{ flex: 1 }}>
        <SelectTag
          options={[{ label: "ss", value: "11" }]}
          inputHeight={35}
          value={formikFilter.values.status}
          isClearable
          onChange={(event) => {
            if (event) {
              formikFilter.setFieldValue("status", event);
            } else {
              formikFilter.setFieldValue("status", "");
            }
          }}
        />
      </div>
    </Flex>
  );
};

export const RunzAssignedHeader = ({
  formikFilter,
  setData,
  isData,
  data,
}: {
  formikFilter: FormikProps<formFilterType>;
  setData: (a: any) => void;
  isData: any;
  data: any;
}) => {
  const [isFilter, setFilter] = useState("");

  const sortByNameAscending = () => {
    setFilter("Ascending");
    const sortedData = [...isData].sort((a, b) =>
      a.createdBy.localeCompare(b.createdBy)
    );
    setData(sortedData);
  };

  const sortByNameDescending = () => {
    setFilter("Descending");
    const sortedData = [...isData].sort((a, b) =>
      b.createdBy.localeCompare(a.createdBy)
    );
    setData(sortedData);
  };
  return (
    <Flex flex={1}>
      <LableWithIcon
        containerClassName={styles.sortTitleFlex}
        label="Assigned by"
        type="bodyBold"
        color="shade-3"
        actionRight={() => (
          <Button
            title={isFilter}
            onClick={() => {
              if (isFilter === "") {
                sortByNameAscending();
              } else if (isFilter === "Ascending") {
                sortByNameDescending();
              } else if (isFilter === "Descending") {
                setFilter("");
                setData(data);
              }
            }}
            types="link"
          >
            <SvgSort />
          </Button>
        )}
      />

      <div style={{ flex: 1 }}>
        <SelectTag
          options={[{ label: "ss", value: "11" }]}
          inputHeight={35}
          value={formikFilter.values.assignedBy}
          isClearable
          onChange={(event) => {
            if (event) {
              formikFilter.setFieldValue("assignedBy", event);
            } else {
              formikFilter.setFieldValue("assignedBy", "");
            }
          }}
        />
      </div>
    </Flex>
  );
};
