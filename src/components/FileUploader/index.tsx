import React, { useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { useUpload } from '../../hooks/upload';
import { csvToObject } from '../../utils/csvFormated';

interface FilesProps {
  sicgesp: [],
  local: [],
}

const FileUploader = ({ placeholder, label, type }: any) => {
  // const { isDragActive } = useDropzone();

  // const [files, setFiles] = useState({} as FilesProps);
  const [fileName, setFileName] = useState("");

  // function handleUploadFile(file: any, type: string) {
  //   const filledFile = {
  //     [type]: file,
  //   }
  //   setFiles({ ...files, ...filledFile})
  // }

  const { handleUploadFile } = useUpload();

  return (
    <>
      <Dropzone accept="text/csv" onDrop={(files) => {
        const reader = new global.FileReader();

        reader.onloadend = () => {
          const csv = csvToObject(reader.result);
          console.log(files[0].type)
     
          setFileName(files[0].name);

          handleUploadFile(csv, type)
        }
        reader.readAsText(files[0]);
      }}>
        {({ getRootProps, getInputProps }) => (
          <>
            <label className="font-roboto font-medium text-blue text-sm">{ label }</label>
            <button { ...getRootProps()} className={`w-full font-roboto font-normal text-sm border-2 border-dashed	rounded-md ${fileName !== "" ? "text-blue" : "text-[#9CA3AF]"} px-6 py-3 mb-5 mt-0.5`}>
              <input { ...getInputProps() } />
              { fileName !== "" ? fileName : placeholder }
            </button>
          </>
        )}
      </Dropzone>
    </>
  );
}

export default FileUploader;