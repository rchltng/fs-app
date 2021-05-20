import React from 'react';

import Discipline from './discipline.component';

const Disciplines = ({ }) => {
    const overview = React.useRef()
    const singles = React.useRef()
    const pairs = React.useRef()
    const icedance = React.useRef()

    function smoothScroll(target) {
        const { top } = target.getBoundingClientRect();
        
        window.scrollTo({
            top: top + window.pageYOffset - 50,
            behavior: "smooth"
        });
    }

    return (
        <div>
            <div className="sidenav">
                <li className = "options">
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(overview.current)}>overview</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(singles.current)}>singles</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(pairs.current)}>pairs</a>
                    </ol>
                    <ol>
                        <a className = "discDetail" onClick={() => smoothScroll(icedance.current)}>ice dance</a>
                    </ol>
                </li>
            </div>
            <div className="disciplines">
                <div className="discipline" ref={overview}>
                    <div className="disciplineTitle">
                        overview
                    </div>
                    <p>
                        In all four disciplines, athletes perform two programs (the short program and the free skate) where they are required to perform various elements on figure skates with music. The length of a short program is 2 minutes and 40 seconds, while the free skate is 4 minutes. The score earned by each program performed consists of a technical element score and a program component score. The technical element score is based on the level of difficulty and grade of execution (GOE) of the elements performed, and the program component score is based on five attributes relating to an athlete’s artistry and presentation.
                    </p>
                    <p> The scores from the short and free programs are added together to determine the skaters’ final scores. The skater with the highest total score wins.</p>
                </div>

                <div id={'singles'} ref={singles} >
                    <Discipline discipline="singles"></Discipline>
                </div>

                <div id={'pairs'} ref={pairs} >
                    <Discipline discipline="pairs"></Discipline>
                </div>

                <div id={'icedance'} ref={icedance}>
                    <Discipline discipline="ice dance"></Discipline>
                </div>
            </div>
        </div>
    )
}

export default Disciplines;