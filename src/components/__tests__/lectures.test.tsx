jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (text: string) => text,
  }),
}));

import React from 'react';
import Lectures from 'components/Lectures';
import renderer from 'react-test-renderer';

it('Lectures renders correctly', () => {
  const tree = renderer.create(<Lectures />).toJSON();
  expect(tree).toMatchSnapshot();
});
