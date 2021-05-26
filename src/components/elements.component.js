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
                        <Link className = "discDetail" onClick={() => smoothScroll(anatomy.current)} to = {"#anatomy"}>Anatomy of a Figure Skate</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(jumps.current)} to = {"#jumps"}>Jumps</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(spins.current)} to = {"#spins"}>Spins</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(lifts.current)} to = {"#lifts"}>Lifts</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(stepseq.current)} to = {"#stepseq"}>Step Sequences</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(choreo.current)} to = {"#choreo"}>Choreographic Sequences</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(twizzles.current)} to = {"#twizzles"}>Twizzles</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(death_spirals.current)} to = {"#death_spirals"}>Death Spirals</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={() => smoothScroll(twists.current)} to = {"#twists"}>Twists</Link>
                    </ol>
                </li>
            </div>
            <div className="disciplines">
                <div id={'anatomy'} ref={anatomy} >
                    <Element element="Anatomy of a Figure Skate"> </Element>
                </div>
                <div id={'jumps'} ref={jumps} >
                <Element element="Jumps"> </Element>
                </div>
                <div id={'spins'} ref={spins} >
                <Element element="Spins"> </Element>
                </div>
                <div id={'lifts'} ref={lifts} >
                <Element element="Lifts"> </Element>
                </div>
                <div id={'stepseq'} ref={stepseq} >
                <Element element="Step Sequences"> </Element>
                </div>
                <div id={'choreo'}  ref={choreo} >
                <Element element="Choreographic Sequence"> </Element>
                </div>
                <div id={'twizzles'} ref={twizzles} >
                <Element element="Twizzles"> </Element>
                </div>
                <div id={'death_spirals'} ref={death_spirals} >
                <Element element="Death Spirals"> </Element>
                </div>
                <div id={'twists'} ref={twists} >
                <Element element="Twists"> </Element>
                </div>

            </div>
        </div>
    )
}

export default Elements;