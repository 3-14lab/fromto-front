import React, { createContext, useState, useContext } from 'react';

interface UploadContextData {
  file: FileProps;
  setFile: any;
  handleUploadFile(file: FileProps): void;
}

export type localType = {
  model_code?: string | null;
  place_name: string;
  value: string;
  base_code?: string | null;
}

export type sicgespType = {
  base_code: string;
  location: string;
  value: string;
}

export type pairingCodesType = {
  base_code: string;
  model_code: string;
}

export type FileProps = {
  sicgesp: sicgespType[];
  local: localType[];
};


const UploadContext = createContext({} as UploadContextData);

export const UploadProvider: React.FC = ({ children }) => {
  
  const [file, setFile] = useState({} as FileProps);

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
