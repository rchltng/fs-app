import React, { Component } from 'react';
import Flag from 'react-world-flags'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import data from "../data/data.json";
import Profile from "./profile.components"
import Achievements from "./achievements.component"

export default class Skater extends Component {

    constructor(props) {
        super(props);
        this.getName = this.getName.bind(this);
        this.state = {
            index:'',
            name: '',
            age: '',
            dob: '',
            img: '',
            bio: [],
            achievements: [],
            began_skating: '',
            skating_club: '',
            representing: '',
            discipline: '',
            coaches: [],
            choreographers: [],
            standing: '',
            pb: [],
            current_programs: [],
            season_results: [],
        }
    }

    componentDidMount() {
        // let data = require("../data/data.json");
        console.log(this.props.match.params.skater)
        var index = data.athletes.findIndex(i => i.athlete === this.props.match.params.skater);
        console.log(index);
        console.log(data.athletes[index].img)

        this.setState({
            index: index,
            name: data.athletes[index].athlete,
            age: data.athletes[index].age,
            img: data.athletes[index].img,
            dob: data.athletes[index].dob,
            bio: data.athletes[index].bio,
            achievements: data.athletes[index].achievements,
            skating_since: data.athletes[index].skating_since,
            representing: data.athletes[index].representing,
            discipline: data.athletes[index].discipline,
            coaches: data.athletes[index].coaches,
            choreographers: data.athletes[index].choreographers,
            skating_club: data.athletes[index].skating_club,
            standing: data.athletes[index].standing,
            pb: data.athletes[index].pb,
            current_programs: data.athletes[index].current_programs,
            season_results: data.athletes[index].season_results,
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

    render() {
        let name = this.getName(this.state.name);
        return (
            <div className="skaterDetail">

                <div className="profile_card">
                    <div className="skaterTop skaterImg">
                        <img src={this.state.img} alt="bio" />
                    </div>
                    <div className="skaterTop skaterBlurb">
                        {name}
                        <div className="representing">
                            <Flag className="flag" code="JP" />
                            <p className="flagName"> {this.state.representing.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="skaterTop space">
                    </div>
                    <div className="skaterTop skaterRank">
                        <div>
                            <p className="standingHeader"> WORLD STANDING</p>
                            <p className="standingNum"> #{this.state.standing}</p>
                        </div>
                        <div className="blurb">
                            <div className="blurbDetail age">
                                <p className="blurbTitle"> AGE</p>
                                <p> {this.state.age}</p>
                            </div>
                            <div className="blurbDetail blurbDisc">
                                <p className="blurbTitle"> DISCIPLINE</p>
                                <p> {this.state.discipline} </p>
                            </div>
                            <div className="blurbDetail skatingSince">
                                <p className="blurbTitle">SKATING SINCE</p>
                                <p> {this.state.skating_since}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="skaterInfo">
                    <Tabs transition={false} defaultActiveKey="profile" id="skaterTabs">
                        <Tab className="tab" eventKey="profile" title="PROFILE">
                            <Profile
                                bio={this.state.bio}
                                coaches={this.state.coaches}
                                choreographers={this.state.choreographers}
                                skating_club = {this.state.skating_club}
                                dob={this.state.dob}
                                pb={this.state.pb}
                                current_programs={this.state.current_programs}
                            />
                        </Tab>
                        <Tab className="tab" eventKey="achievements" title="MEDAL COUNT">
                           <Achievements index={this.state.index} achievements={this.state.achievements}/>
                        </Tab>
                        <Tab className="tab" eventKey="competition record" title="COMPETITION RECORD">
                            {/* <Sonnet /> */}
                        </Tab>
                        <Tab className="tab" eventKey="programs" title="PROGRAMS">
                            {/* <Sonnet /> */}
                        </Tab>
                    </Tabs>
                </div>
            </div>


        )
    }
}