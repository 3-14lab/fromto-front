import React, { createContext, useState, useContext } from 'react';

interface UploadContextData {
  file: FileProps[];
  setFile: any;
  handleUploadFile(file: FileProps[]): void;
}

interface FileProps {
  model_code: string;
  place_name: string;
  value: string;
  base_code?: string | undefined;
}

const UploadContext = createContext({} as UploadContextData);

export const UploadProvider: React.FC = ({ children }) => {
  
  const [file, setFile] = useState({} as FileProps[]);

  function handleUploadFile(file: FileProps[]) {
    setFile(file)
  }

  return (
    <UploadContext.Provider
      value={{ file, setFile, handleUploadFile }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export function useUpload() {
  const context = useContext(UploadContext);
  return context;
}
