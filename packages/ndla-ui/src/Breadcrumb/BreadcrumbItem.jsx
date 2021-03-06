/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ChevronRight } from 'ndla-icons/common';

import SafeLink from '../common/SafeLink';

const BreadcrumbItem = ({ to, children, classes, isCurrent, home, name }) => (
  <li {...classes('item', { home })}>
    {isCurrent ? (
      <span>{children}</span>
    ) : (
      <SafeLink to={to} aria-label={home ? name : null}>
        {children}
      </SafeLink>
    )}
    {!home && <ChevronRight />}
  </li>
);

BreadcrumbItem.propTypes = {
  classes: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool,
  home: PropTypes.bool,
  name: PropTypes.string,
};

BreadcrumbItem.defaultProps = {
  home: false,
};

export default BreadcrumbItem;
