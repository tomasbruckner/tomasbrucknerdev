import React from 'react';
import AboutMe from '../AboutMe';
import renderer from 'react-test-renderer';

it('AboutMe renders correctly', () => {
  const tree = renderer.create(<AboutMe />).toJSON();
  expect(tree).toMatchSnapshot();
});
