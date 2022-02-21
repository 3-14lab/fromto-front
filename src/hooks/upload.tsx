import React, { createContext, useState, useContext } from 'react';
import { fileObject } from '../utils/csvFormated';

interface UploadContextData {
  file: FileProps;
  setFile: any;
  handleUploadFile(file: FileProps): void;
}

export type localType = {
  model_code: string;
  place_name: string;
  value: string;
  base_code?: string;
}

export type sicgespType = {
  base_code: string;
  location: string;
  value: string;
}

type FileProps = {
  sicgesp: sicgespType[];
  local: localType[];
};

const UploadContext = createContext({} as UploadContextData);

export const UploadProvider: React.FC = ({ children }) => {
  
  const [file, setFile] = useState({} as FileProps);

  console.log('fileeeeeeeeeeee', file)

  function handleUploadFile(file: FileProps) {
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
