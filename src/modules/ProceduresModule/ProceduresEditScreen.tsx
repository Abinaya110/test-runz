import LableWithIcon from "../../common/LableWithIcon";
import SvgEdit from "../../icons/SvgEdit";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./procedureseditscreen.module.css";
import "react-quill/dist/quill.snow.css";
import RichText from "../../packages/RichText/RichText";
import Button from "../../packages/Button/Button";
import SvgPrint from "../../icons/SvgPrint";
import CreateOrEditProcedure from "./CreateOrEditProcedure";
import { useState } from "react";
import Alert from "../../packages/Alert/Alert";

const ProceduresEditScreen = () => {
  const [editdProcedure, setEditdProcedure] = useState(false);

  return (
    <Flex>
      <CreateOrEditProcedure
        title="Edit procedure"
        open={editdProcedure}
        submit={() => {
          setEditdProcedure(false);
          Alert("Procedure saved successfully.");
        }}
        cancelClick={() => {
          setEditdProcedure(false);
        }}
      />
      <Flex className={styles.overAll}>
        <Flex row between center>
          <Flex>
            <Text type="captionBold" color="shade-3">
              ID023659ADN / Dept-Computer science / Lab-Data structure
            </Text>
            <Text type="subTitle">Bubble sort</Text>
          </Flex>
          <Button
            types="link"
            onClick={() => {
              setEditdProcedure(true);
            }}
          >
            <LableWithIcon
              labelSize={20}
              type="bodyLight"
              label="Edit"
              actionLeft={() => <SvgEdit />}
            />
          </Button>
        </Flex>
        <Flex row className={styles.dateFlex}>
          <Flex className={styles.createFlex}>
            <Text
              className={styles.createText}
              type="captionBold"
              color="shade-3"
            >
              Created by
            </Text>
            <Text type="button-3" color="shade-3">
              Teacher A
            </Text>
          </Flex>
          <Flex>
            <Text
              className={styles.createText}
              type="captionBold"
              color="shade-3"
            >
              Created on
            </Text>
            <Text type="button-3" color="shade-3">
              28/05/2023 (Wed)
            </Text>
          </Flex>
        </Flex>
        <Text className={styles.fullText} type="captionBold">
          Full procedure
        </Text>

        <RichText
          // onFocus={handleOpenInput}
          // onBlur={handleCloseInput}
          // onInit={(_a: any, editor: any) => (editorRef.current = editor)}
          // initialValue={values.jobDescription}
          height={500}
          // onChange={() => {

          //   // onDirty();
          //   console.log('desssss')
          // }}
        />
      </Flex>
      <Flex row center between className={styles.footerContainer}>
        <Button types="tertiary-1">Back</Button>
        <Flex row center>
          <Button types="link">
            <SvgPrint />
          </Button>

          <Button style={{ marginLeft: 20 }}>Save</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProceduresEditScreen;
