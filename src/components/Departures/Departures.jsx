import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoMdAddCircleOutline } from 'react-icons/io';
import gql from 'graphql-tag';
import './Departures.css';
import { withQuery } from '../../graphql/graphql';
// eslint-disable-next-line
const NUM_DEP = 50;

class Departures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // journeyFromTo: {
            //     departures: []
            // },
            differentDepartures: [1]
        };
    }

    // updateTimeLeft() {
    //     const { journeyFromTo } = this.state;
    //     this.setState({
    //         journeyFromTo: {
    //             ...journeyFromTo,
    //             departures: this.calculateTimeLeft(journeyFromTo.departures)
    //         }
    //     });
    // }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    timeToHHmm(time) {
        const date = new Date(time);
        return date.toLocaleTimeString();
    }

    render() {
        const { differentDepartures } = this.state;
        const { journeyFromTo } = this.props.data;
        return (
            <div className="departures-wrapper">
                {
                    <div className="departure-column">
                        {differentDepartures.map((_, key) => (
                            <div key={key} className="bus-stop-wrapper">
                                <h3 className="direction-header">
                                    {journeyFromTo.direction}
                                </h3>
                                {journeyFromTo.departures
                                    .slice(0, NUM_DEP)
                                    .map(
                                        (
                                            {
                                                transportName,
                                                timeLeft,
                                                startTime,
                                                direction
                                            },
                                            key
                                        ) => (
                                            <div
                                                key={key}
                                                className="bus-stop-card"
                                            >
                                                <div>
                                                    {transportName} mot{' '}
                                                    {direction}
                                                </div>
                                                <div>{timeLeft}</div>
                                                <div>
                                                    {this.timeToHHmm(startTime)}
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                        ))}
                    </div>
                }
                <button className="add-departure">
                    <IoMdAddCircleOutline size={40} />
                </button>
            </div>
        );
    }
}

const query = gql`
    query journeyFromTo($stopId: String!, $endStopId: String!) {
        journeyFromTo(stopId: $stopId, endStopId: $endStopId) {
            startStop {
                name
                id
            }
            departures {
                transportNumber
                transportName
                direction
                startTime
            }
            direction
            endStop {
                name
                id
            }
        }
    }
`;

const variables = {
    stopId: '124',
    endStopId: '12412'
};

Departures.propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
    data: PropTypes.object
};

export default withQuery(Departures, query, variables);
