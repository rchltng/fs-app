import React, { Component } from 'react';

export default class Competitions extends Component {
    constructor(props) {
        super(props);
        this.competitionsList = this.competitionsList.bind(this);
        this.seasonsList = this.seasonsList.bind(this);
    }

    competitionsList(competitions, index) {
        let competitions_detail = competitions.map((detail, index) =>
            <td key={index}>{detail}</td>
        )
        return <tr key={index}>{competitions_detail}</tr>
    }

   seasonsList(season, index) {
        let seasonYear = season.season;
        let competitions = season.competitions.map(this.competitionsList);
        return <div key={index} className="achievement">
            <p className="achievementTitle"> {seasonYear} season</p>
            <table className="table achievements">
                <thead >
                    <tr>
                        <th scope="col">EVENT</th>
                        <th scope="col">SP</th>
                        <th scope="col">FS</th>
                        <th scope="col">TOTAL</th>
                        <th scope="col">RANK</th>
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