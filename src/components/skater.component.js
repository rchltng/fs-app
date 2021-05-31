import React, { Component } from 'react';
import Flag from 'react-world-flags'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import data from "../data/skaters.json";
import Profile from "./profile.components"
import Achievements from "./achievements.component"
import Competitions from "./competitions.component"

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
            standing: [],
        }
    }

    componentWillMount() {
        var index = data.athletes.findIndex(i => i.athlete === this.props.match.params.skater);
        this.setState({
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
            standing: data.athletes[index].standing,
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
        let rank
        if(this.state.discipline == "men's singles"){
            rank = this.state.index
        }else if(this.state.discipline == "ladies' singles"){
            rank = this.state.index % 94
        }else{
            console.log("?? HELLO")
            rank = Math.floor((this.state.index % 186)/2)
            console.log(this.state.athlete + " " + rank)
        }
        return <div>
            <p className="standingHeader">WORLD STANDING </p>
            <p className="standingNum"> #{rank + 1}</p>
        </div>
    }

    getThird() {
        console.log("retire " + this.state.retired)
        console.log("skating since" + this.skating_since)
        if (typeof this.state.retired !== 'undefined') {
            return <div className="blurbDetail skatingSince">
                <p className="blurbTitle"> RETIRED </p>
                <p> {this.state.retired}</p>
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

    render() {
        let name = this.getName(this.state.name);
        let standing = this.getStanding();
        let thirdDiv = this.getThird();

        return (
            <div className="skaterDetail">

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

                <div className="skaterInfo">
                    <Tabs transition={false} defaultActiveKey="profile" id="skaterTabs">
                        <Tab className="tab" eventKey="profile" title="PROFILE">
                            <Profile
                                index={this.state.index}
                            />
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
            </div>


        )
    }
}