/*
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SafeLink } from 'ndla-ui';

class FrontpageMenuitemExtention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <Fragment>
        <button type="button" onClick={this.handleOpen}>
          {this.props.children}
        </button>
        {this.state.open && <div>
          {this.props.subLinks.map(items => (
            <SafeLink key={items.name} to={items.url}>{items.name}</SafeLink>
          ))}
        </div>}
      </Fragment>
    )

  }
};

FrontpageMenuitemExtention.propTypes = {
  children: PropTypes.node.isRequired,
  subLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

export default FrontpageMenuitemExtention;
