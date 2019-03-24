const dev = {
    API_ENDPOINT: 'http://localhost:8080'
};

const prod = {
    // Undefined API_ENDPOINT in graphql will point to relative path /graphql
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;
module.exports = config;
