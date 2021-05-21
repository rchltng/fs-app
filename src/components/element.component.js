import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { Link } from "react-router-dom"; 

export default class Element extends Component {
    constructor(props) {

        super(props);
        this.state = {
            element: '',
            required: [],
            summary: [],

        }
    }

    componentDidMount() {
        let data = require("../data/data.json");
        var index = data.elements.findIndex(i => i.element === this.props.element);
        this.setState({
            element: data.elements[index].element,
            required: data.elements[index].required,
            summary: data.elements[index].summary
        });
    }

    link(discipline, index){
        let link = "disciplines/#" + discipline;
        return <Link key = {index} onClick={() => window.location.replace(link)} to={"disciplines/#" + discipline} className="require"> {discipline} </Link>
    }

    render() {
        let summary = this.state.summary.map((sentence, index) =>
            <p key={index}> {sentence} </p>)
        let required = this.state.required.map(this.link);


        return (
            <div className="discipline">
                <div className="elementTitle">
                    {this.state.element}
                </div>
                {this.state.element !== "anatomy of a figure skate" ?
                    <div className="required">
                        required for: {required}
                    </div> : null
                }
                
                <div className="overview">
                    {summary}
                </div>
            </div>
        )
    }
}