import React, { ChangeEvent, useRef, useState } from "react";
import { useUpload } from "../../hooks/upload";
import { csvToObject } from "../../utils/csvFormated";

interface FilesProps {
  sicgesp: [];
  local: [];
}

const FileUploader = ({ placeholder, label, type }: any) => {
  
  const importFile = useRef<any>(null);
  const [fileName, setFileName] = useState<string | undefined>("");
  const { handleUploadFile } = useUpload();

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
            <input ref={importFile} onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              const files: FileList | null = target.files;
              const file: File | undefined = files?.[0];
              const reader = new global.FileReader();
              reader.onloadend = () => {
                const csv = csvToObject(reader.result);
                setFileName(file?.name);
                handleUploadFile(csv, type);
              };
              reader.readAsText(file as Blob);
            }} type="file" style={{ display: "none" }} />
            {fileName !== "" ? fileName : placeholder}
          </button>
        </>
      </div>
    </>
  );
};

export default FileUploader;
