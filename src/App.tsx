import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";

import store from './store';

import SaveDriver from './pages/Driver/save-driver';
import ListDrivers from './pages/Driver/list-driver';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/drivers" element={<ListDrivers />} />
              <Route path="/" element={<Login />} />
              <Route path="/driver" element={<SaveDriver />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
