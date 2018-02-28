import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { BackgroundImage } from '../BackgroundImage';

const classes = BEMHelper('c-featuring-movie-banner');

const FeaturingMovieBanner = ({ heading, images }) => (
  <section {...classes()}>
    <BackgroundImage images={images} />
    <h1>{heading}</h1>
  </section>
);

FeaturingMovieBanner.propTypes = {
  images: BackgroundImage.propTypes.images,
  heading: PropTypes.string.isRequired,
};

export default FeaturingMovieBanner;
