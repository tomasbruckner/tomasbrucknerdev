import React from 'react';
import Navigation from '../Navigation';
import renderer from 'react-test-renderer';

it('Navigation renders correctly', () => {
  const tree = renderer
    .create(
      <div>
        <Navigation />
      </div>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
