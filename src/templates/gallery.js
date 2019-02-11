import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import KeyHandler from 'react-key-handler';
import { compose, mapProps } from 'recompose';
import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from 'styled-system';

import { ReactComponent as PrevIcon } from 'assets/prev.svg';
import { ReactComponent as NextIcon } from 'assets/next.svg';
import { locationType, imageType } from 'utils/types';
import { useGallery } from 'utils/hooks';
import { ContentContainer, Layout } from 'components';
import {
  mapGalleryImagesGraphQLResponse,
  mapSingleGalleryYamlGraphQLResponse,
} from 'utils/mappings';

import { mediaScreen } from '../theme';

const GalleryContainer = styled(ContentContainer)`
  padding: ${themeGet('space.6')};

  ${mediaScreen.md`
    padding: ${themeGet('space.3')};
    padding-top: ${themeGet('space.6')};
    will-change: scroll-position;
  `};
`;

// NOTE: the introduction of global classes is unfortunate here,
// but unavoidable because of the API the `gatsby-image`-component exposes
// it allows to pass `className` which styles the inner of the two divs the component renders
// it allows to pass `outerClassName` which styles the outer image wrapper
// for use with styled-components it would be preferrable if there was `className` and `innerClassName`
// because with styled-components (and css) we only can easily stile "downwards" into the DOM tree
// to work around this we define a global classname and apply it conditionally
const outerWrapperHiddenClassName = 'outerWrapper-hidden';
const GatsbyImageOverwriteStyles = createGlobalStyle`
  .gatsby-image-outer-wrapper {
    width: 100%;
    height: 100%;
  }

  .${outerWrapperHiddenClassName} {
    display: none;
    ${mediaScreen.md`
      display: block;
    `};
  }
`;

const Image = styled(Img).attrs(props => ({
  outerWrapperClassName: props.visible ? null : outerWrapperHiddenClassName,
}))`
  align-items: center;
  display: ${props => (props.visible ? 'flex' : 'none')};
  height: 100%;

  ${mediaScreen.md`
    display: flex;
    height: auto;
    margin-bottom: ${themeGet('space.3')};
  `};
`;

const Prev = styled.a`
  align-items: center;
  cursor: w-resize;
  display: flex;
  height: 100%;
  padding: ${themeGet('space.3')};
  position: absolute;
  left: 0;
  top: 0;
  width: 49vw;
  z-index: ${themeGet('zIndex.low')};

  ${mediaScreen.md`
    display: none;
  `};
`;

const Next = styled(Prev)`
  cursor: e-resize;
  left: auto;
  right: 0;
  justify-content: flex-end;
`;

const StyledPrevIcon = styled(PrevIcon)`
  cursor: pointer;
  height: ${themeGet('space.5')};
  width: ${themeGet('space.5')};
`;

const StyledNextIcon = styled(NextIcon)`
  cursor: pointer;
  height: ${themeGet('space.5')};
  width: ${themeGet('space.5')};
`;

export const Gallery = ({ images, title, location }) => {
  const { imageIndex, next, prev } = useGallery({ total: images.length });

  return (
    <Layout location={location}>
      <GatsbyImageOverwriteStyles />
      <GalleryContainer>
        <Helmet>
          <title>{`${title} - JF Dietrich Photography`}</title>
        </Helmet>
        <KeyHandler keyValue="ArrowRight" onKeyHandle={next} />
        <KeyHandler keyValue="ArrowLeft" onKeyHandle={prev} />
        <Prev data-testid="gallery-prev" onClick={prev}>
          <StyledPrevIcon />
        </Prev>
        {images.map((image, index) => (
          <Image
            key={image.contentDigest}
            visible={imageIndex === index}
            fluid={image.fluid}
            alt={`Gallery ${title} - Image ${index + 1}`}
            imgStyle={{
              objectFit: 'contain',
            }}
          />
        ))}
        <Next data-testid="gallery-next" onClick={next}>
          <StyledNextIcon />
        </Next>
      </GalleryContainer>
    </Layout>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(imageType).isRequired,
  title: PropTypes.string.isRequired,
  location: locationType.isRequired,
};

Gallery.displayName = 'Gallery';

export default compose(
  mapProps(props => ({
    ...props,
    images: mapGalleryImagesGraphQLResponse(props),
    title: mapSingleGalleryYamlGraphQLResponse(props),
  }))
)(Gallery);

export const pageQuery = graphql`
  query Gallery($folderName: String!) {
    ...singleGalleryYamlFragment
    allFile(
      filter: { relativeDirectory: { eq: $folderName } }
      sort: { fields: [relativePath] }
    ) {
      ...GalleryImagesFragment
    }
  }
`;
