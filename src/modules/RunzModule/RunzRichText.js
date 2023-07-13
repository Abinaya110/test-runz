import { Editor } from "@tinymce/tinymce-react";

const RunzRichText = ({ height }) => {
  return (
    <Editor
      apiKey="au50u78j9vjabzcr4icg4v3oknubu08ifv9rfstawlzmdobp"
      init={{
        selector: "textarea",
        menubar: "format",
        height: height,
        directionality: "ltr",
        content_style: `body { font-family:'Poppins-Medium'; font-size:14px;color:#1a1a1a }`,
      }}
      toolbar={
        "undo redo | blocks | charmap superscript subscript | superscript subscript bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent"
      }
      plugins={["charmap", "link", "image", "code", "lists", "directionality"]}
    />
  );
};

export default RunzRichText;
