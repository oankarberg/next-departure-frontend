import React, { Component } from 'react';
import { geolocated, geoPropTypes } from 'react-geolocated';

class GeoLocate extends Component {
    componentDidMount() {
        console.log('this.props.coords', this.props);
    }

    render() {
        return !this.props.isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div>Platstjänsten är inte aktiverad</div>
        ) : this.props.coords ? null : (
            <div>Hämtar din plats&hellip; </div>
        );
    }
}

GeoLocate.propTypes = { ...GeoLocate.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(GeoLocate);
