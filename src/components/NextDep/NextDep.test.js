import React from 'react';
import ReactDOM from 'react-dom';
import NextDep from './NextDep';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NextDep />, div);
    ReactDOM.unmountComponentAtNode(div);
});
