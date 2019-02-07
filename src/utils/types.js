import { arrayOf, shape, string, number } from 'prop-types';

export const locationType = shape({
  pathname: string.isRequired,
});

export const galleryInfoType = shape({
  title: string.isRequired,
  path: string.isRequired,
});

export const albumInfoType = shape({
  albumTitle: string.isRequired,
  galleries: arrayOf(galleryInfoType).isRequired,
});

export const imageType = shape({
  contentDigest: string.isRequired,
  fluid: shape({
    tracedSVG: string.isRequired,
    aspectRatio: number.isRequired,
    src: string.isRequired,
    srcSet: string.isRequired,
    srcWebp: string.isRequired,
    srcSetWebp: string.isRequired,
    sizes: string.isRequired,
  }).isRequired,
});

export const createImageTypeTestProps = (index, custom = {}) => ({
  contentDigest: `digest-${index}`,
  fluid: {
    tracedSVG: `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='400' height='267' viewBox='0 0 400 267' version='1'%3e%3cpath d='tracedsvg-${index}' fill='lightgray' fill-rule='evenodd'/%3e%3c/svg%3e`,
    aspectRatio: 1.5,
    src: `/static/digest-${index}/size/mock-${index}.jpg`,
    srcSet: `/static/digest-${index}/size/mock-${index}-625.jpg 625w,\n/static/digest-${index}/size/mock-${index}-1250.jpg 1250w,\n/static/digest-${index}/size/mock-${index}-2250.jpg 2250w`,
    srcWebp: `/static/digest-${index}/size/mock-${index}.webp`,
    srcSetWebp: `/static/digest-${index}/size/mock-${index}-625.webp 625w,\n/static/digest-${index}/size/mock-${index}-1250.webp 1250w,\n/static/digest-${index}/size/mock-${index}-2250.webp 2250w`,
    sizes: '(max-width: 2250px) 100vw, 2250px',
  },
  ...custom,
});
