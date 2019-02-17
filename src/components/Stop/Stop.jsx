import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import './Stop.css';
import { withQuery } from '../../graphql/graphql';
import TransportIcon from '../Icons/TransportIcon';

class Stop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetailsId: ''
        };
    }

    setActiveId(id) {
        const { showDetailsId } = this.state;

        this.setState({
            showDetailsId: id === showDetailsId ? '' : id
        });
    }

    render() {
        const {
            data: { depBoardFromStop }
        } = this.props;
        const { showDetailsId } = this.state;
        return (
            <div className="bus-stop-wrapper">
                {depBoardFromStop.map(
                    (
                        {
                            endStops,
                            transportNumber,
                            transportCategory,
                            startStop
                        },
                        index
                    ) => (
                        <div key={index} className="bus-stop-card">
                            <div>
                                <TransportIcon category={transportCategory} />
                            </div>
                            <div className="bus-number">{transportNumber} </div>
                            <div className="endstops">
                                {endStops.map(
                                    ({ id, name, connectedStops }) => (
                                        <Fragment>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        this.setActiveId(
                                                            id + transportNumber
                                                        )
                                                    }
                                                    className="direction-button dark"
                                                >
                                                    {name}
                                                </button>
                                                {showDetailsId ===
                                                id + transportNumber
                                                    ? connectedStops.map(
                                                          conStop => (
                                                              <Link
                                                                  to={`${
                                                                      startStop.id
                                                                  }/to/${
                                                                      conStop.id
                                                                  }`}
                                                              >
                                                                  <div className="direction-button">
                                                                      {
                                                                          conStop.name
                                                                      }
                                                                  </div>
                                                              </Link>
                                                          )
                                                      )
                                                    : null}
                                            </div>
                                        </Fragment>
                                    )
                                )}
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
            transportCategory
            transportNumber
            transportName
            endStops {
                name
                id
                connectedStops {
                    id
                    name
                }
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
