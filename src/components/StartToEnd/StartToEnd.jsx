import React, { Fragment, Component } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Departures from '../Departures/Departures';

const POLLING_INTERVALL = 1000 * 60 * 60;
class StartToEnd extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { startStopId, endStopId } = this.props;
        return (
            <Fragment>
                <Departures
                    pollingInterval={POLLING_INTERVALL}
                    variables={{
                        stopId: startStopId,
                        endStopId
                    }}
                />
                <button className="add-departure" type="button">
                    <IoMdAddCircleOutline size={40} />
                </button>
            </Fragment>
        );
    }
}

export default StartToEnd;
