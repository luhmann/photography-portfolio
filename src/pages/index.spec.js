import React from 'react';
import { render, fireEvent, act } from 'react-testing-library';
import generateProps from 'react-generate-props';
import { StaticQuery } from 'gatsby';

import { createImageTypeTestProps } from 'utils/types';

import { IndexPage, IMAGE_DISPLAY_DURATION } from './index';

jest.useFakeTimers();

const createTestProps = custom => ({
  ...generateProps(IndexPage, { optional: true }),
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
  altImages: /Slideshow Image/,
  testIdEnterButton: 'home-enter-button',
  testIdLogo: 'home-logo',
});

beforeEach(() => {
  StaticQuery.mockImplementation(({ render }) => render({}));
});

test('should render as expected', () => {
  const props = createTestProps();
  const { getAllByAltText, getByTestId } = render(<IndexPage {...props} />);

  expect(getAllByAltText(testSelectors.altImages).length).toEqual(
    props.images.length
  );
  expect(getByTestId(testSelectors.testIdEnterButton)).toBeInTheDocument();
  expect(getByTestId(testSelectors.testIdLogo)).toBeInTheDocument();
});

test('should advance to the next image', () => {
  const props = createTestProps();
  const { asFragment } = render(<IndexPage {...props} />);

  const firstRender = asFragment();

  act(() => {
    jest.advanceTimersByTime(IMAGE_DISPLAY_DURATION + 1000);
  });

  expect(firstRender).toMatchDiffSnapshot(asFragment());
});
