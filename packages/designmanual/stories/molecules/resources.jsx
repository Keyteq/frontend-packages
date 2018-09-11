/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';

import {
  ResourcesWrapper,
  ResourceGroup,
  ResourcesTopicTitle,
  ContentTypeBadge,
  constants,
} from 'ndla-ui';
import {
  learningPathResources,
  articleResources,
  exerciseResources,
  assessmentResources,
} from '../../dummydata/index';

const { contentTypes } = constants;

const toLink = () => ({
  to: '#',
});

const resourceGroup1 = {
  id: 'type-learning-path',
  title: 'Læringsstier',
  contentType: contentTypes.LEARNING_PATH,
  resources: learningPathResources,
};

const resourceGroup2 = {
  id: 'subject-material',
  title: 'Fagstoff',
  contentType: contentTypes.SUBJECT_MATERIAL,
  resources: articleResources,
};

const resourceGroup3 = {
  id: 'tasks-and-activities',
  title: 'Oppgaver og aktiviteter',
  contentType: contentTypes.TASKS_AND_ACTIVITIES,
  resources: exerciseResources,
};

const resourceGroup4 = {
  id: 'assessment-resources',
  title: 'Vurderingsressurser',
  contentType: contentTypes.ASSESSMENT_RESOURCES,
  resources: assessmentResources,
};

const resourceGroups = [
  resourceGroup1,
  resourceGroup2,
  resourceGroup3,
  resourceGroup4,
];

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdditionalResources: false,
      showAdditionalDialog: false,
    };
    this.toggleAdditionalResources = this.toggleAdditionalResources.bind(this);
    this.toggleAdditionalDialog = this.toggleAdditionalDialog.bind(this);
  }

  toggleAdditionalResources() {
    this.setState(prevState => ({
      showAdditionalResources: !prevState.showAdditionalResources,
    }));
  }

  toggleAdditionalDialog() {
    this.setState(prevState => ({
      showAdditionalDialog: !prevState.showAdditionalDialog,
    }));
  }

  render() {
    const { showAdditionalResources, showAdditionalDialog } = this.state;
    const hasAdditionalResources = resourceGroups.some(group =>
      group.resources.some(resource => resource.additional),
    );
    return (
      <ResourcesWrapper
        header={
          <ResourcesTopicTitle
            messages={{
              label: 'Læringsressurser',
              additionalFilterLabel: 'Vis tilleggsressurser',
            }}
            explainationIconLabelledBy="learning-resources-info-header-id"
            id="learning-resources-id"
            title="Havbunnsløsninger"
            toggleAdditionalResources={this.toggleAdditionalResources}
            showAdditionalResources={showAdditionalResources}
            hasAdditionalResources={hasAdditionalResources}
            toggleAdditionalDialog={this.toggleAdditionalDialog}
            showAdditionalDialog={showAdditionalDialog}
          />
        }>
        {resourceGroups.map(group => (
          <ResourceGroup
            key={group.id}
            title={group.title}
            resources={group.resources}
            showAdditionalResources={showAdditionalResources}
            toggleAdditionalResources={this.toggleAdditionalResources}
            contentType={group.contentType}
            icon={<ContentTypeBadge type={group.contentType} />}
            resourceToLinkProps={toLink}
          />
        ))}
      </ResourcesWrapper>
    );
  }
}

export default Resources;
