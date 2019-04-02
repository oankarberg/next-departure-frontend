/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import { geolocated, geoPropTypes } from 'react-geolocated';
import Spinner from '../Spinner/Spinner';
import './GeoLocate.css';

class GeoLocate extends Component {
    componentDidMount() {}

    renderInfo() {
        const {
            isGeolocationAvailable,
            isGeolocationEnabled,
            coords
        } = this.props;
        return !isGeolocationAvailable ? (
            <div>Your browser does not support Geolocation</div>
        ) : !isGeolocationEnabled ? (
            <div>
                Platstjänsten är inte aktiverad, gå till inställningar och
                tillåt platstjänster för att se hållplatser i närheten.
            </div>
        ) : coords ? null : (
            <Fragment>
                <Spinner />
                <div>Hämtar din plats&hellip; </div>
            </Fragment>
        );
    }

    render() {
        return <div className="geolocate">{this.renderInfo()}</div>;
    }
}

GeoLocate.propTypes = { ...GeoLocate.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(GeoLocate);
