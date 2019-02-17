import React, { Component } from 'react';
import Departures from '../Departures/Departures';

class StartToEnd extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { startStopId, endStopId } = this.props;
        return (
            <Departures
                variables={{
                    stopId: startStopId,
                    endStopId
                }}
            />
        );
    }
}

export default StartToEnd;
