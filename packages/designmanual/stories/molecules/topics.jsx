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
  TopicIntroductionList,
} from 'ndla-ui';
import { topicList } from '../../dummydata/index';

class Topics extends Component {
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
    return (
      <ResourcesWrapper
        header={
          showTopicHeading && (
            <ResourcesTopicTitle
              messages={{
                label: 'Emne',
                toggleFilterLabel: 'Vis tilleggsressurser',
                additionalDialogLabel: 'Hva er kjernestoff og tilleggstoff?',
                additionalDialogDescription1:
                  'Når du lærer deg kjernestoffet skaffer du deg den kompetansen som beskrives i læreplanen for faget.',
                additionalDialogDescription2:
                  'Tilleggstoff er innhold i faget som du kan velge i tillegg til kjernestoffet. Gjennom tilleggsstoffet kan du fordype deg i et emne eller tilnærme deg emnet på en annen måte.',
                additionalDialogTooptip: 'Hva er kjernestoff og tilleggstoff?',
              }}
              headerId="subject-header-id"
              title="Medieproduksjon"
              toggleAdditionalResources={this.toggleAdditionalResources}
              showAdditionalResources={showAdditionalResources}
              hasAdditionalResources
              toggleAdditionalDialog={this.toggleAdditionalDialog}
              showAdditionalDialog={showAdditionalDialog}
            />
          )
        }>
        <TopicIntroductionList
          toTopic={() => '#'}
          topics={topicList}
          subjectPage
          showAdditional={showAdditionalResources}
          messages={{
            shortcutButtonText: 'Lærestoff',
            tooltipCoreTopic: 'Kjernestoff er fagstoff som er på pensum',
            tooltipAdditionalTopic:
              'Tilleggsstoff er fagstoff som er på pensum',
          }}
        />
      </ResourcesWrapper>
    );
  }
}

Topics.propTypes = {
  showTopicHeading: PropTypes.bool,
};

Topics.defaultProps = {
  showTopicHeading: false,
};

export default Topics;
