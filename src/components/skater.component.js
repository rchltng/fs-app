import React, { Component } from 'react';
import Flag from 'react-world-flags'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import data from "../data/skaters.json";
import Profile from "./profile.components"
import Achievements from "./achievements.component"
import Competitions from "./competitions.component"
import { ArrowLeft } from 'react-bootstrap-icons';

export default class Skater extends Component {
    constructor(props) {
        super(props);
        this.getThird = this.getThird.bind(this);
        this.getName = this.getName.bind(this);
        this.getStanding = this.getStanding.bind(this);
        this.state = {
            index: '',
            name: '',
            age: '',
            dob: '',
            img: '',
            retired: '',
            medals: [],
            competitions: [],
            began_skating: '',
            representing: '',
            code: '',
            discipline: '',
            rank: ''

        }
    }

    componentWillMount() {
        var index = data.athletes.findIndex(i => i.athlete === this.props.match.params.skater);
        this.setState({
            max: data.athletes.length,
            index: index,
            name: data.athletes[index].athlete,
            age: data.athletes[index].age,
            img: data.athletes[index].img,
            dob: data.athletes[index].dob,
            code: data.athletes[index].countryCode,
            retired: data.athletes[index]["retired"],
            medals: data.athletes[index]["medal details"],
            competitions: data.athletes[index].competitions,
            skating_since: data.athletes[index]["Began skating"],
            representing: data.athletes[index].representing,
            discipline: data.athletes[index].discipline,
            rank: data.athletes[index].rank
        });
    }

    getName(name) {
        let nameIndex = name.lastIndexOf(" ");
        let firstName = name.substring(0, nameIndex).toUpperCase();
        let lastName = name.substring(nameIndex + 1).toUpperCase();
        return <div className="name">
            <p className="firstName">{firstName}</p>
            <p className="lastName"> {lastName}</p>
        </div>
    }

    getStanding() {
        return <div>
            <p className="standingHeader">WORLD STANDING </p>
            <p className="standingNum"> #{this.state.rank}</p>
        </div>
    }

    getThird() {
        if (typeof this.state.retired !== 'undefined') {
            return <div className="blurbDetail skatingSince">
                <p className="blurbTitle"> RETIRED </p>
                <p className="retired"> {this.state.retired}</p>
            </div>
        } else if (typeof this.state.skating_since !== 'undefined') {
            return <div className="blurbDetail skatingSince">
                <p className="blurbTitle">SKATING SINCE</p>
                <p> {this.state.skating_since}</p>
            </div>
        } else {
            return null
        }
    }

    backButton() {
      
    }

    render() {
        let name = this.getName(this.state.name);
        let standing = this.getStanding();
        let thirdDiv = this.getThird();
        let prev;
        if (this.state.index > 0) {
            prev = data.athletes[this.state.index - 1].athlete
        }
        let next;
        if (this.state.index < this.state.max - 1) {
            next = data.athletes[this.state.index + 1].athlete
        }
        let backButtonUrl =  window.location.href.slice(0, window.location.href.lastIndexOf("/"));

        return (
            <div className="skaterDetail">
                <ArrowLeft className="backArrow" onClick={ () => window.location.replace(backButtonUrl)} />
                <div className="profile_card">

                    <div className="skaterTop skaterImg">
                        <img src={this.state.img} alt="bio" />
                    </div>
                    <div className="skaterTop skaterBlurb">
                        {name}
                        <div className="representing">
                            <Flag className="flag" code={this.state.code} />
                            <p className="flagName"> {this.state.representing.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="skaterTop space">
                    </div>

                    <div className="skaterTop skaterRank">
                        {standing}
                        {thirdDiv !== null ?
                            <div className="blurb">
                                {typeof this.state.age !== 'undefined' ?
                                    <div className="blurbDetail age">
                                        <p className="blurbTitle"> AGE</p>
                                        <p> {this.state.age}</p>
                                    </div> : null}
                                {typeof this.state.discipline !== 'undefined' ?
                                    <div className="blurbDetail blurbDisc">
                                        <p className="blurbTitle"> DISCIPLINE</p>
                                        <p> {this.state.discipline} </p>
                                    </div> : null}
                                {thirdDiv}
                            </div> :
                            <div className="blurb">
                                {typeof this.state.age !== 'undefined' ?
                                    <div className="blurbTwo age">
                                        <p className="blurbTitle"> AGE</p>
                                        <p> {this.state.age}</p>
                                    </div> : null}
                                {typeof this.state.discipline !== 'undefined' ?
                                    <div className="blurbTwo blurbDisc">
                                        <p className="blurbTitle"> DISCIPLINE</p>
                                        <p> {this.state.discipline} </p>
                                    </div> : null}
                                {thirdDiv}
                            </div>}
                    </div>

                </div>
                <div className="arrows">
                    {this.state.index > 0 ?
                        <div className="arrow-left" onClick={() => window.location.replace(prev)}>
                            <span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span>
                            <p className="suggestedLeft"> {data.athletes[this.state.index - 1].athlete}</p>
                        </div>
                        : null}
                    {this.state.index < this.state.max - 1 ?
                        <div className="arrow-right" onClick={() => window.location.replace(next)}>
                            <p className="suggestedRight"> {data.athletes[this.state.index + 1].athlete}</p>
                            <span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span>

                        </div>
                        : null}
                </div>


                <div className="skaterInfo">
                    <Tabs transition={false} defaultActiveKey="profile" id="skaterTabs">
                        <Tab className="tab" eventKey="profile" title="PROFILE">
                            <Profile
                                index={this.state.index} />
                        </Tab>
                        <Tab className="tab" eventKey="achievements" title="MEDAL COUNT">
                            <Achievements index={this.state.index} achievements={this.state.medals} />
                        </Tab>
                        <Tab className="tab" eventKey="competition record" title="COMPETITION RECORD">
                            <Competitions competitions={this.state.competitions} />
                        </Tab>
                        {/* <Tab className="tab" eventKey="programs" title="PROGRAMS">
                     
                        </Tab> */}
                    </Tabs>
                </div>
            </div >


        )
    }
}