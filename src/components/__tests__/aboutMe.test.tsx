jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (text: string) => text,
  }),
}));

import React from 'react';
import AboutMe from 'components/AboutMe';
import renderer from 'react-test-renderer';

it('AboutMe renders correctly', () => {
  const tree = renderer.create(<AboutMe />).toJSON();
  expect(tree).toMatchSnapshot();
});
