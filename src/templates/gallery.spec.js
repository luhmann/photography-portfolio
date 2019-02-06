import React from 'react';
import { render } from 'react-testing-library';
import generateProps from 'react-generate-props';

import { Gallery } from './gallery';

const createTestProps = custom => ({
  ...generateProps(Gallery),
  ...custom,
});

test('should render as expected', () => {
  const props = createTestProps();
  const { container } = render(<Gallery {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});
