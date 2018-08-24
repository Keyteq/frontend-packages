/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import {
  Masthead,
  MastheadItem,
  Logo,
  Button,
  TopicMenu,
  DisplayOnPageYOffset,
  SearchField,
  SafeLink,
  Modal,
  createUniversalPortal,
} from 'ndla-ui';

import { Search, Home } from 'ndla-icons/common';
import { Cross } from 'ndla-icons/action';

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

const classes = BEMHelper({
  prefix: 'c-',
  name: 'toggle-search-button',
  outputIsString: true,
});

const searchFieldClasses = BEMHelper({
  prefix: 'c-',
  name: 'search-field',
});

const TopicMenuClasses = new BEMHelper({
  name: 'topic-menu',
  prefix: 'c-',
});

const SubjectOverviewButton = ({ children, scrollUp }) => {
  const content = (
    <div
      {...TopicMenuClasses('back', {
        narrow: true,
        scrollUp,
      })}>
      <SafeLink {...TopicMenuClasses('back-link')} to="/">
        <Home {...TopicMenuClasses('home-icon', '', 'c-icon--20')} />
        {children}
      </SafeLink>
    </div>
  );
  return createUniversalPortal(content, 'body');
};

SubjectOverviewButton.propTypes = {
  children: PropTypes.node.isRequired,
  scrollUp: PropTypes.bool.isRequired,
}

class MastheadWithTopicMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      expandedTopicId: null,
      expandedSubtopicsId: [],
      filterMenuValues: ['Medieuttrykk'],
      scrollUp: false,
    };
    this.searchFieldRef = React.createRef();
  }

  renderSearchField() {
    const searchFieldResults =
      this.state.value.length > 1 ? contentTypeResults : null;

    return (
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
        filters={[{ value: 'Value', title: 'Medieuttrykk og mediesamfunn' }]}
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
    );
  }

  render() {
    let searchButtonView = null;

    if (!this.props.hideSearchButton) {
      searchButtonView = (
        <Modal
          backgroundColor="gray"
          animation="slide-down"
          animationDuration={200}
          size="full-width"
          onOpen={() => {
            this.searchFieldRef.current
              .getElementsByTagName('input')[0]
              .focus();
          }}
          onClose={() => {
            this.setState({ value: '' });
          }}
          className="c-search-field__overlay-content"
          activateButton={
            <button
              type="button"
              className="c-button c-toggle-search-button__button c-toggle-search-button__button--wide">
              <span className={classes('button-text')}>Søk</span>
              <Search />
            </button>
          }>
          {onClose => (
            <Fragment>
              <div className="c-search-field__overlay-top" />
              <div ref={this.searchFieldRef} {...searchFieldClasses('header')}>
                <div {...searchFieldClasses('header-container')}>
                  {this.renderSearchField()}
                  <Button stripped onClick={onClose}>
                    <Cross className="c-icon--medium" />
                  </Button>
                </div>
              </div>
            </Fragment>
          )}
        </Modal>
      );
    }

    return (
      <Masthead
        fixed
        hideOnNarrowScreen={this.props.hideOnNarrowScreen}
        infoContent={this.props.beta && this.props.betaInfoContent}>
        <MastheadItem left>
          {this.state.renderToFrontpageButton && <SubjectOverviewButton scrollUp={this.state.scrollUp}>{messages.subjectOverview}</SubjectOverviewButton>}
          <Modal
            size="fullscreen"
            activateButton={
              <Button outline className="c-topic-menu-toggle-button">
                Meny
              </Button>
            }
            animation="subtle"
            animationDuration={150}
            backgroundColor="gray"
            noBackdrop
            onOpen={() => {
              this.setState({
                renderToFrontpageButton: true,
              })
            }}
            onClose={() => {
              this.setState({
                renderToFrontpageButton: false,
                expandedTopicId: null,
                expandedSubtopicsId: [],
              });
            }}>
            {onClose => (
              <TopicMenu
                id="mastheadSearchId"
                close={onClose}
                isBeta={this.props.beta}
                searchFieldComponent={searchButtonView}
                subjectTitle="Mediefag"
                scrollUp={this.state.scrollUp}
                scrollingContent={scrollUp => {
                  this.setState({
                    scrollUp,
                  });
                }}
                toSubject={() => '#'}
                toTopic={() => '#'}
                topics={topicMenu}
                messages={messages}
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
                competenceGoals={
                  <CompetenceGoalsExample menu subjectName="Mediefag" />
                }
                onFilterClick={values => {
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
          </Modal>
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
