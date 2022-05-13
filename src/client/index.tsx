import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { App } from './App';
import './index.scss';
import { addLeafletIcons } from './shared/leaflet-icons';
import { saveUserIdTokenToLocalStorage } from './shared/utils';

addLeafletIcons();
saveUserIdTokenToLocalStorage();

const container = document.getElementById('app');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);
