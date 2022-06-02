import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import "./styles.css"
import { ToastProvider } from 'react-toast-notifications';


import Modal from 'react-modal'

import Routes from '@routes';
import {  AppProvider } from '@hooks';

Modal.setAppElement("#root")

const App: React.FC = () => {


  return (
    <BrowserRouter>
      <AppProvider>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
