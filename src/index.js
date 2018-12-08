import React from 'react';
import ReactDOM from 'react-dom';

// leaflet
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility'

import './index.css';
import 'typeface-roboto';
import MainApp from './App';
import * as serviceWorker from './serviceWorker';

import FileHelper from './utils/files';


// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


const startApp = () => {
    ReactDOM.render(
    <MainApp />,
    document.getElementById('root'));
    serviceWorker.register();
};

if(window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}
