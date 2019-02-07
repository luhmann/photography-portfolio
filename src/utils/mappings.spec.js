import {
  mapSingleGalleryYamlGraphQLResponse,
  mapAllGalleriesGraphQLResponse,
  mapGalleryImagesGraphQLResponse,
} from './mappings';

describe('`mapSingleGalleryYamlGraphQLResponse`', () => {
  test('should return mapped data - with correct input', () => {
    const subject = {
      data: {
        galleriesYaml: {
          title: 'title',
        },
      },
    };

    expect(mapSingleGalleryYamlGraphQLResponse(subject)).toEqual('title');
  });

  test.each([{}, null, undefined, 5, ''])(
    'should return `undefined` - if data does not exist',
    subject =>
      expect(mapSingleGalleryYamlGraphQLResponse(subject)).toEqual(undefined)
  );
});

describe('`mapAllGalleriesGraphQLResponse`', () => {
  test('should return mapped data - with correct input', () => {
    const subject = {
      allGalleriesYaml: {
        group: [
          {
            fieldValue: 'People',
            edges: [
              {
                node: {
                  title: 'Portraits',
                  path: '/portraits/',
                },
              },
            ],
          },
          {
            fieldValue: 'Places',
            edges: [
              {
                node: {
                  title: 'Elbsandsteingebirge',
                  path: '/elbsandsteingebirge/',
                },
              },
            ],
          },
        ],
      },
    };

    expect(mapAllGalleriesGraphQLResponse(subject)).toEqual([
      {
        albumTitle: 'People',
        galleries: [{ path: '/portraits/', title: 'Portraits' }],
      },
      {
        albumTitle: 'Places',
        galleries: [
          { path: '/elbsandsteingebirge/', title: 'Elbsandsteingebirge' },
        ],
      },
    ]);
  });

  test.each([{}, null, undefined, 5, '', { allGalleries: { group: null } }])(
    'should return `undefined` - if input data is invalid',
    subject =>
      expect(mapSingleGalleryYamlGraphQLResponse(subject)).toEqual(undefined)
  );
});

describe('`mapGalleryImagesGraphQLResponse`', () => {
  test('should map as expected - when the correct input data is required', () => {
    const subject = {
      data: {
        galleriesYaml: {
          title: 'Portraits',
        },
        allFile: {
          edges: [
            {
              node: {
                childImageSharp: {
                  internal: {
                    contentDigest: '39e6e521dca957bb39471c85a136cecc',
                  },
                  fluid: {
                    src:
                      '/static/39e6e521dca957bb39471c85a136cecc/a01f0/00__MG_3527.jpg',
                    srcSet:
                      '/static/39e6e521dca957bb39471c85a136cecc/76a60/00__MG_3527.jpg 625w,\n/static/39e6e521dca957bb39471c85a136cecc/b87b4/00__MG_3527.jpg 1250w,\n/static/39e6e521dca957bb39471c85a136cecc/a01f0/00__MG_3527.jpg 2250w',
                    srcWebp:
                      '/static/39e6e521dca957bb39471c85a136cecc/25b33/00__MG_3527.webp',
                  },
                },
              },
            },
            {
              node: {
                childImageSharp: {
                  internal: {
                    contentDigest: '16c87d7eab2dd5c22da02eb321ebed8b',
                  },
                  fluid: {
                    aspectRatio: 1.5,
                    src:
                      '/static/16c87d7eab2dd5c22da02eb321ebed8b/a01f0/01__MG_3956.jpg',
                    srcSet:
                      '/static/16c87d7eab2dd5c22da02eb321ebed8b/76a60/01__MG_3956.jpg 625w,\n/static/16c87d7eab2dd5c22da02eb321ebed8b/b87b4/01__MG_3956.jpg 1250w,\n/static/16c87d7eab2dd5c22da02eb321ebed8b/a01f0/01__MG_3956.jpg 2250w',
                  },
                },
              },
            },
          ],
        },
      },
    };

    expect(mapGalleryImagesGraphQLResponse(subject)).toMatchSnapshot();
  });

  test.each([
    {},
    null,
    undefined,
    5,
    '',
    { data: { allFiles: { edges: {} } } },
  ])('should return `undefined` - if input data is invalid', subject =>
    expect(mapSingleGalleryYamlGraphQLResponse(subject)).toEqual(undefined)
  );
});
