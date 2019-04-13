const dev = {
    API_ENDPOINT: 'http://localhost:8080',
    WS_ENDPOINT: 'ws://localhost:8080/ws'
};

const prod = {
    // Undefined API_ENDPOINT in graphql will point to relative path /graphql
    API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT,
    WS_ENDPOINT: `wss://aldrigsen.se/ws` // process.env.REACT_APP_WS_ENDPOINT
};

const config = process.env.NODE_ENV === 'production' ? prod : dev;
module.exports = config;
