jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (text: string) => text,
  }),
}));

import React from 'react';
import Contact from 'components/Contact';
import renderer from 'react-test-renderer';

it('Contact renders correctly', () => {
  const tree = renderer.create(<Contact />).toJSON();
  expect(tree).toMatchSnapshot();
});
