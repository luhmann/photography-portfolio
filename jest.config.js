module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/config/jest-preprocess.js`,
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '.+\\.(svg)$': `<rootDir>/__mocks__/markup-mock.js`,
    '^assets(.*)$': '<rootDir>/src/assets$1',
    '^components(.*)$': '<rootDir>/src/components$1',
    '^pages(.*)$': '<rootDir>/src/pages$1',
    '^templates(.*)$': '<rootDir>/src/templates$1',
    '^utils(.*)$': '<rootDir>/src/utils$1',
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `config`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  setupFiles: [`<rootDir>/config/loadershim.js`],
  setupFilesAfterEnv: ['<rootDir>/config/setup-test-env.js'],
};
