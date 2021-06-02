import React, { Component } from 'react';

export default class Achievements extends Component {
    constructor(props) {
        super(props);
        this.medalsList = this.medalsList.bind(this);
        this.achievementsList = this.achievementsList.bind(this);
    }

    medalsList(medals, index) {
        let medals_detail = medals.map(function (detail, index) {
            if (detail === "🥇") {
                return <td className="compTD compDetail" key={index}> <div className="medalTD gold">  G
                </div></td>
            } else if (detail === "🥈") {
                return <td className="compTD compDetail" key={index}> <div className="medalTD silver">  S
                </div></td>
            } else if (detail === "🥉") {
                return <td className="compTD compDetail" key={index}> <div className="medalTD bronze">  B
                </div></td>
            } else {
                return <td className="compTD compDetail" key={index}>{detail.toUpperCase()}</td>
            }
        })
        return <tr key={index}>{medals_detail}</tr>
    }

    achievementsList(achievement, index) {
        let event = achievement.event;
        let medals = achievement.medals.map(this.medalsList);
        return <div key={index} className="achievement">
            <p className="achievementTitle"> {event.toUpperCase()}</p>
            <table className="table achievements">
                <thead >
                    <tr>
                        <th className="compTH" scope="col">MEDAL</th>
                        <th className="compTH" scope="col">SEASON</th>
                        <th className="compTH" scope="col">DISCIPLINE</th>
                    </tr>
                </thead>
                <tbody>
                    {medals}
                </tbody>
            </table>
        </div>

    }

    render() {
        let achievement = this.props.achievements.map(this.achievementsList)
        return (
            <div className="tab achievementTab">
                {achievement}
            </div>
        );
    }
}