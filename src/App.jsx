import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NextDep from './components/NextDep/NextDep';
import Stop from './components/Stop/Stop';

import Map from './components/Map/Map';
import './App.css';
import StartToEnd from './components/StartToEnd/StartToEnd';

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
                    <StartToEnd
                        {...props}
                        startStopId={props.match.params.stopId}
                        endStopId={props.match.params.endStopId}
                    />
                )}
            />
            <Route path={['/trains/:trainId', '/trains']} component={Map} />
        </div>
    </Router>
);

export default App;
