import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Routers/AppRouter';
import './index.css';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
