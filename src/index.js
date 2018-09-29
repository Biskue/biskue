import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import reducer from "./Redux/Reducers/reducer"
import promiseMiddleware from 'redux-promise-middleware';
import {BrowserRouter as Router} from 'react-router-dom'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(promiseMiddleware())))

ReactDOM.render(

<Provider store = {store}>
<Router>
<App />
</Router>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
