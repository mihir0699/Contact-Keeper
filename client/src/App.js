import React, {Fragment} from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './contexts/contacts/ContactState';
import AuthState from './contexts/auth/AuthState';
import Register from './components/auth/register';
import Login from './components/auth/login';
import AlertState from './contexts/alerts/AlertState';
import Alerts from './components/layout/alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/privateRoutes'

if(localStorage.token)
    {
        setAuthToken(localStorage.token);
    }

function App() {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <Router>
    <Fragment>
      <Navbar />
      <div className="container">
        <Alerts />
        <Switch>
          <PrivateRoute exact path = "/" component = {Home} />
          <Route exact path = "/about" component = {About} />
          <Route exact path = "/register" component = {Register} />
          <Route exact path = "/login" component = {Login} />
        </Switch>
      </div>
      </Fragment>
    </Router>
    </AlertState>
    </ContactState>
    </AuthState>
  );
}

export default App;
