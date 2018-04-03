import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';

import Background from '../components/Background';
import './index.css';

const TemplateWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <div>
      <Helmet
        title="J F Dietrich Photography"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <Background bg="black" p={1}>
        {children()}
      </Background>
    </div>
  </ThemeProvider>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
