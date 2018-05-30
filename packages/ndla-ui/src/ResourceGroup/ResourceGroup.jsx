/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { ResourceShape, ContentTypeShape } from '../shapes';
import ResourceList from './ResourceList';
import ResourceToggleFilter from './ResourceToggleFilter';
import ResourcesTitle from '../ResourcesWrapper/ResourcesTitle';

const classes = new BEMHelper({
  name: 'resource-group',
  prefix: 'c-',
});

const ResourceGroup = ({
  title,
  icon,
  resources,
  toggleAdditionalResources,
  showAdditionalResources,
  resourceToLinkProps,
  messages,
  modifier,
  contentType,
}) => (
  <section {...classes('', [contentType, modifier])}>
    <header {...classes('header')}>
      <ResourcesTitle>{title}</ResourcesTitle>
    </header>
    {resources.length > 0 ? (
      <ResourceList
        resourceToLinkProps={resourceToLinkProps}
        onClick={toggleAdditionalResources}
        showAdditionalResources={showAdditionalResources}
        icon={icon}
        messages={messages}
        resources={resources}
      />
    ) : null}
  </section>
);

ResourceGroup.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  modifier: PropTypes.string,
  contentType: ContentTypeShape.isRequired,
  resources: PropTypes.arrayOf(ResourceShape).isRequired,
  toggleAdditionalResources: PropTypes.func.isRequired,
  resourceToLinkProps: PropTypes.func.isRequired,
  hideResourceToggleFilter: PropTypes.bool,
  empty: PropTypes.bool,
  messages: PropTypes.shape({
    activateAdditionalResources: PropTypes.string.isRequired,
    noCoreResourcesAvailable: PropTypes.string.isRequired,
    toggleFilterLabel: PropTypes.string.isRequired,
  }),
};

ResourceGroup.defaultProps = {
  hideResourceToggleFilter: false,
  modifier: '',
};

export default ResourceGroup;
