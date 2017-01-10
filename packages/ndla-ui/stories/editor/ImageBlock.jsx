/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */


import React, { PropTypes, Component } from 'react';
import { Entity } from 'draft-js';

export default class ImageBlock extends Component {
  constructor(props) {
    super(props);

    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleFocus() {
    this.props.blockProps.setReadOnly(true);
  }

  handleBlur() {
    this.props.blockProps.setReadOnly(false);
  }

  handleCaptionChange(event) {
    event.stopPropagation();
    const { blockProps } = this.props;
    blockProps.updateData({ caption: event.target.value });
  }


  render() {
    const { className, block } = this.props;
    // const { src, caption } = Entity.get(block.getEntityAt(0)).getData();
    const { src } = Entity.get(block.getEntityAt(0)).getData();
    const caption = block.getData().get('caption');

    return (
      <div onBlur={this.handleBlur} onFocus={this.handleFocus}>
        <img
          src={src}
          role="presentation"
          className={className}
        />

        <div>
          <input
            placeholder="Caption"
            value={caption}
            onChange={this.handleCaptionChange}
          />
        </div>
      </div>
    );
  }
}
ImageBlock.propTypes = {
  className: PropTypes.string,
  block: PropTypes.shape({
  }).isRequired,
  blockProps: PropTypes.shape({
    setReadOnly: PropTypes.func.isRequired,
    updateData: PropTypes.func.isRequired,
  }),
};
