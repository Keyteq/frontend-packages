/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Masthead,
  MastheadItem,
  Logo,
  Button,
  TopicMenu,
  DisplayOnPageYOffset,
  ToggleSearchButton,
  SearchOverlay,
  SearchField,
  SafeLink,
  ModalButton,
} from 'ndla-ui';

import { topicMenu, contentTypeResults } from '../../dummydata';
import { BreadcrumbBlock } from './breadcrumbs';

import CompetenceGoalsExample from '../organisms/CompetenceGoalsExample';

export const MastheadWithLogo = () => (
  <Masthead fixed>
    <MastheadItem right>
      <Logo to="#" label="Nasjonal digital læringsarena" />
    </MastheadItem>
  </Masthead>
);

const messages = {
  closeButton: 'Lukk',
  goTo: 'Gå til',
  subjectOverview: 'Alle fag',
  search: 'Søk',
  subjectPage: 'Fagforside',
  learningResourcesHeading: 'Læringsressurser',
  back: 'Tilbake',
  contentTypeResultsShowMore: 'Vis mer',
  contentTypeResultsShowLess: 'Vis mindre',
  contentTypeResultsNoHit: 'Ingen ressurser',
  competenceGoalsToggleButtonOpen: 'Vis kompetansemål',
  competenceGoalsToggleButtonClose: 'Lukk kompetansemål',
  competenceGoalsNarrowOpenButton: 'Vis kompetansemål',
  competenceGoalsNarrowBackButton: 'Tilbake',
  additionalTooltipLabel: 'Tilleggsstoff',
  additionalFilterLabel: 'Vis tilleggsressurser',
};

class MastheadWithTopicMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filterIsOpen: false,
      expandedTopicId: null,
      expandedSubtopicsId: [],
      filterMenuValues: ['Medieuttrykk'],
    };
  }

  render() {
    const searchFieldResults =
      this.state.value.length > 1 ? contentTypeResults : null;

    let searchButtonView = null;

    if (!this.props.hideSearchButton) {
      searchButtonView = (
        <ToggleSearchButton
          id="ToggleSearchButtonId"
          messages={{ buttonText: 'Søk' }}>
          {(onClose, isOpen) => (
            <SearchOverlay close={onClose} isOpen={isOpen}>
              <SearchField
                placeholder="Søk i fagstoff, oppgaver og aktiviteter eller læringsstier"
                value={this.state.value}
                onChange={event => {
                  this.setState({
                    value: event.currentTarget.value,
                  });
                }}
                onSearch={e => {
                  /* eslint-disable no-console */
                  console.log(
                    'search for:',
                    e.target.getElementsByTagName('input')[0].value,
                  );
                  e.preventDefault();
                }}
                filters={[
                  { value: 'Value', title: 'Medieuttrykk og mediesamfunn' },
                ]}
                onFilterRemove={() => {}}
                messages={{
                  contentTypeResultShowLessLabel: 'Se færre',
                  contentTypeResultShowMoreLabel: 'Se alle',
                  allResultButtonText: 'Vis alle søketreff',
                  searchFieldTitle: 'Søk',
                  searchResultHeading: 'Forslag:',
                  contentTypeResultNoHit: 'Ingen treff',
                }}
                allResultUrl="#"
                searchResult={searchFieldResults}
                resourceToLinkProps={() => {}}
              />
            </SearchOverlay>
          )}
        </ToggleSearchButton>
      );
    }

    return (
      <Masthead
        fixed
        hideOnNarrowScreen={this.props.hideOnNarrowScreen}
        infoContent={this.props.beta && this.props.betaInfoContent}>
        <MastheadItem left>
          <ModalButton
            activateButton={<Button outline className="c-topic-menu-toggle-button">Meny</Button>}
            animation="subtle"
            willClose={() => {
              this.setState({
                expandedTopicId: null,
                expandedSubtopicsId: [],
              });
            }}>
            {(onClose) => (
              <TopicMenu
                id="mastheadSearchId"
                close={onClose}
                isBeta={this.props.beta}
                subjectTitle="Mediefag"
                toSubject={() => '#'}
                toTopic={() => '#'}
                topics={topicMenu}
                messages={messages}
                onToggleFilterOptions={(filterIsOpen) => {
                  this.setState({
                    filterIsOpen,
                  });
                }}
                filterOptions={[
                  {
                    title: 'Medieuttrykk',
                    value: 'Medieuttrykk',
                  },
                  {
                    title: 'Mediesamfunnet',
                    value: 'Mediesamfunnet',
                  },
                ]}
                filterValues={this.state.filterMenuValues}
                filterIsOpen={this.state.filterIsOpen}
                competenceGoals={<CompetenceGoalsExample menu subjectName="Mediefag" />}
                onFilterClick={(values) => {
                  this.setState({
                    filterMenuValues: values,
                  });
                }}
                resourceToLinkProps={() => {}}
                expandedTopicId={this.state.expandedTopicId}
                expandedSubtopicsId={this.state.expandedSubtopicsId}
                onNavigate={(expandedTopicId, subtopicId, currentIndex) => {
                  let { expandedSubtopicsId } = this.state;
                  if (expandedSubtopicsId.length > currentIndex) {
                    expandedSubtopicsId = expandedSubtopicsId.slice(
                      0,
                      currentIndex,
                    );
                  }
                  if (subtopicId) {
                    expandedSubtopicsId.push(subtopicId);
                  } else {
                    expandedSubtopicsId.pop();
                  }
                  this.setState({
                    expandedTopicId,
                    expandedSubtopicsId,
                  });
                }}
              />
            )}
          </ModalButton>
          <DisplayOnPageYOffset yOffsetMin={150}>
            <BreadcrumbBlock />
          </DisplayOnPageYOffset>
        </MastheadItem>
        <MastheadItem right>
          {searchButtonView}
          <Logo
            to="#"
            label="Nasjonal digital læringsarena"
            isBeta={this.props.beta}
          />
        </MastheadItem>
      </Masthead>
    );
  }
}

MastheadWithTopicMenu.propTypes = {
  searchFieldExpanded: PropTypes.bool,
  hideOnNarrowScreen: PropTypes.bool,
  hideSearchButton: PropTypes.bool,
  beta: PropTypes.bool,
  betaInfoContent: PropTypes.node,
};

MastheadWithTopicMenu.defaultProps = {
  searchFieldExpanded: false,
  betaInfoContent: (
    <Fragment>
      <span>Du tester nå de nye nettsidene.</span>{' '}
      <SafeLink to="#">Les mer om nye NDLA.no</SafeLink>
    </Fragment>
  ),
};

export { MastheadWithTopicMenu };

export default MastheadWithTopicMenu;
