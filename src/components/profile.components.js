import React, { Component } from 'react';
import data from "../data/skaters.json";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bio: [],
            skating_club: [],
            coaches: [],
            choreographers: [],
            pb: [],
            // current_programs: [],
        }
    }

    componentWillMount() {

        if (data.athletes[this.props.index].hasOwnProperty("Skating club")) {
            this.setState({
                skating_club: data.athletes[this.props.index]["Skating club"]
            })
        }

        if (data.athletes[this.props.index].hasOwnProperty("Coach")) {
            this.setState({
                coaches: data.athletes[this.props.index]["Coach"]
            })
        } else if (data.athletes[this.props.index].hasOwnProperty("Former coach")) {
            this.setState({
                coaches: data.athletes[this.props.index]["Former coach"]
            })
        }

        if (data.athletes[this.props.index].hasOwnProperty("Choreographer")) {
            console.log("here")
            this.setState({
                choreographers: data.athletes[this.props.index]["Choreographer"]
            })
        } else if (data.athletes[this.props.index].hasOwnProperty("Former choreographer")) {
            this.setState({
                choreographers: data.athletes[this.props.index]["Former choreographer"]
            })
        }

        this.setState({
            bio: data.athletes[this.props.index].bio,
            standing: data.athletes[this.props.index].standing,
            pb: data.athletes[this.props.index].pb
            // current_programs: data.athletes[index].current_programs,
        });
    }

    scores(score, index) {
        return <ol key={index}> {score[0]} : {score[1]}</ol>
    }

    render() {
        let bio = (this.state.bio.length !== 0) ? <div className="aboutDetail bio">
            <p className="profileTitle"> BIOGRAPHY </p>
            {this.state.bio.map((sentence, index) =>
                <p key={index}> {sentence} </p>)}
        </div> : null

        let pb = (this.state.pb.length !== 0) ? <tr >
            <th className="profileHeader">PERSONAL BESTS</th>
            <td className="profileDetail">
                {this.state.pb.map(this.scores)}
            </td>
        </tr> : null

        let coaches = (this.state.coaches.length !== 0) ? <tr>
            <th className="profileHeader">COACHES</th>
            <td className="profileDetail">{this.state.coaches.map((coach, index) =>
                <ol key={index}> {coach}</ol>)}</td>
        </tr> : null

        let choreographers = (this.state.choreographers.length !== 0) ? <tr>
            <th className="profileHeader">CHOREOGRAPHERS</th>
            <td className="profileDetail">{this.state.choreographers.map((choreographer, index) =>
                <ol key={index}> {choreographer}</ol>)}</td>
        </tr> : null

        let skating_club = (this.state.skating_club.length !== 0) ? <tr className="profileHeader">
            <th className="profileHeader">SKATING CLUB</th>
            <td className="profileDetail">
                {this.state.skating_club.map((club, index) =>
                    <ol key={index}> {club}</ol>)} </td>
        </tr> : null

        return (
            <div className="tab">
                {bio}
                <div className="aboutDetail aboutOverview">
                    <p className="profileTitle"> OVERVIEW</p>
                    <table>
                        <tbody className="profileTable">
                            {skating_club}
                            {pb}
                            {coaches}
                            {choreographers}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}