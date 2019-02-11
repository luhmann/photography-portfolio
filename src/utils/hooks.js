import { useState, useEffect, useRef } from 'react';
import { pipe, tap } from 'rambda';

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

export function useGallery({ total, initialImageIndex = 0 }) {
  const [imageIndex, setImageIndex] = useState(initialImageIndex);

  const next = pipe(
    nextStepper(imageIndex, total),
    tap(setImageIndex)
  );

  const prev = pipe(
    prevStepper(imageIndex, total),
    tap(setImageIndex)
  );

  return { imageIndex, next, prev };
}
