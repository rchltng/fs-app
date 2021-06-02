import React, { Component } from 'react';
import data from "../data/skaters.json";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.medalCount = this.medalCount.bind(this);
        this.linkPerson = this.linkPerson.bind(this);
        this.state = {
            bio: [],
            skating_club: [],
            coaches: [],
            choreographers: [],
            pb: [],
            medal_count: [],
            partner: []
            // current_programs: [],
        }
    }

    componentWillMount() {
        if (data.athletes[this.props.index].hasOwnProperty("medal count")) {
            this.setState({
                medal_count: data.athletes[this.props.index]["medal count"]
            })
        }

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
            this.setState({
                choreographers: data.athletes[this.props.index]["Choreographer"]
            })
        } else if (data.athletes[this.props.index].hasOwnProperty("Former choreographer")) {
            this.setState({
                choreographers: data.athletes[this.props.index]["Former choreographer"]
            })
        } 
        
        if (data.athletes[this.props.index].hasOwnProperty("partner")) {
            if(Array.isArray(data.athletes[this.props.index]["partner"])){
                this.setState({
                    partner: data.athletes[this.props.index]["partner"]
                })
            }else{
                this.setState({
                    partner: [data.athletes[this.props.index]["partner"]]
                })
            }
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

    medalCount() {
        return this.state.medal_count.length !== 0 ? <tr>
            <th className="profileHeader"> MEDAL COUNT </th>
            <td className="profileDetail">
                <ol className="medalDetail">
                    <div className="medal gold">  {this.state.medal_count[0]}
                    </div>
                    <div className="medal silver">  {this.state.medal_count[1]}
                    </div>
                    <div className="medal bronze">  {this.state.medal_count[2]}
                    </div>
                </ol>
            </td>
        </tr> : null
    }

    linkPerson(person, index){
        var exist = data.athletes.findIndex(i => i.athlete === person);
        if(exist === -1){
            return <ol key={index}> {person}</ol>
        }else{
            return <ol className = "personLink" key={index} onClick={()=>{window.location.replace(person)}}> {person}</ol>
        }
    }

    render() {
        let medal_count = this.medalCount()
        let bio = (this.state.bio.length !== 0) ? <div className="aboutDetail bio">
            <p className="profileTitle"> BIOGRAPHY </p>
            {this.state.bio.map((sentence, index) =>
                <p key={index}> {sentence} </p>)}
        </div> : null

        let pb = (this.state.pb.length !== 0) ? <tr>
            <th className="profileHeader">PERSONAL BESTS</th>
            <td className="profileDetail">
                {this.state.pb.map(this.scores)}
            </td>
        </tr> : null

        let partner = (this.state.partner.length !== 0) ?<tr> 
        {(this.state.partner.length === 1) ?<th className="profileHeader">PARTNER</th> : <th className="profileHeader">PARTNERS</th>}
                    <td className="profileDetail">
                        {this.state.partner.map((p, index) =>
                        <ol className = "personLink" onClick={()=>{window.location.replace(p)}}key={index}>{p}</ol>)}
                    </td>
                </tr>
            : null

        let coaches = (this.state.coaches.length !== 0) ? <tr>
              {(this.state.coaches.length === 1) ?<th className="profileHeader">COACH</th> : <th className="profileHeader">COACHES</th>}
            <td className="profileDetail">{this.state.coaches.map(this.linkPerson)}</td>
        </tr> : null

        let choreographers = (this.state.choreographers.length !== 0) ? <tr>
             {(this.state.choreographers.length === 1) ?<th className="profileHeader">CHOREOGRAPHER</th> : <th className="profileHeader">CHOREOGRAPHERS</th>}
            <td className="profileDetail">{this.state.choreographers.map(this.linkPerson)}</td>
        </tr> : null

        let skating_club = (this.state.skating_club.length !== 0) ? <tr className="profileHeader">
               {(this.state.skating_club.length === 1) ?<th className="profileHeader">SKATING CLUBS</th> : <th className="profileHeader">SKATING CLUB</th>}
            <td className="profileDetail">
                {this.state.skating_club.map((club, index) =>
                <ol key={index}> {club}</ol>)}</td>
        </tr> : null

        return (
            <div className="tab">
                {bio}
                <div className="aboutDetail aboutOverview">
                    <p className="profileTitle"> OVERVIEW</p>
                    <table>
                        <tbody className="profileTable">
                            {medal_count}
                            {pb}
                            {skating_club}
                            {partner}
                            {coaches}
                            {choreographers}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}