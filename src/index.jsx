import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { GraphQLProvider } from './graphql/graphql';
import configureStore from './redux/store/store';

const client = new ApolloClient({
    uri: 'http://localhost:4000'
});

ReactDOM.render(
    <GraphQLProvider value={client}>
        <Provider store={configureStore()}>
            <App />
        </Provider>
    </GraphQLProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
