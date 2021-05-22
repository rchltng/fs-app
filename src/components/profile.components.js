import React, { Component } from 'react';

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    scores(score, index) {
    return <ol key={index}> {score[0]} : {score[1]}</ol>
}

    render() {
        let bio = this.props.bio.map((sentence, index) =>
            <p key={index}> {sentence} </p>)
        let pb = this.props.pb.map(this.scores)
        let coaches = this.props.coaches.map((coach, index) =>
<ol key={index}> {coach}</ol>)

        return (
            <div className="about">
                <div className="aboutDetail bio">
                    <p className="profileTitle"> BIOGRAPHY </p>
                    {bio}
                </div>
                <div className="aboutDetail aboutOverview">
                    <p className="profileTitle"> OVERVIEW</p>
             <table> 
                    <tbody className = "profileTable">
                        <tr>
                            <th className = "profileHeader">SEASON'S PROGRAMS</th>
                            <td className = "profileDetail">
                                <div>
                                    <ol> SP: {this.props.current_programs[0]}</ol>
                                    <ol> FS: {this.props.current_programs[1]}</ol>
                                </div>
                            </td>
                        </tr>
                        <tr >
                            <th className = "profileHeader">PERSONAL BESTS</th>
                            <td className = "profileDetail">
                                {pb}
                                </td>
                        </tr>
                        <tr>
                            <th className = "profileHeader">COACHES</th>
                            <td className = "profileDetail">{coaches}</td>
                        </tr>
                    </tbody>
                    </table>
                   
                </div>
            </div>
        )
    }
}