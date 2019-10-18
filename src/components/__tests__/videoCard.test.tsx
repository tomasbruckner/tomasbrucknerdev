import React from 'react';
import VideoCard from '../VideoCard';
import renderer from 'react-test-renderer';

it('VideoCard renders correctly', () => {
  const tree = renderer
    .create(<VideoCard videoHeadline="testVideoHeadline" videoUrl="testVideoUrl" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
