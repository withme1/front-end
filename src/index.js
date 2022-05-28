import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import io from 'socket.io-client'
import { setSocket } from './socket/socket';

//socket connect
const socket = io.connect('https://101.101.208.190/', {transports: ['websocket']})
setSocket(socket);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your aWpp, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
