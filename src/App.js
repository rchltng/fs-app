
import './App.css';
import React, { Component } from 'react';
import { Form, Row, Col, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./components/navbar.component";
class App extends Component {
  render() {
    return (
      <div> 
        <NavBar className = "nav" />
            </div> 
    );

  }
}

export default App;