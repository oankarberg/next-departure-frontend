import React from 'react';
import ReactDOM from 'react-dom';
import GeoLocate from './GeoLocate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GeoLocate />, div);
  ReactDOM.unmountComponentAtNode(div);
});
