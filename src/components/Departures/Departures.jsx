import React, { Component } from 'react';
import gql from 'graphql-tag';
import { FaLongArrowAltRight } from 'react-icons/fa';
import './Departures.css';
import { withQueryRedux } from '../../graphql/graphql';
import Timer from '../Utils/Timer';
import { removePassedStartTime } from '../../redux/actions/simpleAction';
import TransportIcon from '../Icons/TransportIcon';

// eslint-disable-next-line
const NUM_DEP = 50;

class Departures extends Component {
    static timeToHHmm(time) {
        const date = new Date(time);
        return date.toLocaleTimeString().slice(0, -3);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        const {
            removePassedStartTime: removeFromList,
            data: { journeyFromTo }
        } = this.props;
        return (
            <div className="departures-wrapper">
                {
                    <div className="departure-column">
                        {
                            <div className="bus-stop-wrapper">
                                <div className="direction-header">
                                    <div>{journeyFromTo.startStop.name}</div>
                                    <div>
                                        <FaLongArrowAltRight />
                                    </div>
                                    <div>{journeyFromTo.endStop.name}</div>
                                </div>
                                {journeyFromTo.departures.map(
                                    ({
                                        transportCategory,
                                        transportNumber,
                                        startTime
                                    }) => (
                                        <div
                                            key={startTime}
                                            className="bus-stop-card"
                                        >
                                            <div className="flex row">
                                                <div>
                                                    <TransportIcon
                                                        category={
                                                            transportCategory
                                                        }
                                                    />
                                                </div>
                                                <div className="bus-number">
                                                    {transportNumber}
                                                </div>
                                            </div>
                                            <Timer
                                                onEnded={removeFromList}
                                                startTime={startTime}
                                            />
                                            <div className="right-text">
                                                {Departures.timeToHHmm(
                                                    startTime
                                                )}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        }
                    </div>
                }
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
export default withQueryRedux(
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
