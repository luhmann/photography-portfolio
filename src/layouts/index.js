import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import { Background, Logo, Menu, StyledLink } from '../components/';
import './index.css';

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Helmet>
        <title>J F Dietrich Photography</title>
        <link
          href="https://fonts.googleapis.com/css?family=Patua+One"
          rel="stylesheet"
        />
      </Helmet>
      <Background bg="black">
        <Logo color="black" fontFamily="logo" fontSize="4xl" m={0}>
          <StyledLink to="/" color="black">
            JF Dietrich Photography
          </StyledLink>
        </Logo>
        <Menu />
        {children()}
      </Background>
    </div>
  </ThemeProvider>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

TemplateWrapper.displayName = 'TemplateWrapper';

export default TemplateWrapper;
