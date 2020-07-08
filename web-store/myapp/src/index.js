import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from "./store";
import {BrowserRouter,Switch,Route} from 'react-router-dom';


const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
ReactDOM.render(
	<Provider
	      store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )} 
	> //store={store}  //As with connect(), you should start by wrapping your entire application in a <Provider> component to make the store available throughout the component tree:
		<BrowserRouter>
		<App /> 
		</BrowserRouter>
	</Provider>
	, document.getElementById('root')
	);


//as Router