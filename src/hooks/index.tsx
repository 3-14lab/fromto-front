import React from 'react';
import { AuthProvider } from './auth';
import { ModalProvider } from './modal'

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};
