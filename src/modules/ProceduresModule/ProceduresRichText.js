import { Editor } from "@tinymce/tinymce-react";
import { nanoid } from "nanoid";

const ProceduresRichText = ({ onEditorChange, value }) => {
  return (
    <Editor
      value={value}
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
        content_style: `body { font-family:'Poppins-Medium'; font-size:14px;color:#1a1a1a }`,

        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.onchange = function () {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              var id = "blobid" + new Date().getTime();
              var blobCache =
                window.tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(",")[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        setup: function (editor) {
          editor.ui.registry.addButton("customInsertButton", {
            icon: "edit-block",
            tooltip: "Insert Input Element",
            onAction: function (_) {
              const value = nanoid(7);
              editor.insertContent(
                `&nbsp;<input type='text' id='value_${value}' name='value_${value}'>&nbsp;`
              );
            },
          });

          var toTimeHtml = function (date) {
            return (
              '<time datetime="' +
              date.toString() +
              '">' +
              date.toDateString() +
              "</time>"
            );
          };
          editor.ui.registry.addButton("customDateButton", {
            icon: "insert-time",
            tooltip: "Insert Current Date",
            disabled: true,
            onAction: function (_) {
              editor.insertContent(toTimeHtml(new Date()));
            },
            onSetup: function (buttonApi) {
              var editorEventCallback = function (eventApi) {
                buttonApi?.setDisabled(
                  eventApi.element.nodeName.toLowerCase() === "time"
                );
              };
              editor.on("NodeChange", editorEventCallback);
              /* onSetup should always return the unbind handlers */
              return function (buttonApi) {
                editor.off("NodeChange", editorEventCallback);
              };
            },
          });
        },
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
      onEditorChange={onEditorChange}
    />
  );
};

export default ProceduresRichText;
