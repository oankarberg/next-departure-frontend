import React from 'react';
import { FaBus, FaTrain } from 'react-icons/fa';
import { IoIosTrain } from 'react-icons/io';

const TransportIcon = ({ category, ...props }) => {
    switch (category) {
        case 'BUS':
            return <FaBus />;
        case 'SUBWAY':
            return <FaTrain />;
        case 'TRAIN':
            return <IoIosTrain {...props} />;
        default:
            return <FaBus />;
    }
};

export default TransportIcon;
