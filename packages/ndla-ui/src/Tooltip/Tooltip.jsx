/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { Fade } from '../Animation';

const classes = new BEMHelper({
  name: 'tooltip',
  prefix: 'c-',
});

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showtooltip: false,
    };
    this.handleShowTooltip = this.handleShowTooltip.bind(this);
    this.handleHideTooltip = this.handleHideTooltip.bind(this);
  }

  handleShowTooltip() {
    this.setState({ showtooltip: true });
  }

  handleHideTooltip() {
    this.setState({ showtooltip: false });
  }

  render() {
    return (
      <div>
        <Fade in={this.state.showtooltip}>
          <span {...classes('', this.props.align)}>{this.props.tooltip}</span>
        </Fade>
        <div
          onMouseEnter={this.handleShowTooltip}
          onMouseLeave={this.handleHideTooltip}
          onFocus={this.handleShowTooltip}
          onBlur={this.handleHideTooltip}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'right']),
};

Tooltip.defaultProps = {
  align: undefined,
};

export default Tooltip;
