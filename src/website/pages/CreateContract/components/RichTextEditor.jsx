import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../../../assets/dashboard/css/contract.css";

const RichTextEditor = ({ contractType }) => {
  const initialDataMap = {
    hour: `<div><h1 style="font-weight: bold; border:1px solid black; text-align:center;">عقد إيجار بالساعة </h1><p>Content specific to hourly contract.</p></div>`,
    daily: `<div><h1 style="font-weight: bold; border:1px solid black; text-align:center;">عقد إيجار يومي </h1><p>Content specific to daily contract.</p></div>`,
    weekely: `<div><h1 style="font-weight: bold; border:1px solid black; text-align:center;">عقد إيجار أسبوعي </h1><p>Content specific to weekly contract.</p></div>`,
    monthly: `<div><h1 style="font-weight: bold; border:1px solid black; text-align:center;">عقد إيجار شهري </h1><p>Content specific to monthly contract.</p></div>`,
    year: `<div><h1 style="font-weight: bold; border:1px solid black; text-align:center;">عقد إيجار سنوي </h1><p>Content specific to yearly contract.</p></div>`,
  };
  const [data, setData] = useState(initialDataMap[contractType] || "");
  useEffect(() => {
    // Update the data state when the contractType prop changes
    setData(initialDataMap[contractType] || "");
  }, [contractType]);
  const handleEditorChange = (event, editor) => {
    const newData = editor.getData();
    setData(newData);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;
