import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import { Background, Logo, StyledLink } from '../components/';
import './index.css';

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Helmet>
        <title>J F Dietrich Photography</title>
        <link
          href="https://fonts.googleapis.com/css?family=Fjalla+One"
          rel="stylesheet"
        />
      </Helmet>
      <Background bg="black">{children()}</Background>
      <Logo color="black" fontFamily="logo" fontSize="4xl" m={0}>
        <StyledLink to="/" color="black">
          JF Dietrich Photography
        </StyledLink>
      </Logo>
    </div>
  </ThemeProvider>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func.isRequired,
};

TemplateWrapper.displayName = 'TemplateWrapper';

export default TemplateWrapper;
