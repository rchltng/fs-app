import React from 'react';
import Element from "./element.component"
import { Link } from "react-router-dom"; 

const Elements = () => {
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
                        <Link className = "discDetail" onClick={() => smoothScroll(anatomy.current)} to = {"#anatomy"}>anatomy of a figure skate</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(jumps.current)} to = {"#jumps"}>jumps</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(spins.current)} to = {"#spins"}>spins</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(lifts.current)} to = {"#lifts"}>lifts</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(stepseq.current)} to = {"#stepseq"}>step sequences</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(choreo.current)} to = {"#choreo"}>choreographic sequences</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(twizzles.current)} to = {"#twizzles"}>twizzles</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(death_spirals.current)} to = {"#death_spirals"}>death spirals</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(twists.current)} to = {"#twists"}>twists</Link>
                    </ol>
                </li>
            </div>
            <div className="disciplines">
                <div id={'anatomy'} ref={anatomy} >
                    <Element element="anatomy of a figure skate"> </Element>
                </div>
                <div id={'jumps'} ref={jumps} >
                <Element element="jumps"> </Element>
                </div>
                <div id={'spins'} ref={spins} >
                <Element element="spins"> </Element>
                </div>
                <div id={'lifts'} ref={lifts} >
                <Element element="lifts"> </Element>
                </div>
                <div id={'stepseq'} ref={stepseq} >
                <Element element="step sequences"> </Element>
                </div>
                <div id={'choreo'}  ref={choreo} >
                <Element element="choreographic sequence"> </Element>
                </div>
                <div id={'twizzles'} ref={twizzles} >
                <Element element="twizzles"> </Element>
                </div>
                <div id={'death_spirals'} ref={death_spirals} >
                <Element element="death spirals"> </Element>
                </div>
                <div id={'twists'} ref={twists} >
                <Element element="twists"> </Element>
                </div>

            </div>
        </div>
    )
}

export default Elements;