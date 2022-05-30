import React, { ChangeEvent, useRef, useState } from "react";
import { useUpload } from "@hooks/upload";
import { csvToObject } from "@utils/csvFormated";

type FileUploaderProps = {
  placeholder: string;
  label: string;
  type: 'sicgesp' | 'local' | 'localPJ';
}

const FileUploader = ({ placeholder, label, type }: FileUploaderProps) => {
  
  const importFile = useRef<any>(null);
  const [fileName, setFileName] = useState<string | undefined>("");
  const { file: fileObject, handleUploadFile } = useUpload();

  function handleFileChange({ target }: ChangeEvent<HTMLInputElement>) {
    const files: FileList | null = target.files;
    const file: File | undefined = files?.[0];
    console.log(file);
    const reader = new global.FileReader();
    reader.onloadend = () => {
      const csv = csvToObject(reader.result, type);
      setFileName(file?.name);
      handleUploadFile({ ...fileObject, [type]: csv });
    };
    reader.readAsText(file as Blob, 'ISO-8859-1');
  }

  return (
    <>
      <div>
        <>
          <label className="font-roboto font-medium text-blue text-sm">
            {label}
          </label>
          <button
            onClick={() => {
              importFile?.current?.click();
            }}
            className={`w-full font-roboto font-normal text-sm border-2 border-dashed	rounded-md ${
              fileName !== "" ? "text-blue" : "text-[#9CA3AF]"
            } px-6 py-3 mb-5 mt-0.5`}
          >
            <input ref={importFile} onChange={handleFileChange} type="file" style={{ display: "none" }} accept=".csv" />
            {fileName !== "" ? fileName : placeholder}
          </button>
        </>
      </div>
    </>
  );
};

export default FileUploader;
