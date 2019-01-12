import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import NextDep from './components/NextDep/NextDep';
import Stop from './components/Stop/Stop';
import Departures from './components/Departures/Departures';
import './App.css';
import { GraphQLProvider } from './graphql/graphql';

const client = new ApolloClient({
    uri: 'http://localhost:4000'
});

const App = () => (
    <GraphQLProvider value={client}>
        <Router>
            <div>
                <Route exact path="/" component={NextDep} />
                <Route
                    exact
                    path="/stops/:stopId"
                    component={props => (
                        <Stop
                            {...props}
                            variables={{ stopId: props.match.params.stopId }}
                        />
                    )}
                />
                <Route
                    exact
                    path="/stops/:stopId/to/:endStopId"
                    component={props => (
                        <Departures
                            {...props}
                            variables={{
                                stopId: props.match.params.stopId,
                                endStopId: props.match.params.endStopId
                            }}
                        />
                    )}
                />
            </div>
        </Router>
    </GraphQLProvider>
);

export default App;
