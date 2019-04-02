import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import './StationStops.css';
import Spinner from '../Spinner/Spinner';

const StationStops = ({
    loading,
    data: { searchStops },
    title,
    loaderText
}) => (
    <Fragment>
        {!searchStops ? (
            <div>
                <Spinner />
                <div>{loaderText}</div>
            </div>
        ) : (
            <>
                <div>{title}</div>
                <div className="bus-stop-wrapper">
                    {searchStops.map((stop, key) => (
                        <Link
                            to={`stops/${stop.id}`}
                            key={key}
                            className="bus-stop-card"
                        >
                            <div className="ellipsis">{stop.name}</div>
                            <div className="right-text">{stop.dist}</div>
                        </Link>
                    ))}
                </div>
            </>
        )}
    </Fragment>
);

StationStops.propTypes = {
    data: PropTypes.shape({
        nearByStops: PropTypes.array
    }).isRequired
};

const nearByQuery = gql`
    query search($lat: Float!, $lon: Float!) {
        searchStops(lat: $lat, lon: $lon) {
            id
            name
            dist
        }
    }
`;
const searchQuery = gql`
    query search($name: String!, $lat: Float, $lon: Float) {
        searchStops(name: $name, lat: $lat, lon: $lon) {
            id
            name
            dist
        }
    }
`;

const NearStops = graphql(nearByQuery)(StationStops);
const SearchStops = graphql(searchQuery)(StationStops);
export { NearStops, SearchStops };
