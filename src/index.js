import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
    // Here I added the BrowserRowter that is used by React for navigation
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
);
