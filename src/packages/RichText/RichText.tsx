/* eslint-disable max-len */
import { Editor } from "@tinymce/tinymce-react";
import { forwardRef, LegacyRef } from "react";

type Props = {
  placeholder?: string;
  height?: number;
  onChange?: (a: any) => void;
  initialValue?: string;
  value?: string;
  onInit?: any;
  onFocus?: (arg: any) => void;
  onBlur?: (arg: any) => void;
  id?: string;
  auto_focus?: string | true | undefined;
};

const RichText = (
  {
    placeholder,
    height,
    onChange,
    initialValue,
    value,
    onInit,
    onFocus,
    onBlur,
    id,
    auto_focus,
  }: Props,
  ref: LegacyRef<Editor> | undefined
) => {
  return (
    <div>
      <Editor
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={ref}
        onInit={onInit}
        apiKey="bamie1wheqvfes9rx1fitdyk2o9c0q1q8ij2wh4l8ffm6gor"
        init={{
          height,
          placeholder,
          content_style: `body { font-family:'Poppins-Medium'; font-size:14px;color:#1a1a1a } p {margin: 0px;font-size:14px;color:#1a1a1a} h6 {font-size:14px;margin-top: 16px;margin-bottom: 8px;}`,
          toolbar:
            "undo redo| styleselect | bold italic | alignleft aligncenter alignright | underline| bullist numlist outdent indent",
          removed_menuitems: "undo, redo, paste",
          menubar: "file edit format",
          plugins: "lists",
          auto_focus,
        }}
        initialValue={initialValue}
        value={value}
        onEditorChange={onChange}
      />
    </div>
  );
};

export default forwardRef(RichText);
