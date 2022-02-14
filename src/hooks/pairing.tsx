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
  formatCSV: CSVLine[];
  allCodeSelect: string[];
  formatCSVSecondary: any;
}

const PairingContext = createContext({} as PairingContextData);

export const PairingProvider: React.FC = ({ children }) => {
  
  const [allBody, setAllBody] = useState([] as any);
  const [allCodeSelect, setAllCodeSelect] = useState([] as any);

  function handleAddPairing(body: any, code: string | undefined) {
    console.log(body);
    setAllCodeSelect((prev: string[]) => [...prev, body.code_base]);
    // eslint-disable-next-line array-callback-return
    const allBodyFilted = allBody.filter((body: any) => body.code_model !== code && body);
    
    allBodyFilted.push(body);

    setAllBody(allBodyFilted);
  }

  

  const formatCSV = allBody.map((item: any) => delete item.code_model && item);
  const formatCSVSecondary = (file: any) => {
    const aux = [...formatCSV, ...file];

    return aux.map(item => item.value === "");
  }

  return (
    <PairingContext.Provider
      value={{ allBody, handleAddPairing, formatCSV, allCodeSelect, formatCSVSecondary }}
    >
      {children}
    </PairingContext.Provider>
  );
};

export function usePairing() {
  const context = useContext(PairingContext);
  return context;
}
