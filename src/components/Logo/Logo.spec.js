import React from 'react';
import { render } from 'react-testing-library';

import Logo from './';

test('should render as expected', () => {
  const { container } = render(<Logo />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should contain the logo text', () => {
  const { getByText } = render(<Logo />);

  expect(getByText('JF Dietrich Photography')).toBeInTheDocument();
});
