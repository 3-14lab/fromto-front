import React from 'react';
import { AuthProvider } from './auth';
import { UploadProvider } from './upload';
import { PairingProvider } from './pairing';

export const AppProvider: React.FC = ({ children }) => {
  return (
    <UploadProvider>
      <PairingProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </PairingProvider>
    </UploadProvider>
  );
};
