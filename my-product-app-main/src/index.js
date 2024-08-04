import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import Paidpage from './Paidpage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import Productpage from './Productpage';
import Information from './Information';
import Adminpage from './Adminpage';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="product" element={<Productpage />} />
      <Route path="info" element={<Information />} />
      <Route path="payment" element={<Paidpage />} />
      <Route path="admin" element={<Adminpage />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
