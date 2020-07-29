import React,{useEffect} from 'react';
import AppNavbar from './components/AppNavbar';
import './App.css';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Items from './components/Items';
import Item from './components/Item';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/require_auth';
import {tokenCheck,tokenConfig,loadUser} from './actions/authActions';


function App() {
  useEffect(() => {     // it is like component did mount, but it is a react new hook
    store.dispatch(loadUser()); // when the component did mount give me the user it there is a token in the local storage where i store tokens
  }, []);
  return (
  	<Provider store={store}>
  	<Router>
    <div className="App">
    <AppNavbar /> 
    <Route exact path="/" render={() => {               // in the main page i must check it there is token or not 
      const token = localStorage.getItem('token');
  if (token) { 
   return <Redirect to={{ pathname: "/Dashboard" }} />;
  } else {
  return  <Redirect to={{ pathname: "/" }} />;
  }
  
}} />
    <Switch>
      <Route path="/SignIn" component={SignIn} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/User" component={Profile} /> 
      <Route path="/Items" exact  component={Items} />
      <Route path="/Item/:id" exact  component={Item} />
      <Route path="/Dashboard" exact  component={Dashboard} /> 
      <Route path="/Cart" component={Cart} /> 
    </Switch>
     </div>
     </Router>
     </Provider>
  );
}
export default App;

