import React, { createContext, useState, useContext } from 'react';

interface UploadContextData {
  files: FilesProps;
  setFiles: any;
  handleUploadFile(file: any, type: string): void;
}

interface FilesProps {
  sicgesp: [],
  local: [],
}

const UploadContext = createContext({} as UploadContextData);

export const UploadProvider: React.FC = ({ children }) => {
  
  const [files, setFiles] = useState({} as FilesProps);

  function handleUploadFile(file: any, type: string) {
    const filledFile = {
      [type]: file,
    }
    setFiles({ ...files, ...filledFile})
  }


  return (
    <UploadContext.Provider
      value={{ files, setFiles, handleUploadFile }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export function useUpload() {
  const context = useContext(UploadContext);
  return context;
}
