import React from 'react';
import './App.css';
import AppNavbar from "./components/layout/AppNavbar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import {Provider} from 'react-redux';
import store from "./store";
import AddClient from "./components/clients/AddClient";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={Dashboard}/>
              <Route exact path="/client/add" component={AddClient}/>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
