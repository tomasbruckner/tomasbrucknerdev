jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (text: string) => text,
  }),
}));

import React from 'react';
import VideoCard from 'components/VideoCard';
import renderer from 'react-test-renderer';

it('VideoCard renders correctly', () => {
  const tree = renderer
    .create(<VideoCard videoHeadline="testVideoHeadline" videoUrl="testVideoUrl" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
