import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

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
