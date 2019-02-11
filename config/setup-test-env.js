import 'jest-dom/extend-expect';
// run "cleanup" automatically after each test
import 'react-testing-library/cleanup-after-each';
import { toMatchDiffSnapshot } from 'snapshot-diff';
import { init } from 'react-generate-props';
// TODO: currently does not support v4, fix when support is there
// import 'jest-styled-components';

init();
expect.extend({ toMatchDiffSnapshot });
