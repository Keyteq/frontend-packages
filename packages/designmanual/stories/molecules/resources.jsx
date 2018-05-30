/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  onlyAdditionalResources,
} from '../../dummydata/index';

const { contentTypes } = constants;

const toLink = () => ({
  href: '#',
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

const resourceGroup5 = {
  id: 'empty-resources',
  title: 'Eksempel kun tilleggsressurser',
  contentType: 'example-empty-resources-with-additionals',
  resources: onlyAdditionalResources,
};

const resourceGroups = [
  resourceGroup1,
  resourceGroup2,
  resourceGroup5,
  resourceGroup3,
  resourceGroup4,
  resourceGroup5,
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
    this.setState({
      showAdditionalResources: !this.state.showAdditionalResources,
    });
  }
  toggleAdditionalDialog() {
    this.setState({
      showAdditionalDialog: !this.state.showAdditionalDialog,
    });
  }
  render() {
    const { showAdditionalResources, showAdditionalDialog } = this.state;
    const { showTopicHeading } = this.props;
    const hasAdditionalResources = resourceGroups.some(group => (
      group.resources.some(resource => (resource.additional))
    ));
    return (<ResourcesWrapper
      header={
        showTopicHeading && (
          <ResourcesTopicTitle
            messages={{
              label: 'Emne',
              toggleFilterLabel: 'Vis tilleggsemner',
              additionalDialogLabel: 'hva er kjernestoff og tilleggstoff?',
              additionalDialogDescription1: 'Når du lærer deg kjernestoffet skaffer du deg den kompetansen som beskrives i læreplanen for faget.',
              additionalDialogDescription2: 'Tilleggstoff er innhold i faget som du kan velge i tillegg til kjernestoffet. Gjennom tilleggsstoffet kan du fordype deg i et emne eller tilnærme deg emnet på en annen måte.',
            }}
            title="Medieproduksjon"
            toggleAdditionalResources={this.toggleAdditionalResources}
            showAdditionalResources={showAdditionalResources}
            hasAdditionalResources
            toggleAdditionalDialog={this.toggleAdditionalDialog}
            showAdditionalDialog={showAdditionalDialog}
          />
        )
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
          messages={{
            noCoreResourcesAvailable: 'Det er ikke noe kjernestoff tilgjengelig.',
            activateAdditionalResources: 'Vis tilleggsstoff',
            toggleFilterLabel: 'Tilleggsstoff',
          }}
          resourceToLinkProps={toLink}
          modifier={showAdditionalResources ? 'fakeloading' : ''}
        />
      ))}
    </ResourcesWrapper>);
  }
};

Resources.propTypes = {
  showTopicHeading: PropTypes.bool,
};

Resources.defaultProps = {
  showTopicHeading: false,
};

export default Resources;
