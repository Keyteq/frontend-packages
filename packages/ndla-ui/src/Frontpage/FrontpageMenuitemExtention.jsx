/*
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { SafeLink } from 'ndla-ui';

const classesExtention = BEMHelper('c-frontpage-menuitem-extention');
const linkClass = BEMHelper('c-frontpage-subjects-section');

class FrontpageMenuitemExtention extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCloseFromLink = this.handleCloseFromLink.bind(this);
    this.containerRef = React.createRef();
  }

  handleCloseFromLink(e) {
    if (e.target.nextSibling === null) {
      this.handleClose();
    }
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div className={this.state.open ? 'c-frontpage-menuitem-extention-container-active' : undefined} ref={this.containerRef} onMouseEnter={this.handleOpen} onMouseLeave={this.handleClose} onFocus={this.handleOpen}>
        <SafeLink
          {...linkClass('link', { 'with-extention': this.state.open })}
          to={this.props.to}
        >
          {this.props.children}
          {this.state.open && <div className="c-frontpage-menuitem-extention-active-border" />}
        </SafeLink>

        {this.state.open && (<div {...classesExtention()}>
          {this.props.subLinks.map(items => (
            <SafeLink key={items.name} to={items.url} onBlur={this.handleCloseFromLink}>{items.name}</SafeLink>
          ))}
        </div>)}
      </div>
    )

  }
};

FrontpageMenuitemExtention.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  subLinks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

export default FrontpageMenuitemExtention;
