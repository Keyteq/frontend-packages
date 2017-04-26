/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import BEMHelper from 'react-bem-helper';
import SafeLink from '../common/SafeLink';
import { ResourceShape } from '../shapes';
import { Icon } from '../';

const classes = new BEMHelper({
  name: 'topic-resource',
  prefix: 'c-',
});

const Resource = ({ resource, resourceToLinkProps }) => (
  <li {...classes('item o-flag o-flag--top')}>
    <div {...classes('icon o-flag__img')}>
      { resource.icon === 'Fagstoff' && <Icon.Document /> }
      { resource.icon === 'Læringssti' && <Icon.Path /> }
      { resource.icon === 'Oppgave' && <Icon.Pencil /> }
    </div>
    <div {...classes('body o-flag__body')}>
      <h1 {...classes('title')}><SafeLink {...resourceToLinkProps(resource)}>{resource.name}</SafeLink></h1>
    </div>
  </li>
);

Resource.propTypes = {
  resource: ResourceShape.isRequired,
  resourceToLinkProps: PropTypes.func.isRequired,
};

const ResourceList = ({ resources, ...rest }) => (
  <ul {...classes('list')} >
    { resources.map(resource => <Resource key={resource.id} {...rest} resource={resource} />)}
  </ul>
  );

ResourceList.propTypes = {
  resources: PropTypes.arrayOf(ResourceShape).isRequired,
  resourceToLinkProps: PropTypes.func.isRequired,
};

export default ResourceList;
