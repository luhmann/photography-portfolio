import React from 'react';
import { render, act } from 'react-testing-library';
import cases from 'jest-in-case';

import { createImageTypeTestProps } from 'utils/types';

import { useGallery } from './hooks';

const createTestGalleryProps = () => [
  createImageTypeTestProps(1),
  createImageTypeTestProps(2),
  createImageTypeTestProps(3),
  createImageTypeTestProps(4),
  createImageTypeTestProps(5),
  createImageTypeTestProps(6),
  createImageTypeTestProps(7),
];

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
    images,
    initialId,
    currentId,
    nextId,
    prevId,
    afterNextCurrentId,
    afterNextNextId,
    afterNextPrevId,
  }) => {
    const gallery = setup({ images, initialId });

    expect(gallery.currentId).toEqual(currentId);
    expect(gallery.nextId).toEqual(nextId);
    expect(gallery.prevId).toEqual(prevId);
    act(() => {
      gallery.next();
    });
    expect(gallery.currentId).toEqual(afterNextCurrentId);
    expect(gallery.nextId).toEqual(afterNextNextId);
    expect(gallery.prevId).toEqual(afterNextPrevId);
    act(() => {
      gallery.prev();
    });
    expect(gallery.currentId).toEqual(currentId);
    expect(gallery.nextId).toEqual(nextId);
    expect(gallery.prevId).toEqual(prevId);
  },
  {
    basic: {
      images: createTestGalleryProps(),
      initialId: undefined,
      currentId: 'digest-1',
      nextId: 'digest-2',
      prevId: 'digest-7',
      afterNextCurrentId: 'digest-2',
      afterNextNextId: 'digest-3',
      afterNextPrevId: 'digest-1',
    },
    'with `initialId`': {
      images: createTestGalleryProps(),
      initialId: 'digest-2',
      currentId: 'digest-2',
      nextId: 'digest-3',
      prevId: 'digest-1',
      afterNextCurrentId: 'digest-3',
      afterNextNextId: 'digest-4',
      afterNextPrevId: 'digest-2',
    },
    'with next exceeding total': {
      images: [createImageTypeTestProps(1), createImageTypeTestProps(2)],
      initialId: 'digest-2',
      currentId: 'digest-2',
      nextId: 'digest-1',
      prevId: 'digest-1',
      afterNextCurrentId: 'digest-1',
      afterNextNextId: 'digest-2',
      afterNextPrevId: 'digest-2',
    },
  }
);
