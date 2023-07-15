import { Editor } from "@tinymce/tinymce-react";

const ProceduresRichText = () => {
  return (
    <Editor
      apiKey="au50u78j9vjabzcr4icg4v3oknubu08ifv9rfstawlzmdobp"
      init={{
        selector: "textarea",
        menubar: true,
        height: 600,
        image_advtab: true,
        image_title: true,
        automatic_uploads: true,
        file_picker_types: "image",
        table_advtab: "true",
        // content_style: "body { font-family:'Poppins-Regular'; font-size:16px }",
        content_style: `body { font-family:'Poppins-Medium'; font-size:14px;color:#1a1a1a }`,
      }}
      toolbar={
        "undo redo | formatselect | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image code table customInsertButton customDateButton template tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry"
      }
      plugins={[
        "advlist",
        "anchor",
        "autolink",
        "charmap",
        "code",
        "fullscreen",
        "help",
        "image",
        "insertdatetime",
        "link",
        "lists",
        "media",
        "preview",
        "searchreplace",
        "table",
        "visualblocks",
        "textpattern",
        "template",
        "print",
        "advtablesort",
        "paste",
        "wordcount",
        "save",
        // "powerpaste",
      ]}
    />
  );
};

export default ProceduresRichText;
