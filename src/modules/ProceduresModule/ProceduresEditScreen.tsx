import LableWithIcon from "../../common/LableWithIcon";
import SvgEdit from "../../icons/SvgEdit";
import Flex from "../../packages/Flex/Flex";
import Text from "../../packages/Text/Text";
import styles from "./procedureseditscreen.module.css";
import Button from "../../packages/Button/Button";
import SvgPrint from "../../icons/SvgPrint";
import CreateOrEditProcedure from "./CreateOrEditProcedure";
import { useState } from "react";
import Alert from "../../packages/Alert/Alert";
import ProceduresRichText from "./ProceduresRichText";

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

        {/* <RichText
          // onFocus={handleOpenInput}
          // onBlur={handleCloseInput}
          // onInit={(_a: any, editor: any) => (editorRef.current = editor)}
          // initialValue={values.jobDescription}
          height={500}
          // onChange={() => {

          //   // onDirty();
          //   console.log('desssss')
          // }}
        /> */}

        <ProceduresRichText />
        {/* <Editor
          id="myTiny_Mce"
          // initialValue={initialcontent}
          apiKey="au50u78j9vjabzcr4icg4v3oknubu08ifv9rfstawlzmdobp"
          init={{
            height: "100vh",
            menubar: true,
            external_plugins: {
              // tiny_mce_wiris: `${path.join(
              //   __dirname,
              //   "../../../../node_modules/@wiris/mathtype-tinymce5/plugin.min.js"
              // )}`,
            },
            plugins: [
              "advlist autolink lists link image code textpattern template",
              "charmap print preview anchor help",
              "searchreplace visualblocks code",
              "insertdatetime media table advtablesort paste wordcount save",
            ],
            toolbar: `undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help | image code table customInsertButton customDateButton template tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry`,
            image_advtab: true,
            image_title: true,
            automatic_uploads: true,
            file_picker_types: "image",
            table_advtab: "true",

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          // onInit={(evt, editor) => (editorRef.current = editor)}
        /> */}
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
