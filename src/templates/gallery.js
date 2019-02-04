import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import KeyHandler from 'react-key-handler';
import { dec, ifElse, inc } from 'rambda';
import { compose, mapProps, withStateHandlers } from 'recompose';
import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from 'styled-system';
import { ReactComponent as PrevIcon } from '../assets/prev.svg';
import { ReactComponent as NextIcon } from '../assets/next.svg';
import { ContentContainer, Layout } from '../components';
import {
  mapGalleryImagesGraphQLResponse,
  mapSingleGalleryYamlGraphQLResponse,
} from '../utils/mappings';
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

const Gallery = ({ images, title, imageIndex, next, prev, location }) => (
  <Layout location={location}>
    <GatsbyImageOverwriteStyles />
    <GalleryContainer>
      <Helmet>
        <title>{`${title} - JF Dietrich Photography`}</title>
      </Helmet>
      <KeyHandler keyValue="ArrowRight" onKeyHandle={next} />
      <KeyHandler keyValue="ArrowLeft" onKeyHandle={prev} />
      <Prev onClick={prev}>
        <StyledPrevIcon />
      </Prev>
      {images.map((image, index) => (
        <Image
          key={image.contentDigest}
          visible={imageIndex === index}
          fluid={image.fluid}
          imgStyle={{
            objectFit: 'contain',
          }}
        />
      ))}
      <Next onClick={next}>
        <StyledNextIcon />
      </Next>
    </GalleryContainer>
  </Layout>
);

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      fluid: PropTypes.object.isRequired,
      contentDigest: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  imageIndex: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  prev: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

Gallery.displayName = 'Gallery';

export default compose(
  mapProps(props => ({
    ...props,
    images: mapGalleryImagesGraphQLResponse(props),
    title: mapSingleGalleryYamlGraphQLResponse(props),
  })),
  withStateHandlers(
    ({ initialImageIndex = 0 }) => ({
      imageIndex: initialImageIndex,
    }),
    {
      next: ({ imageIndex }, { images }) =>
        ifElse(
          () => inc(imageIndex) < images.length,
          () => ({ imageIndex: inc(imageIndex) }),
          () => ({ imageIndex: 0 })
        ),
      prev: ({ imageIndex }, { images }) =>
        ifElse(
          () => dec(imageIndex) >= 0,
          () => ({ imageIndex: dec(imageIndex) }),
          () => ({ imageIndex: dec(images.length) })
        ),
      showIndex: () => ({ nextIndex }) => ({
        imageIndex: nextIndex,
      }),
    }
  )
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
