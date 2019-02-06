import { arrayOf, shape, string } from 'prop-types';

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
