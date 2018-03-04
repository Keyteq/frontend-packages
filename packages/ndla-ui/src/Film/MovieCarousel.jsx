import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import Slider from 'react-slick';

import BackgroundImage from '../BackgroundImage';
import SafeLink from '../common/SafeLink';

const itemClasses = BEMHelper('c-movie-caroucel-item');

export const MovieCaroucelItem = ({ url, title, images }) => (
  <article {...itemClasses()}>
    <SafeLink to={url}>
      <div {...itemClasses('image')}>
        <BackgroundImage images={images} />
      </div>
      <h1>{title}</h1>
    </SafeLink>
  </article>
);

MovieCaroucelItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  images: BackgroundImage.propTypes.images,
};

const sliderSettings = {
  dots: false,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 2,
  swipeToScroll: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: { slidesToShow: 5 },
    },
    {
      breakpoint: 800,
      settings: { slidesToShow: 4 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 400,
      settings: { slidesToShow: 2 },
    },
  ],
};

const classes = BEMHelper('c-movie-caroucel');

const MovieCaroucel = ({ children, heading }) => (
  <section {...classes()}>
    <h1 {...classes('heading')}>{heading}</h1>
    <Slider {...classes('caroucel')} {...sliderSettings}>
      {children}
    </Slider>
  </section>
);

MovieCaroucel.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MovieCaroucel;
