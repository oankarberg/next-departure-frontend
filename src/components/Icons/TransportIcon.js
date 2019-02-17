import React from 'react';
import { FaBus, FaTrain } from 'react-icons/fa';

const TransportIcon = ({ category }) => {
    switch (category) {
        case 'BUS':
            return <FaBus />;
        case 'SUBWAY':
            return <FaTrain />;
        default:
            return <FaBus />;
    }
};

export default TransportIcon;
