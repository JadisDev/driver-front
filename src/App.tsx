import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Provider } from "react-redux";

import store from './store';
import Driver from './pages/Driver';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/login" element={<Login />} />
              <Route path="/driver" element={<Driver />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
