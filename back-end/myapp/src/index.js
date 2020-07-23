import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { USER_LOADED } from './actions/types';
import store from "./store";
import axios from 'axios';
import JavascriptTimeAgo from 'javascript-time-ago'
import {tokenCheck,tokenConfig,loadUser} from './actions/authActions';
 
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
 
JavascriptTimeAgo.addLocale(en)
JavascriptTimeAgo.addLocale(ru)


//store.dispatch(loadUser())


ReactDOM.render(<App />, document.getElementById('root'));


