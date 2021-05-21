import React, { Component } from 'react';
import Flag from 'react-world-flags'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

export default class Skater extends Component {

    componentDidMount() {
        let data = require("../data/data.json");
        var index = data.athletes.findIndex(i => i.athlete === this.props.match.params.skater);
        this.setState({
            name: data.athletes[index].athlete,
            representing: data.athletes[index].representing,
            discipline: data.athletes[index].discipline,
            coaches: data.athletes[index].coaches,
            standing: data.athletes[index].standing,
            pb: data.athletes[index].pb,
            current_programs: data.athletes[index].current_programs,
            season_results: data.athletes[index].season_results,
        });
    }

    render() {

        return (
            <div>
                <Flag className="flag" code="JP" />

                <p>{this.props.match.params.skater}</p>

                <Tabs transition={false} defaultActiveKey="profile" id="skaterDetail">
                    <Tab eventKey="profile" title="PROFILE">
                        {/* <Sonnet /> */}
                    </Tab>
                    <Tab eventKey="achievements" title="ACHIEVEMENTS">
                        {/* <Sonnet /> */}
                    </Tab>
                    <Tab eventKey="competition record" title="COMPETITION RECORD">
                        {/* <Sonnet /> */}
                    </Tab>
                    <Tab eventKey="programs" title="PROGRAMS">
                        {/* <Sonnet /> */}
                    </Tab>
                </Tabs>
            </div>


        )
    }
}