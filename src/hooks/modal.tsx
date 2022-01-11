import React, { createContext, useState, useContext } from 'react';

interface ModalContextData {
  isNewDataModalOpen: boolean;
  handleOpenNewDataModal(): void;
  handleCloseNewDataModal(): void;
}

const AuthContext = createContext<ModalContextData>({} as ModalContextData);

export const ModalProvider: React.FC = ({ children }) => {
  const [isNewDataModalOpen, setIsNewDataModalOpen] = useState(false)

  function handleOpenNewDataModal(){
    setIsNewDataModalOpen(true)
  }

  function handleCloseNewDataModal(){
    setIsNewDataModalOpen(false)
  }

  return (
    <AuthContext.Provider
      value={{ handleOpenNewDataModal, handleCloseNewDataModal, isNewDataModalOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useModal(): ModalContextData {
  const context = useContext(AuthContext);
  return context;
}
