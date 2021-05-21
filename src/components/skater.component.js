import React, { Component } from 'react';

export default class Skater extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <h1>{this.props.match.params.skater}</h1>
        )
    }
}