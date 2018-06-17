/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { Portrait, SafeLink } from 'ndla-ui';

const classes = new BEMHelper('c-search-result-author');

const SearchResultAuthor = ({ messages, url, image }) => (
  <div {...classes('')}>
    <div>
      <h1>{messages.authorName}</h1>
      <p>{messages.role}</p>
      {url && <SafeLink to={url}>{messages.readmoreLabel}</SafeLink>}
      <SafeLink to={messages.email}>{messages.email}</SafeLink>
      <SafeLink to={messages.phone}>{messages.phone}</SafeLink>
    </div>
    <div>
      <Portrait src={image} alt={messages.authorName}/>
    </div>
  </div>
);

SearchResultAuthor.propTypes = {
  messages: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    phone: PropTypes.string,
    email: PropTypes.string,
    readmoreLabel: (props, propName, componentName) => {
      if (typeof props.url === 'string' && typeof props[propName] !== 'string') {
        return new Error(
          `${componentName} messages.readmoreLabel is required when propTypes.url`,
        );
      }
      return null;
    }
  }),
  image: PropTypes.string.isRequired,
  url: PropTypes.string,
};

export default SearchResultAuthor;
