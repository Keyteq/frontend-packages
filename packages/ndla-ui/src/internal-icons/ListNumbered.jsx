/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const ListNumbered = ({ className }) => (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
    className={className}>
    <path d="M12 26h20v4h-20zM12 14h20v4h-20zM12 2h20v4h-20zM6 0v8h-2v-6h-2v-2zM4 16.438v1.563h4v2h-6v-4.563l4-1.875v-1.563h-4v-2h6v4.563zM8 22v10h-6v-2h4v-2h-4v-2h4v-2h-4v-2z" />
  </svg>
);

ListNumbered.propTypes = {
  className: PropTypes.string.isRequired,
};

export default ListNumbered;
