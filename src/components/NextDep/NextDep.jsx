import React, { Component } from 'react';
import './NextDep.css';
import GeoLocate from '../GeoLocate/GeoLocate';
import StationStops from '../StationStops/StationStops';
import Spinner from '../Spinner/Spinner';

class NextDep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nearByStops: []
        };

        this.getInnerRef = this.getInnerRef.bind(this);
        this.currentPosition = this.currentPosition.bind(this);
        this.onPositionError = this.onPositionError.bind(this);
    }

    onPositionError(error) {
        console.log('onPositionError', error);
    }

    getInnerRef(ref) {
        this.innerRef = ref;
    }

    currentPosition(location) {
        this.setState({
            location
        });
    }

    render() {
        const { location } = this.state;
        return (
            <div className="NextDep">
                {!location ? (
                    <Spinner />
                ) : (
                    <StationStops
                        variables={{
                            lat: location.coords.latitude,
                            lon: location.coords.longitude
                        }}
                        location={location}
                    />
                )}
                <GeoLocate
                    onSuccess={this.currentPosition}
                    onError={this.onPositionError}
                    ref={this.getInnerRef}
                />
            </div>
        );
    }
}

export default NextDep;
