import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import OneColumn from '../Layout/OneColumn';

const classes = BEMHelper('c-subject-header');

const SubjectHeader = ({ urlWide, urlNarrow, heading }) => (
  <header {...classes()}>
    {urlWide &&
      urlNarrow && (
        <div {...classes('illustration-wrapper')}>
          <picture {...classes('illustration')}>
            <source srcSet={urlWide} media="(min-width: 981px)" />
            <img src={urlNarrow} alt="" />
          </picture>
        </div>
      )}
    <OneColumn noPadding>
      <h1 {...classes('heading')}>{heading}</h1>
    </OneColumn>
  </header>
);

SubjectHeader.propTypes = {
  urlWide: PropTypes.string.isRequired,
  urlNarrow: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default SubjectHeader;
