import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Context} from './Context';
import 'react-alice-carousel/lib/alice-carousel.css';


ReactDOM.render(
  <BrowserRouter>
  <Context>
  <App />
  </Context>
  </BrowserRouter>,
  document.getElementById('root')
);
