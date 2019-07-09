import React from 'react';
import './App.css';
import AppNavbar from "./components/layout/AppNavbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import {Provider} from 'react-redux';
import store from "./store";
import AddClient from "./components/clients/AddClient";
import ClientDetails from "./components/clients/ClientDetails";
import EditClient from "./components/clients/EditClient";
import {UserIsAuthenticated, UserIsNotAuthenticated} from "./helper/auth";
import Settings from "./components/setting/Settings";
import Login from "./components/auth/Login";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={UserIsAuthenticated(Dashboard)}/>
              <Route exact path="/client/add" component={UserIsAuthenticated(AddClient)}/>
              <Route exact path="/client/edit/:id" component={UserIsAuthenticated(EditClient)}/>
              <Route exact path="/client/:id" component={UserIsAuthenticated(ClientDetails)}/>
              <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
              <Route exact path="/settings" component={UserIsAuthenticated(Settings)}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
