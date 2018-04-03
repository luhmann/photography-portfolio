import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';

export default function Template({ pathContext: { images, name } }) {
  console.log(images, name);
  const [{ node: { childImageSharp: { sizes: firstImageSizes } } }] = images;
  return (
    <div className="album-container">
      <Helmet title={`${name} - Album`} />
      <div className="album" style={{ width: '100vw', height: '100vh' }}>
        <Img sizes={firstImageSizes} />
      </div>
    </div>
  );
}
