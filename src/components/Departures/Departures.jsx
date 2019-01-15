import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import './Departures.css';
import { withQuery, withRedux } from '../../graphql/graphql';
import Timer from '../Utils/Timer';
import { removePassedStartTime } from '../../redux/actions/simpleAction';

// eslint-disable-next-line
const NUM_DEP = 50;

class Departures extends Component {
    static timeToHHmm(time) {
        const date = new Date(time);
        return date.toLocaleTimeString().slice(0, -3);
    }

    constructor(props) {
        super(props);
        this.state = {
            // journeyFromTo: {
            //     departures: []
            // },
            differentDepartures: [1]
        };
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    // filterListFromPassed()
    simpleAction = event => {
        console.log('evet ', this.props);
        this.props.removePassedStartTime();
    };

    render() {
        const { differentDepartures } = this.state;
        const { journeyFromTo } = this.props.reduxData;
        console.log('JSON.stringify(this.props)', journeyFromTo);
        return (
            <div className="departures-wrapper">
                <button
                    type="button"
                    style={{ color: 'white' }}
                    onClick={this.simpleAction}
                >
                    Trigger
                </button>
                {
                    <div className="departure-column">
                        {differentDepartures.map((_, key) => (
                            <div key={key} className="bus-stop-wrapper">
                                <h3 className="direction-header">
                                    {journeyFromTo.direction}
                                </h3>
                                {journeyFromTo.departures.map(
                                    (
                                        { transportName, startTime, direction },
                                        key
                                    ) => (
                                        <div
                                            key={startTime}
                                            className="bus-stop-card"
                                        >
                                            <div>
                                                {transportName} mot {direction}
                                            </div>
                                            <Timer
                                                // onEnded={
                                                //     this.filterListFromPassed
                                                // }
                                                startTime={startTime}
                                            />
                                            <div>
                                                {Departures.timeToHHmm(
                                                    startTime
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                }
                <button className="add-departure" type="button">
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

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = {
    removePassedStartTime
};

Departures.propTypes = {
    // location: PropTypes.objectOf(PropTypes.any),
    // match: PropTypes.object,
    // data: PropTypes.object
};
export default withRedux(
    Departures,
    query,
    variables,
    mapStateToProps,
    mapDispatchToProps
);
// const DepartureWithQuery = withQuery(Departures, query, variables);
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(DepartureWithQuery);
