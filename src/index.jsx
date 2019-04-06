import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import './index.css';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { GraphQLProvider } from './graphql/graphql';
import configureStore from './redux/store/store';
import { API_ENDPOINT, WS_ENDPOINT } from './config';

// Create an http link:
const httpLink = new HttpLink({
    uri: API_ENDPOINT
});
console.log('API_ENDPOINT', API_ENDPOINT);
// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: WS_ENDPOINT,
    options: {
        reconnect: true
    }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const customLink = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        customLink
    ]),

    cache: new InMemoryCache()
});
ReactDOM.render(
    <GraphQLProvider value={client}>
        <Provider store={configureStore()}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Provider>
    </GraphQLProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
