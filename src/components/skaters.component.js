import React, { Component } from 'react';
import { Form, Row, Col, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import 'font-awesome/css/font-awesome.min.css';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Skaters extends Component {
    render() {
        return (
            <div>
                <div className="searchSkater">
                    <div>
                        <h2 className="title">find a figure skater</h2>
                    </div>
                    <Form className="form">
                        <Form.Control className="search" type="text" placeholder="&#61442;" onChange={this.handleQuery} />
                    </Form>
                </div>
            </div>
        )
    }
}