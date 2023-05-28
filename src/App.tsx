import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";

import store from './store';

import SaveDriver from './pages/Driver/save-driver';
import ListDrivers from './pages/Driver/list-driver';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/layout/layout-navbar';
import Footer from './components/layout/layout-footer';
import { Container } from 'react-bootstrap';
import NotAuthorized from './pages/NotAuthorized';

function App() {

  const login = localStorage.getItem('login');
  const url = window.location.pathname;
  if (login === '0' || login === "" || login === null && url !== '/') {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Container>
            <NotAuthorized />
          </Container>
          <Footer />
        </BrowserRouter>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Container>
            <Routes>
              <Route>
                <Route path="/drivers" element={<ListDrivers />} />
                <Route path="/" element={<Login />} />
                <Route path="/driver" element={<SaveDriver />} />
              </Route>
            </Routes>
          </Container>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
