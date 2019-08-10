jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (text: string) => text,
  }),
}));

import React from 'react';
import Navigation from 'components/Navigation';
import renderer from 'react-test-renderer';

it('Navigation renders correctly', () => {
  const tree = renderer.create(<Navigation />).toJSON();
  expect(tree).toMatchSnapshot();
});
