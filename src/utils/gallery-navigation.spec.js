import { nextStepper, prevStepper } from './gallery-navigation';

describe('nextStepper', () => {
  test.each([[0, 3, 1], [1, 3, 2], [2, 3, 0]])(
    'should increment %i with total %i to %i',
    (index, total, expected) => {
      expect(nextStepper(index, total)()).toEqual(expected);
    }
  );
});

describe('prevStepper', () => {
  test.each([[0, 3, 2], [1, 3, 0], [2, 3, 1]])(
    'should increment %i with total %i to %i',
    (index, total, expected) => {
      expect(prevStepper(index, total)()).toEqual(expected);
    }
  );
});
