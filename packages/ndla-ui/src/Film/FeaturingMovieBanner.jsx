import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import OneColumn from '../Layout/OneColumn';

import { BackgroundImage } from '../BackgroundImage';

const classes = BEMHelper('c-featuring-movie-banner');

const FeaturingMovieBanner = ({ heading, images, description, url }) => (
  <article {...classes()}>
    <a href={url} {...classes('link')} aria-label={heading}>
      <BackgroundImage images={images} />
      <div {...classes('content')}>
        <OneColumn>
          <h1 {...classes('heading')}>{heading}</h1>
          <div {...classes('description')}>
            <p>{description}</p>
          </div>
        </OneColumn>
      </div>
    </a>
  </article>
);

FeaturingMovieBanner.propTypes = {
  images: BackgroundImage.propTypes.images,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default FeaturingMovieBanner;
