const dev = {
    API_ENDPOINT: 'http://localhost:8080'
};

const prod = {
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;
module.exports = config;
