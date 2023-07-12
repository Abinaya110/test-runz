import { useMemo, useState } from "react";
import Flex from "../../packages/Flex/Flex";
import CheckBox from "../../packages/CheckBox/CheckBox";
import { isEmpty } from "../../utils/validators";
import { ACTIVE_BACKING_BOARD, activeBackingBoard } from "./mock";
import Table from "../../packages/Table/Table";
import RunzCustomHeader from "./RunzCustomHeader";
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

const RunzScreen = () => {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const columns = useMemo(() => activeBackingBoard(), []);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [submitModal, setSubmitModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [createNewRunz, setCreateNewRunz] = useState(false);

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
    <Flex className={styles.overAll}>
      <CreateNewRunzModal
        open={createNewRunz}
        cancelClick={() => {
          setCreateNewRunz(false);
        }}
        suubmit={() => {
          Alert("Runz created successfully.");
          setCreateNewRunz(false);
        }}
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
        onPageChange={handlePage}
        currentPage={currentPage}
        hideActions={selectedRows.length === 0}
        actionTitle="Runz"
        actionTitleBtn={() => (
          <Button onClick={() => setCreateNewRunz(true)}>
            <LableWithIcon label="Create runz" actionLeft={() => <SvgPlus />} />
          </Button>
        )}
        showHeader={false}
        customHeader={<RunzCustomHeader />}
        rowSelection={handleSelections}
        rowSelectionAll={handleAllSelections}
        dataSource={ACTIVE_BACKING_BOARD}
        columns={columns}
        rowUnSelectAll={handleAllUnSelections}
        rowDeleteAction={handleDeleteOpen}
        rowSubmitAction={handleSubmitOpen}
        rowShareAction={handleShareOpen}
      />
    </Flex>
  );
};

export default RunzScreen;
