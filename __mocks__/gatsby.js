const React = require('react');
const gatsby = jest.requireActual('gatsby');

const navigate = jest.fn();

module.exports = {
  ...gatsby,
  graphql: jest.fn(),
  navigate,
  Link: jest.fn().mockImplementation(({ to, ...rest }) =>
    React.createElement('a', {
      ...rest,
      href: to,
    })
  ),
  StaticQuery: jest.fn(),
};
