import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import './Stop.css';
import { withQuery } from '../../graphql/graphql';

class Stop extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            data: { depBoardFromStop }
        } = this.props;
        return (
            <div className="bus-stop-wrapper">
                {depBoardFromStop.map(
                    ({ endStops, transportName, startStop }, key) => (
                        <div key={key} className="bus-stop-card">
                            <div>
                                <b>{transportName} </b>
                            </div>
                            <div> Mot</div>
                            <div className="endstops">
                                {endStops.map((dir, key) => (
                                    <Link
                                        key={key}
                                        to={`${startStop.id}/to/${dir.id}`}
                                    >
                                        <div className="direction-button">
                                            {dir.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        );
    }
}

const query = gql`
    query depBoardFromStop($stopId: String!) {
        depBoardFromStop(stopId: $stopId) {
            startStop {
                name
                id
            }
            transportNumber
            transportName
            endStops {
                name
                id
            }
        }
    }
`;

const variables = {
    stopId: '123121'
};

Stop.propTypes = {
    location: PropTypes.object,
    match: PropTypes.object
};

export default withQuery(Stop, query, variables);
