/*
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { SafeLink, Button } from 'ndla-ui';

const classesMainLink = BEMHelper('c-frontpage-subjects-section');
const classesExtention = BEMHelper('c-frontpage-menuitem-extention');

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
        <Button stripped type="button" onClick={this.handleOpen} {...classesMainLink('link')}>
          {this.props.children}
        </Button>
        {this.state.open && <div {...classesExtention()}>
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
