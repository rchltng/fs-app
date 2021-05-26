import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default class Discipline extends Component {
    constructor(props) {

        super(props);
        this.state = {
            discipline: '',
            overview: [],
            sp_elements: [],
            fs_elements: [],
            records: [],
            super_slam: []
        }
    }

    componentDidMount() {
        let data = require("../data/data.json");
        var index = data.disciplines.findIndex(i => i.discipline === this.props.discipline);
        this.setState({
            discipline: data.disciplines[index].discipline,
            overview: data.disciplines[index].overview,
            sp_elements: data.disciplines[index].sp_elements,
            fs_elements: data.disciplines[index].fs_elements,
            records: data.disciplines[index].records,
            super_slam: data.disciplines[index].super_slam,
        });

    }

    programElements(element, index) {
        if (Array.isArray(element)) {
            let element_detail = element.map((detail, index) =>
                <li key = {index}>{detail}</li>
            )
            return <ul key = {index}>{element_detail}</ul>
        } else {
            return <li key={index}>{element}</li>
        }
    }

    recordTable(record, index) {
        let record_detail = record.map((detail, index) =>
            <td key = {index}>{detail}</td>)
        return <tr key = {index}>{record_detail}</tr>
    }

    render() {
        let overview = this.state.overview.map((sentence, index) =>
            <p key={index}> {sentence} </p>)

        let sp_elements = this.state.sp_elements.map(this.programElements);
        let fs_elements = this.state.fs_elements.map(this.programElements);

        let records =
            <table className="table">
                <thead className="head">
                    <tr>
                        <th scope="col">component</th>
                        <th scope="col">score</th>
                        <th scope="col">skater</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.records.map(this.recordTable)}
                </tbody>
            </table>

        let super_slam = 
        <table className="table">
        <thead className="head">
            <tr>
                <th scope="col">skater</th>
                <th scope="col">year achieved</th>
            </tr>
        </thead>
        <tbody>
            {this.state.super_slam.map(this.recordTable)}
        </tbody>
    </table>

        return (
            <React.Fragment>
                <div className="disciplineTitle">
                    {this.state.discipline.charAt(0).toUpperCase() + this.state.discipline.slice(1)}
                </div>
                <div className="overview">
                    {overview}
                </div>
                <div className="discContainer">
                    <div className="elements">
                        <div className="element">
                            {this.props.discipline === "ice dance" ? <p className="element-header"> short dance elements</p> :
                                <p className="element-header"> short program elements</p>
                            }
                            <ul>
                                {sp_elements}
                            </ul>
                        </div>

                        <div className="element">
                            {this.props.discipline === "ice dance" ? <p className="element-header"> free dance elements</p> :
                                <p className="element-header"> free skate elements</p>
                            }
                            <ul>
                                {fs_elements}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="attribute">
                    <p className="element-header"> world records</p>
                    {records}
                </div>
<br></br>
                <div className="attribute">
                    <p className="element-header"> super slam </p>
                    <p> Winning all major international competitions during the course of a career is called a "Career Super Grand Slam" or "Super Slam". Major competitions consist of the Olympics, Worlds, 4 Continents/Europeans, Grand Prix Final, Junior Worlds, and Junior Grand Prix Final. The following individuals in this discipline have achieved this feat.</p>
                    {super_slam}
                </div>
            </React.Fragment>
        )
    }
}