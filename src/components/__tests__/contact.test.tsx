import React from 'react';
import Contact from '../Contact';
import renderer from 'react-test-renderer';

it('Contact renders correctly', () => {
  const tree = renderer.create(<Contact />).toJSON();
  expect(tree).toMatchSnapshot();
});
