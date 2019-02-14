import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { graphql, navigate, Link } from 'gatsby';
import KeyHandler from 'react-key-handler';
import { compose, mapProps } from 'recompose';
import styled, { createGlobalStyle } from 'styled-components';
import { themeGet } from 'styled-system';
import { path } from 'rambda';

import { ReactComponent as PrevIcon } from 'assets/prev.svg';
import { ReactComponent as NextIcon } from 'assets/next.svg';
import { locationType, imageType } from 'utils/types';
import { useGallery } from 'utils/hooks';
import { ContentContainer, Layout } from 'components';
import { mapGalleryImagesGraphQLResponse } from 'utils/mappings';

import { mediaScreen } from '../theme';

const GalleryContainer = styled(ContentContainer)`
  padding: ${themeGet('space.6')};

  ${mediaScreen.md`
    padding: ${themeGet('space.3')};
    padding-top: ${themeGet('space.6')};
    will-change: scroll-position;
  `};
`;

/**
 * gatsby does not apply the same styles to the img-tags and the noscript-img-tags
 * we overwrite the style here with a global style
 * check if the styles are still separate
 * @see https://github.com/gatsbyjs/gatsby/blob/67c0131a0dbaac4d9b535197f70bcbde0f37f49c/packages/gatsby-image/src/index.js#L94
 */
const GatsbyImageOverwriteStyles = createGlobalStyle`
  .gatsby-image-wrapper noscript img {
    object-fit: contain !important;
  }
`;

const Image = styled(Img)`
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

const getImageUrl = ({ pathname = '/portraits', id }) =>
  `${pathname}/${id ? `${id}` : ''}`;

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
        <Prev
          data-testid="gallery-prev"
          to={prevUrl}
          aria-label="Previous Picture"
        >
          <StyledPrevIcon />
        </Prev>
        {images.map((image, index) => (
          <Image
            key={image.contentDigest}
            visible={currentId === image.contentDigest}
            fluid={image.fluid}
            alt={`Gallery ${title} - Image ${index + 1}`}
            imgStyle={{
              // should be the same as the one in the noscript-overwrite above
              objectFit: 'contain',
            }}
          />
        ))}
        <Next data-testid="gallery-next" to={nextUrl} aria-label="Next Picture">
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
  initialId: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

Gallery.defaultProps = {
  initialId: undefined,
};

Gallery.displayName = 'Gallery';

export default compose(
  mapProps(props => ({
    ...props,
    images: mapGalleryImagesGraphQLResponse(props),
    title: path('pageContext.title', props),
    pathname: path('pageContext.pathname', props),
    initialId: path('pageContext.initialId', props),
  }))
)(Gallery);

/**
 * NOTE: experimented with passing the `contentDigest`-ids here and getting them with `allImageSharp`
 * in order to not query twice -> did not work because the correct ordering could not be applied
 * without the relation to the filepath and manual ordering felt unexpected
 */
export const pageQuery = graphql`
  query Gallery($folderName: String!) {
    ...SingleGalleryYamlFragment
    allFile(
      filter: { relativeDirectory: { eq: $folderName } }
      sort: { fields: [relativePath] }
    ) {
      ...GalleryImagesFragment
    }
  }
`;
