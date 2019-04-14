import React, { Component } from 'react';

import Map from 'pigeon-maps';

import Cluster from 'pigeon-cluster';
import Overlay from 'pigeon-overlay';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import TransportIcon from '../Icons/TransportIcon';
import './Map.css';

const TRAIN_SUB = gql`
    subscription($trainId: String) {
        trainEvent(trainId: $trainId) {
            publicTrainNumbers
            internalTrainNumbers
            timestamp
            id
            lon
            lat
            speedKmH
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
            height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    static getDerivedStateFromProps(props, state) {
        const {
            data: { loading, subscribeToMore },
            match: {
                params: { trainId = null }
            }
        } = props;

        if (!loading && !state.subscription) {
            const subscription = subscribeToMore({
                document: TRAIN_SUB,
                variables: { trainId },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newTrain = subscriptionData.data.trainEvent;
                    const exists = prev.trains.find(
                        train => train.id === newTrain.id
                    );

                    // Apollo magic takes care of this update by using ID field
                    if (exists) return prev;

                    return Object.assign({}, prev, {
                        trains: [newTrain, ...prev.trains]
                    });
                }
            });
            return { subscription };
        }
        return null;
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
            data: { loading, trains },
            match: {
                params: { trainId = null }
            }
        } = this.props;
        let latCenter = 64.594865;
        let lonCenter = 18.668707;
        if (trains && trains.length > 0 && trainId) {
            latCenter = trains[0].lat;
            lonCenter = trains[0].lon;
        }
        return (
            <div style={{ height: `${height}px` }}>
                <Map
                    // center={[64.594865, 18.668707]}
                    center={[latCenter, lonCenter]}
                    minZoom={4}
                    maxZoom={14}
                    defaultZoom={trainId ? 10 : 6}
                    // onBoundsChanged={({ center, zoom, bounds, initial }) => {
                    //     console.log('center ', center);
                    // }}
                >
                    {/* <Cluster offset={[20, 20]} clusterMarkerRadius={10}> */}
                    {!loading && trains
                        ? trains.map(({ lat, lon, id, speedKmH }) => (
                              <Overlay
                                  key={id}
                                  anchor={[lat, lon]}
                                  payload={id}
                                  offset={[22.5, 30]}
                                  style={{ color: 'black' }}
                                  className="train-overlay"
                              >
                                  {id}
                                  <div
                                      onClick={({ event, anchor, payload }) => {
                                          //   console.log('trainId ', id);
                                      }}
                                  >
                                      <TransportIcon
                                          size="40px"
                                          color="black"
                                          category="TRAIN"
                                      />
                                  </div>
                                  {speedKmH === 0 ? '' : `${speedKmH} km/h`}
                              </Overlay>
                          ))
                        : []}
                    {/* </Cluster> */}
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
            speedKmH
            trackTrue
            variation
            trainId
        }
    }
`;

export default graphql(trainQuery)(CustomMap);
