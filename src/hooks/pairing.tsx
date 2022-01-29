import React, { createContext, useState, useContext } from 'react';
import api from '../services/api';


interface CSVLine {
  code_base: string;
  location: string;
  value: string;
}

interface PairingContextData {
  allBody: any;
  handleAddPairing(file: any, type: string | undefined): void;
  formatCSV: CSVLine[]
}

const PairingContext = createContext({} as PairingContextData);

export const PairingProvider: React.FC = ({ children }) => {
  
  const [allBody, setAllBody] = useState([] as any);

  function handleAddPairing(body: any, code: string | undefined) {
    // eslint-disable-next-line array-callback-return
    const allBodyFilted = allBody.filter((body: any) => body.code_model !== code && body);
    
    allBodyFilted.push(body);

    setAllBody(allBodyFilted);
  }

  const formatCSV = allBody.map((item: any) => delete item.code_model && item);

  return (
    <PairingContext.Provider
      value={{ allBody, handleAddPairing, formatCSV }}
    >
      {children}
    </PairingContext.Provider>
  );
};

export function usePairing() {
  const context = useContext(PairingContext);
  return context;
}
