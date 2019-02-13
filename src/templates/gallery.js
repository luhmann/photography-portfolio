import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql, navigate, Link } from 'gatsby';
import KeyHandler from 'react-key-handler';
import { compose, mapProps } from 'recompose';
import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from 'styled-system';
import { pathOr, pipe, replace, path } from 'rambda';

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

const Prev = styled(Link)`
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

const getImageUrl = ({ pathname = '/portraits/', id }) =>
  `${pathname}${id ? `#${id}` : ''}`;

export const Gallery = ({ images, title, location, pathname, initialId }) => {
  const { currentId, nextId, prevId } = useGallery({
    images,
    initialId,
  });

  const prevUrl = useMemo(() => getImageUrl({ pathname, id: prevId }), [
    prevId,
  ]);
  const nextUrl = useMemo(() => getImageUrl({ pathname, id: nextId }), [
    nextId,
  ]);

  return (
    <Layout location={location}>
      <GatsbyImageOverwriteStyles />
      <GalleryContainer>
        <Helmet title={`${title} - JF Dietrich Photography`} />
        <KeyHandler
          keyValue="ArrowRight"
          onKeyHandle={() => navigate(nextUrl)}
        />
        <KeyHandler
          keyValue="ArrowLeft"
          onKeyHandle={() => navigate(prevUrl)}
        />
        <Prev data-testid="gallery-prev" to={prevUrl}>
          <StyledPrevIcon />
        </Prev>
        {images.map((image, index) => (
          <Image
            key={image.contentDigest}
            visible={currentId === image.contentDigest}
            fluid={image.fluid}
            alt={`Gallery ${title} - Image ${index + 1}`}
            imgStyle={{
              objectFit: 'contain',
            }}
          />
        ))}
        <Next data-testid="gallery-next" to={nextUrl}>
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
  initialId: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

Gallery.displayName = 'Gallery';

export default compose(
  mapProps(props => ({
    ...props,
    images: mapGalleryImagesGraphQLResponse(props),
    title: mapSingleGalleryYamlGraphQLResponse(props),
    pathname: path('location.pathname')(props),
    initialId: pipe(
      pathOr('', 'location.hash'),
      replace('#', '')
    )(props),
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
