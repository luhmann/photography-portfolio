import React from 'react';
import { render, act } from 'react-testing-library';
import cases from 'jest-in-case';

import { useGallery } from './hooks';

const TestGallery = ({ children, ...rest }) => children(useGallery(rest));
function setup(props) {
  const returnVal = {};
  render(
    <TestGallery {...props}>
      {val => {
        Object.assign(returnVal, val);
        return null;
      }}
    </TestGallery>
  );
  return returnVal;
}

cases(
  'useGallery',
  ({
    total,
    initialImageIndex = 0,
    initialIndex,
    afterNextIndex,
    afterPrevIndex,
  }) => {
    const gallery = setup({ total, initialImageIndex });

    expect(gallery.imageIndex).toEqual(initialIndex);
    act(() => {
      gallery.next();
    });
    expect(gallery.imageIndex).toEqual(afterNextIndex);
    act(() => {
      gallery.prev();
    });
    expect(gallery.imageIndex).toEqual(afterPrevIndex);
  },
  {
    basic: {
      total: 2,
      initialIndex: 0,
      afterNextIndex: 1,
      afterPrevIndex: 0,
    },
    'with `initialImageIndex`': {
      total: 3,
      initialImageIndex: 1,
      initialIndex: 1,
      afterNextIndex: 2,
      afterPrevIndex: 1,
    },
    'with next exceeding total': {
      total: 2,
      initialImageIndex: 1,
      initialIndex: 1,
      afterNextIndex: 0,
      afterPrevIndex: 1,
    },
  }
);

test('should go to last if prev exceeds lower bound', () => {
  const gallery = setup({ total: 2 });
  act(() => {
    gallery.prev();
  });

  expect(gallery.imageIndex).toEqual(1);
});
