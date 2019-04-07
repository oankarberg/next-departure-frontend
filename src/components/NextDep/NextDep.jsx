import React, { Component } from 'react';
import './NextDep.css';
import GeoLocate from '../GeoLocate/GeoLocate';
import { NearStops, SearchStops } from '../StationStops/StationStops';
import SearchBar from '../SearchBar/SearchBar';

class NextDep extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nearByStops: [],
            input: ''
        };

        this.getInnerRef = this.getInnerRef.bind(this);
        this.currentPosition = this.currentPosition.bind(this);
        this.onPositionError = this.onPositionError.bind(this);
        this.makeNewSearch = this.makeNewSearch.bind(this);
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

    makeNewSearch(input) {
        this.setState({ input });
    }

    render() {
        const { location, input } = this.state;
        return (
            <div className="NextDep">
                <SearchBar onChange={this.makeNewSearch} />
                {input === '' ? null : (
                    <SearchStops
                        name={input}
                        lon={location ? location.coords.longitude : null}
                        lat={location ? location.coords.latitude : null}
                    />
                )}

                {location ? (
                    <NearStops
                        loaderText="Söker efter hållplatser i närheten"
                        title={<h3> Hållplatser i närheten</h3>}
                        lon={location.coords.longitude}
                        lat={location.coords.latitude}
                        location={location}
                    />
                ) : null}
                {!location ? (
                    <GeoLocate
                        onSuccess={this.currentPosition}
                        onError={this.onPositionError}
                        ref={this.getInnerRef}
                    />
                ) : null}
            </div>
        );
    }
}

export default NextDep;
