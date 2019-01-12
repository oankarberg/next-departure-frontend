import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import './StationStops.css';
import Spinner from '../Spinner/Spinner';
import { withQuery } from '../../graphql/graphql';

class StationStops extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nearByStops: []
        };
    }

    componentDidMount() {}

    render() {
        const { nearByStops } = this.props.data;
        return (
            <div className="bus-stop-wrapper">
                {!nearByStops ? (
                    <Spinner />
                ) : (
                    nearByStops.map((stop, key) => (
                        <Link
                            to={`stops/${stop.id}`}
                            key={key}
                            className="bus-stop-card"
                        >
                            {stop.name} {stop.dist} m
                        </Link>
                    ))
                )}
            </div>
        );
    }
}

StationStops.propTypes = {
    location: PropTypes.object
};
const query = gql`
    query nearByStops($lat: Float!, $lon: Float!) {
        nearByStops(lat: $lat, lon: $lon) {
            id
            name
            dist
        }
    }
`;
const variables = {
    lat: 12.3,
    lon: 1223.2
};

export default withQuery(StationStops, query, variables);
