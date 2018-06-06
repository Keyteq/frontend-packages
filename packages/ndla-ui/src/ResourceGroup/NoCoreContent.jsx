/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { Button } from 'ndla-ui';
import { ResourceShape } from '../shapes';

const classes = new BEMHelper({
  name: 'topic-resource',
  prefix: 'c-',
});

export const NoCoreContent = ({ messages, onClick }) => {
  <div {...classes('additional-resources-trigger')}>
    <span>
      <div>
        <p>{messages.noCoreResourcesAvailable}</p>
        <Button outline onClick={onClick}>
          {messages.activateAdditionalResources}
        </Button>
      </div>
    </span>
  </div>
};

NoCoreContent.propTypes = {
  onClick: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    noCoreResourcesAvailable: PropTypes.string.isRequired,
    activateAdditionalResources: PropTypes.string.isRequired,
  }).isRequired,
}

export default NoCoreContent;
