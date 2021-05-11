import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, useLocation } from "react-router-dom";
import { Switch } from "react-router";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import posed, { PoseGroup } from 'react-pose';
import Home from "./home.component";
import Overview from "./overview.component";
import Skaters from "./skaters.component";
import Videos from "./videos.component";
import Scores from "./scores.component";

class NavBar extends Component {
    render() {
        return (

            <Router>
                <Route render={({ location }) => (
                    <div className="topnav">
                        <NavLink className="link" to="/" exact={true} activeClassName="activeNav">  Home</NavLink>
                        <NavLink to="/overview" activeClassName="activeNav"> Overview </NavLink>
                        <NavLink to="/skaters" activeClassName="activeNav"> Skaters &amp; Rankings</NavLink>
                        <NavLink to="/videos" activeClassName="activeNav"> Watch </NavLink>
                        <NavLink to="/scores" activeClassName="activeNav"> Scores </NavLink>

                        {/* <TransitionGroup>
                            <CSSTransition
                         
                                // classNames='fadeInAnimation'
                                key={location.key}> */}

                                <Switch location={location}>
                                    <Route path="/" exact component={Home} />
                                    <Route path="/overview" component={Overview} />
                                    <Route path="/skaters" component={Skaters} />
                                    <Route path="/videos" component={Videos} />
                                    <Route path="/scores" component={Scores} />
                                </Switch>
                            {/* </CSSTransition>
                        </TransitionGroup> */}
                    </div>
                )} />
            </Router>
        )
    }

};

export default NavBar