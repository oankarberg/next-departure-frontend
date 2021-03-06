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
            directionAngle
            id
            internalTrainNumbers
            lat
            lon
            publicTrainNumbers
            speedKmH
            timestamp
            trackTrue
            trainId
            variation
        }
    }
`;

function wikimedia(x, y, z) {
    const retina =
        typeof window !== 'undefined' && window.devicePixelRatio >= 2;
    return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${
        retina ? '@2x' : ''
    }.png`;
}
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
            data: { loading, trains = [] },
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
                    minZoom={5}
                    maxZoom={14}
                    provider={
                        // wikimedia,
                        (x, y, z) =>
                            // `https://stamen-tiles.a.ssl.fastly.net/toner/${z}/${x}/${y}.png`
                            // `https://cartodb-basemaps-1.global.ssl.fastly.net/dark_all/${z}/${x}/${y}.png`
                            `https://aldrigsen.se/tiles/transport/${z}/${x}/${y}.png?apikey=b5a4218cba6243559dabec828f4048f3`
                        // `http://a.tiles.openrailwaymap.org/standard/${z}/${x}/${y}.png`
                    }
                    defaultZoom={trainId ? 10 : 6}
                    // onBoundsChanged={({ center, zoom, bounds, initial }) => {
                    //     console.log('center ', center);
                    // }}
                >
                    {/* <Cluster offset={[20, 20]} clusterMarkerRadius={10}> */}
                    {!loading && trains
                        ? trains.map(
                              (
                                  { lat, lon, id, speedKmH, directionAngle },
                                  index
                              ) => (
                                  <Overlay
                                      key={id}
                                      anchor={[lat, lon]}
                                      payload={id}
                                      offset={[35, 28]}
                                      style={{ color: 'black' }}
                                      className="train-overlay"
                                  >
                                      {id}
                                      <div
                                          onClick={({
                                              event,
                                              anchor,
                                              payload
                                          }) => {
                                              //   console.log('trainId ', id);
                                          }}
                                      >
                                          {/* <TransportIcon
                                          size="40px"
                                          color="black"
                                          category="TRAIN"
                                      /> */}
                                          <img
                                              alt="train"
                                              className="train-image"
                                              style={{
                                                  transformOrigin: 'top top',
                                                  transform:
                                                      speedKmH !== 0
                                                          ? `rotate(${directionAngle +
                                                                90}deg)`
                                                          : ''
                                              }}
                                              src="/assets/train.png"
                                          />
                                      </div>
                                      {speedKmH === 0 ? '' : `${speedKmH} km/h`}
                                  </Overlay>
                              )
                          )
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
            directionAngle
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
