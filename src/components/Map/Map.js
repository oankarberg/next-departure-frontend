import React, { Component } from 'react';

import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import Overlay from 'pigeon-overlay';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import TransportIcon from '../Icons/TransportIcon';

const TRAIN_SUB = gql`
    subscription {
        trainEvent {
            publicTrainNumbers
            internalTrainNumbers
            timestamp
            id
            lon
            lat
            speedKnots
            trainId
            trackTrue
            variation
        }
    }
`;

class CustomMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            trains: [[64.594865, 18.668707], [50.974, 4.6947]]
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        const {
            data: { subscribeToMore }
        } = this.props;
        subscribeToMore({
            document: TRAIN_SUB,
            variables: {},
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newTrain = subscriptionData.data.trainEvent;
                const exists = prev.trains.find(
                    train => train.id === newTrain.id
                );
                // Apollo magic takes care of this update
                if (exists) return prev;

                return Object.assign({}, prev, {
                    trains: [newTrain, ...prev.trains]
                });
            }
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const { height } = this.state;
        const {
            data: { loading, error, trains }
        } = this.props;
        return (
            <div style={{ height: `${height}px` }}>
                <Map center={[64.594865, 18.668707]} zoom={6}>
                    {!loading && trains
                        ? trains.map(({ lat, lon, id }) => (
                              <Overlay
                                  key={id}
                                  anchor={[lat, lon]}
                                  payload={id}
                                  offset={[20, 20]}
                              >
                                  <div
                                      onClick={({ event, anchor, payload }) => {
                                          //   console.log('trainId ', id);
                                      }}
                                      style={{ color: 'black' }}
                                  >
                                      <TransportIcon
                                          size="40px"
                                          color="black"
                                          category="TRAIN"
                                      />
                                      {id}
                                  </div>
                              </Overlay>
                          ))
                        : null}

                    {/* <Overlay anchor={[50.879, 4.6997]} offset={[120, 79]}>
                        <img src="pigeon.jpg" width={240} height={158} alt="" />
                    </Overlay> */}
                </Map>
            </div>
        );
    }
}

const trainQuery = gql`
    query trains {
        trains {
            publicTrainNumbers
            internalTrainNumbers
            timestamp
            lon
            lat
            id
            speedKnots
            trackTrue
            variation
            trainId
        }
    }
`;

export default graphql(trainQuery)(CustomMap);
