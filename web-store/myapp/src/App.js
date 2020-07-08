import React from 'react';
import AppNavbar from './components/AppNavbar';
import Cover from './components/Cover';
import './App.css';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Items from './components/Items';
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Switch>
      <AppNavbar />
      <Route exact path="/SignIn" component={SignIn} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/" component={Items} />
      <Cover />
    </Switch>
    </div>
  );
}

export default App;
