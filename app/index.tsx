import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './app.css';
import './app.animations.css';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter hashType="hashbang">
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
