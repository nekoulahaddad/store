import React from 'react';
import AppNavbar from './components/AppNavbar';
import Cover from './components/Cover';
import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Items from './components/Items';

function App() {
  return (
  	<Provider store={store}>
  	<Router>
    <div className="App">
      <AppNavbar />
      <Route path="/SignIn" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/" component={Items} />
      <Cover />
     </div>
     </Router>
     </Provider>
  );
}

export default App;
