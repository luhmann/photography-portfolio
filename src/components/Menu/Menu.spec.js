import React from 'react';
import { render, fireEvent } from 'react-testing-library';

import Menu from './Menu';

const createGallery = (title, path) => ({
  title,
  path,
});

const createTestProps = (custom = {}) => ({
  albums: [
    {
      albumTitle: 'Landscapes',
      galleries: [
        createGallery('Place 1', '/place-1'),
        createGallery('Place 2', '/place-2'),
        createGallery('Place 3', '/place-3'),
      ],
    },
    {
      albumTitle: 'Portraits',
      galleries: [
        createGallery('Person 1', '/place-1'),
        createGallery('Person 2', '/place-2'),
        createGallery('Person 3', '/place-3'),
      ],
    },
  ],
  ...custom,
});

// key-structure: typeDescription
const testSelectors = Object.freeze({
  textTriggerClosed: 'menu',
  textTriggerOpen: 'x',
  testIdSlideout: 'menu-slideout',
  testIdAlbum: 'menu-album',
  testIdGallery: 'menu-gallery',
});

test('should display menu collapsed - initially', () => {
  const props = createTestProps();
  const { getByText } = render(<Menu {...props} />);

  expect(getByText(testSelectors.textTriggerClosed)).toBeInTheDocument();
});

test('should open/close menu - when clicking on trigger', () => {
  const props = createTestProps();
  const { getByText, getByTestId, getAllByTestId } = render(
    <Menu {...props} />
  );

  fireEvent.click(getByText(testSelectors.textTriggerClosed));

  expect(getByText(testSelectors.textTriggerOpen)).toBeInTheDocument();
  expect(getByTestId(testSelectors.testIdSlideout)).toBeVisible();
  expect(getAllByTestId(testSelectors.testIdAlbum).length).toEqual(
    props.albums.length
  );
  expect(getAllByTestId(testSelectors.testIdGallery).length).toEqual(
    props.albums.reduce((acc, album) => acc + album.galleries.length, 0)
  );

  fireEvent.click(getByText(testSelectors.textTriggerOpen));

  expect(getByText(testSelectors.textTriggerClosed)).toBeInTheDocument();
  expect(getByTestId(testSelectors.testIdSlideout)).not.toBeVisible();
});
