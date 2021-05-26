import React, { Component } from 'react';

export default class Competitions extends Component {
    constructor(props) {
        super(props);
        this.competitionsList = this.competitionsList.bind(this);
        this.seasonsList = this.seasonsList.bind(this);
    }

    competitionsList(competitions, index) {
        let competitions_detail = competitions.map((detail, index) =>
            <td key={index}>{detail}</td>)
        return <tr key={index}>{competitions_detail}</tr>
    }

   seasonsList(season, index) {
        let seasonYear = season.season;
        let competitions = season.competitions.map(this.competitionsList);
        return <div key={index} className="achievement">
            <p className="achievementTitle"> {seasonYear}</p>
            <table className="table achievements">
                <thead >
                    <tr>
                        <th scope="col">event</th>
                        <th scope="col">sp</th>
                        <th scope="col">fs</th>
                        <th scope="col">total</th>
                        <th scope="col">rank</th>
                    </tr>
                </thead>
                <tbody>
                    {competitions}
                </tbody>
            </table>
        </div>

    }

    render() {
        let competitions = this.props.competitions.map(this.seasonsList)
        return (
            <div className="tab achievementTab">
                {competitions}

            </div>
        )
    }
}