import React from 'react';
import { render } from 'react-testing-library';
import generateProps from 'react-generate-props';

import { LayoutComponent } from './';

const createTestProps = (custom = {}) => ({
  ...generateProps(LayoutComponent, { optional: true }),
  ...custom,
});

test('should render as expected - when on home-page', () => {
  const props = createTestProps({
    location: {
      pathname: '/',
    },
  });
  const { container } = render(<LayoutComponent {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should render as expected - when not home-page', () => {
  const props = createTestProps();
  const { container } = render(<LayoutComponent {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});
