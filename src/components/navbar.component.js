import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink} from "react-router-dom";
import { Switch } from "react-router";

import Home from "./home.component";
import Disciplines from "./disciplines.component";
import Skaters from "./skaters.component";
import Elements from "./elements.component";
import Scores from "./scores.component";
import Skater from "./skater.component"

class NavBar extends Component {
    render() {
        return (
            <div> 
            <Router>
                <Route render={({ location }) => (
                    <nav className="topnav">
                        <NavLink className="link" to="/" exact={true} activeClassName="activeNav">  Home</NavLink>
                        <NavLink className="link" to="/elements" activeClassName="activeNav"> Elements </NavLink>
                        <NavLink className="link" to="/disciplines" activeClassName="activeNav"> Disciplines </NavLink>
                        <NavLink className="link" to="/skaters" activeClassName="activeNav"> Skaters &amp; Rankings</NavLink>
                        <NavLink className="link" to="/scores" activeClassName="activeNav"> Scores </NavLink>
                                <Switch location={location}>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/disciplines" component={Disciplines} />
                                    <Route path="/skaters" exact component={Skaters} />
                                    <Route path="/elements" component={Elements} />
                                    <Route path="/scores" component={Scores} />
                                    <Route path="/skaters/:skater" component={Skater}/>
                                </Switch>
                    </nav>
                )} />
            </Router>
            </div> 
        )
    }

};

        export default NavBar