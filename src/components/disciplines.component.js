import React from 'react';
import { Link } from "react-router-dom"; 

import Discipline from './discipline.component';

const Disciplines = ({ }) => {
    const overview = React.useRef()
    const singles = React.useRef()
    const pairs = React.useRef()
    const icedance = React.useRef()

    function smoothScroll(target, e) {
        const { top } = target.getBoundingClientRect();
      console.log(e)
    //   e.target.classList.add('active')
        
        window.scrollTo({
            top: top + window.pageYOffset,
            behavior: "smooth"
        });
    }

    return (
        <div>
            <div className="sidenav">
                <li className = "options">
                    <ol>
                        <Link className = "discDetail" onClick={(e) => smoothScroll(overview.current, e)} to={"#overview"}>overview</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={(e) => smoothScroll(singles.current, e)} to={"#singles"}>singles</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={(e) => smoothScroll(pairs.current, e)} to={"#pairs"}>pairs</Link>
                    </ol>
                    <ol>
                        <Link className = "discDetail" onClick={(e) => smoothScroll(icedance.current, e)} to={"#ice dance"}>ice dance</Link>
                    </ol>
                </li>
            </div>
            <div className="disciplines">
                <div id={'overview'} className="discipline" ref={overview}>
                    <div className="disciplineTitle">
                        overview
                    </div>
                    <p>
                        In all four disciplines, athletes perform two programs (the short program and the free skate) where they are required to perform various elements on figure skates with music. The length of a short program is 2 minutes and 40 seconds, while the free skate is 4 minutes. The score earned by each program performed consists of a technical element score and a program component score. The technical element score is based on the level of difficulty and grade of execution (GOE) of the elements performed, and the program component score is based on five attributes relating to an athlete’s artistry and presentation.
                    </p>
                    <p> The scores from the short and free programs are added together to determine the skaters’ final scores. The skater with the highest total score wins.</p>
                </div>

                <div className="discipline" id={'singles'} ref={singles} >
                    <Discipline  id={'singles'} discipline="singles"></Discipline>
                </div>

                <div className="discipline" id={'pairs'} ref={pairs} >
                    <Discipline discipline="pairs"></Discipline>
                </div>

                <div className="discipline" id={'ice dance'} ref={icedance}>
                    <Discipline discipline="ice dance"></Discipline>
                </div>
            </div>
        </div>
    )
}

export default Disciplines;