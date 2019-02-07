import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';
import generateProps from 'react-generate-props';
import { StaticQuery } from 'gatsby';

import { createImageTypeTestProps } from 'utils/types';

import { Gallery } from './gallery';

const createTestProps = custom => ({
  ...generateProps(Gallery, { optional: true }),
  images: [
    createImageTypeTestProps(1),
    createImageTypeTestProps(2),
    createImageTypeTestProps(3),
    createImageTypeTestProps(4),
    createImageTypeTestProps(5),
    createImageTypeTestProps(6),
    createImageTypeTestProps(7),
  ],
  ...custom,
});

const testSelectors = Object.freeze({
  // NOTE: `gatsby-image` does not pass on data-attributes
  altGalleryImage: /Gallery title/,
  testIdNextButton: 'gallery-next',
  testIdPrevButton: 'gallery-prev',
});

beforeEach(() => {
  StaticQuery.mockImplementation(({ render }) => render({}));
});

test('should render all images', async () => {
  const props = createTestProps();
  const { getAllByAltText } = render(<Gallery {...props} />);

  expect(getAllByAltText(testSelectors.altGalleryImage).length).toEqual(
    props.images.length
  );
});

// NOTE: because of styled components the difference is only visible in the classname
// this should be resolved once we have a better snapshot-serializer for styled components
test('should show the second image, when clicking next', () => {
  const props = createTestProps();
  const { getByTestId, asFragment } = render(<Gallery {...props} />);

  const firstRender = asFragment();

  act(() => {
    fireEvent.click(getByTestId(testSelectors.testIdNextButton));
  });

  expect(firstRender).toMatchDiffSnapshot(asFragment());
});

test('should show last image, when clicking prev', () => {
  const props = createTestProps();
  const { getByTestId, asFragment } = render(<Gallery {...props} />);

  const firstRender = asFragment();

  act(() => {
    fireEvent.click(getByTestId(testSelectors.testIdPrevButton));
  });

  expect(firstRender).toMatchDiffSnapshot(asFragment());
});
