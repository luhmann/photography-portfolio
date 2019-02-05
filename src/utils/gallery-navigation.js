import { inc, dec, ifElse } from 'rambda';

const nextStepper = (index, total = 0) =>
  ifElse(() => inc(index) < total, () => inc(index), () => 0);

const prevStepper = (index, total = 0) =>
  ifElse(() => dec(index) >= 0, () => dec(index), () => dec(total));

export { nextStepper, prevStepper };
