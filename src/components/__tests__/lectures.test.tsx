import React from 'react';
import Lectures from '../Lectures';
import renderer from 'react-test-renderer';

it('Lectures renders correctly', () => {
  const tree = renderer.create(<Lectures />).toJSON();
  expect(tree).toMatchSnapshot();
});
