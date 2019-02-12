import { useState, useEffect, useRef } from 'react';
import { pipe, path, find, findIndex, equals, head, defaultTo } from 'rambda';
import { navigate } from 'gatsby';

import { nextStepper, prevStepper } from 'utils/gallery-navigation';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // set up the interval.
  useEffect(
    () => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    },
    [delay]
  );
}

const getImageId = path('contentDigest');
const getCurrentIndexById = id => images =>
  findIndex(
    pipe(
      getImageId,
      equals(id)
    )
  )(images);

export function useGallery({ images = [], initialId }) {
  const total = images.length;
  const verifiedInitialId = pipe(
    find(
      pipe(
        getImageId,
        equals(initialId)
      )
    ),
    defaultTo(head(images)),
    getImageId
  )(images);
  const [id, setId] = useState(verifiedInitialId);

  useEffect(
    () => {
      setId(verifiedInitialId);
    },
    [verifiedInitialId]
  );

  if (total === 0) {
    navigate('/404');
    return {};
  }

  const getNextIndex = nextStepper(getCurrentIndexById(id)(images), total);
  const getPrevIndex = prevStepper(getCurrentIndexById(id)(images), total);
  const nextId = getImageId(images[getNextIndex()]);
  const prevId = getImageId(images[getPrevIndex()]);

  const next = () => setId(nextId);
  const prev = () => setId(prevId);

  return { next, prev, currentId: id, nextId, prevId };
}
