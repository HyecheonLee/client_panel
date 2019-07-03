import React from 'react';
import './App.css';
import AppNavbar from "./components/layout/AppNavbar";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar/>
        <div className="container">
          <h1>Hello</h1>
        </div>
      </div>
    </Router>
  );
}

export default App;
