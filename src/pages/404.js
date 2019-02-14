import React from 'react';
import styled from 'styled-components';
import { themeGet } from 'styled-system';

import { Layout, ContentContainer, StyledLink } from 'components/';
import { locationType } from 'utils/types';

import { mediaScreen } from '../theme';

const TextContainer = styled(ContentContainer)`
  padding: ${themeGet('space.4')};
  padding-top: ${themeGet('space.6')};

  ${mediaScreen.md`
    padding: ${themeGet('space.3')};
    padding-top: ${themeGet('space.6')};
    will-change: scroll-position;
    min-height: calc(100vh - 2*${themeGet('space.containerBorderMobile')});
  `};
`;

const Headline = styled.h1`
  color: ${themeGet('colors.black')};
  font-family: ${themeGet('fonts.headline')};
  font-size: ${themeGet('fontSizes.xl')};
  font-weight: bold
  text-transform: uppercase;
  margin-bottom: ${themeGet('space.3')};
`;

const Text = styled.p`
  color: ${themeGet('colors.black')};
  font-family: ${themeGet('fonts.body')};
  font-size: ${themeGet('fontSizes.m')};
`;

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <TextContainer>
      <Headline>Not Found</Headline>
      <Text>You just hit a route that doesn&#39;t exist... the sadness.</Text>
      <StyledLink
        to="/portraits"
        fontFamily="body"
        fontSize={['m', 'l']}
        color="black"
      >
        Find some images here
      </StyledLink>
    </TextContainer>
  </Layout>
);

NotFoundPage.propTypes = {
  location: locationType.isRequired,
};

export default NotFoundPage;
