import React, { Component } from 'react';

export default class Achievements extends Component {
    constructor(props) {
        super(props);
        this.medalsList = this.medalsList.bind(this);
        this.achievementsList = this.achievementsList.bind(this);
    }

    medalsList(medals, index) {
        let medals_detail = medals.map((detail, index) =>
            <td key={index}>{detail}</td>)
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
                        <th scope="col">medal</th>
                        <th scope="col">event</th>
                        <th scope="col">discipline</th>
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
        )
    }
}