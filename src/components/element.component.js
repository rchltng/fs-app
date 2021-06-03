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
            img: ''

        }
    }

    componentWillMount() {
        let data = require("../data/data.json");
        var index = data.elements.findIndex(i => i.element === this.props.element);
        this.setState({
            element: data.elements[index].element,
            required: data.elements[index].required,
            summary: data.elements[index].summary,
            img: data.elements[index].img
        });
    }

    link(discipline, index) {
        let link = "disciplines/#" + discipline;
        return <Link key={index} onClick={() => window.location.replace(link)} to={"disciplines/#" + discipline} className="require"> {discipline} </Link>
    }

    render() {
        let summary = this.state.summary.map((sentence, index) =>
            <p key={index}> {sentence} </p>)
        let required = this.state.required.map(this.link);
        let img;
        // console.log(this.state.element)
        // console.log(this.state.img)
        // {this.state.element === "Jumps" ?
        // img = this.state.img.split(',') : img = this.state.img }

        return (

            this.state.element === "Anatomy of a Figure Skate" ?
                <div className="discipline">
                    <div className="elementTitle">
                        {this.state.element}
                    </div>
                    <div className="overview">
                        {summary}
                    </div>
                </div> :
                <div className="discipline">
                    <div className="elementTitle">
                        {this.state.element}
                    </div>
                    <div className="required">
                        required for: {required}
                    </div>

                    {this.state.element === "Jumps" ?
                    <div className="elementDescription jumpDesc">
                                <div className="jumps">
                                    <img className="jump" src={this.state.img[0]}></img>
                                    <img className="jump" src={this.state.img[1]}></img>
                                </div>
                                <div className="overview jumpGif">
                                    {summary}
                                </div>
                                </div> 

                            :  <div className="elementDescription">
                                <img className="elementGif" src={this.state.img}></img>


                    <div className="overview gif">
                                    {summary}
                                </div>
                                </div>  }
                                </div>

                 
        )
    }
}