import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import "./styles.css"

import Routes from './routes';
import {  AppProvider } from './hooks';
import { UploadProvider } from './hooks/upload';
import { PairingProvider } from './hooks/pairing';

const App: React.FC = () => {


  return (
    <BrowserRouter>
      <UploadProvider>
        <PairingProvider>
          <AppProvider>
            <Routes />
          </AppProvider>
        </PairingProvider>
      </UploadProvider>
    </BrowserRouter>
  );
};

export default App;
