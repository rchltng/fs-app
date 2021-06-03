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
            super_slam: [],
            src: ''
        }
    }

    componentWillMount() {
        let data = require("../data/data.json");
        var index = data.disciplines.findIndex(i => i.discipline === this.props.discipline);
        this.setState({
            discipline: data.disciplines[index].discipline,
            overview: data.disciplines[index].overview,
            sp_elements: data.disciplines[index].sp_elements,
            fs_elements: data.disciplines[index].fs_elements,
            records: data.disciplines[index].records,
            super_slam: data.disciplines[index].super_slam,
            src: data.disciplines[index].video
        });

    }

    programElements(element, index) {
        if (Array.isArray(element)) {
            let element_detail = element.map((detail, index) =>
                <li key={index}>{detail}</li>
            )
            return <ul key={index}>{element_detail}</ul>
        } else {
            return <li key={index}>{element}</li>
        }
    }

    recordTable(record, index) {
        let link
        let record_detail = record.map(function (detail, index) {
            if (index === 2) {
                let detailLink = detail.split('/')
                link = "skaters/" + detailLink[0];
            }
            return <td className = "records" key={index}>{detail}</td>
        })

        return <tr className="superSlam" onClick={() => window.location.replace(link)} key={index}>{record_detail}</tr>
    }

    recordSlam(record, index) {
        let link
        let record_detail = record.map(function (detail, index) {
            if (index === 0) {
                link = "skaters/" + detail;
            }

            return <td className = "records" key={index}>{detail}</td>
        })

        return <tr className="superSlam" onClick={() => window.location.replace(link)} key={index}>{record_detail}</tr>
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
                        <th className = "discTH" scope="col">COMPONENT</th>
                        <th className = "discTH" scope="col">SCORE</th>
                        <th className = "discTH" scope="col">SKATER</th>
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
                        <th className = "discTH" scope="col">SKATER</th>
                        <th className = "discTH" scope="col">YEAR ACHIEVED</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.super_slam.map(this.recordSlam)}
                </tbody>
            </table>

        let title = this.state.discipline.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1) + " ");

        return (
            <React.Fragment>
                <div className="disciplineTitle">
                    {title}
                </div>
                <div className="overview">
                    {overview}
                </div>
                <div className = "disciplineVid">
                    <iframe title="video" frameBorder="0" height="100%" width="100%"
                        src={this.state.src}>
                    </iframe>
                </div>
                <div className="discContainer">
                    <div className="elements">
                        <div className="element">
                            {this.props.discipline === "ice dance" ? <p className="element-header"> Short Dance Elements</p> :
                                <p className="element-header"> Short Program Elements</p>
                            }
                            <ul>
                                {sp_elements}
                            </ul>
                        </div>

                        <div className="element">
                            {this.props.discipline === "ice dance" ? <p className="element-header"> Free Dance Elements</p> :
                                <p className="element-header"> Free Skate Elements</p>
                            }
                            <ul>
                                {fs_elements}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="discContainer">
                <div className="element">
                    <p className="element-header"> World Records</p>
                    {records}
                </div>
                <div className="element">
                    <p className="element-header"> Super Slam </p>
                    <p className = "slamDesc"> Winning all major international competitions during the course of a career is called a "Career Super Grand Slam" or "Super Slam". Major competitions consist of the Olympics, Worlds, 4 Continents/Europeans, Grand Prix Final, Junior Worlds, and Junior Grand Prix Final. The following individuals in this discipline have achieved this feat.</p>
                    <br/>
                    {super_slam}
                </div>
                <div className = "line"></div>
                </div> 
            </React.Fragment>
        )
    }
}