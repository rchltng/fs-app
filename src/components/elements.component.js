import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, useLocation } from "react-router-dom";
import { Switch } from "react-router";
import NavBar from "./navbar.component";
import Element from "./element.component"

const Elements = ({ }) => {
    const anatomy = React.useRef()
    const jumps = React.useRef()
    const spins = React.useRef()
    const lifts = React.useRef()
    const stepseq = React.useRef()
    const choreo = React.useRef()
    const twizzles = React.useRef()
    const death_spirals = React.useRef()
    const twists = React.useRef()

    function smoothScroll(target) {
        const { top } = target.getBoundingClientRect();

        window.scrollTo({
            top: top + window.pageYOffset - 50,
            behavior: "smooth"
        });
    }

    return (
        <div>
            <div className="sidenav elementnav">
                <li>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(anatomy.current)}>anatomy of a figure skate</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(jumps.current)}>jumps</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(spins.current)}>spins</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(spins.current)}>lifts</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(stepseq.current)}>step sequences</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(choreo.current)}>choreographic sequences</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(twizzles.current)}>twizzles</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(death_spirals.current)}>death spirals</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(twists.current)}>twists</a>
                    </ol>
                </li>
            </div>
            <div className="disciplines">
                <div ref={anatomy} >
                    <Element element="anatomy of a figure skate"> </Element>
                </div>
                <div ref={jumps} >
                <Element element="jumps"> </Element>
                </div>
                <div ref={spins} >
                <Element element="spins"> </Element>
                </div>
                <div ref={lifts} >
                <Element element="lifts"> </Element>
                </div>
                <div ref={stepseq} >
                <Element element="step sequences"> </Element>
                </div>
                <div ref={choreo} >
                <Element element="choreographic sequence"> </Element>
                </div>
                <div ref={twizzles} >
                <Element element="twizzles"> </Element>
                </div>
                <div ref={death_spirals} >
                <Element element="death spirals"> </Element>
                </div>
                <div ref={twists} >
                <Element element="twists"> </Element>
                </div>

            </div>
        </div>
    )
}

export default Elements;