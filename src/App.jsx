import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NextDep from './components/NextDep/NextDep';
import Stop from './components/Stop/Stop';
import Departures from './components/Departures/Departures';
import './App.css';

const App = () => (
    <Router>
        <div>
            <Route exact path="/" component={NextDep} />
            <Route
                exact
                path="/stops/:stopId"
                component={props => (
                    <Stop
                        {...props}
                        variables={{
                            stopId: props.match.params.stopId
                        }}
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
);

export default App;
