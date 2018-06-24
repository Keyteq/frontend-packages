/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Back, Additional } from 'ndla-icons/common';

import { SafeLink, SearchToggleFilter } from 'ndla-ui';
import { TopicShape } from '../shapes';

import { ContentTypeResult } from '../Search';

const SubtopicLink = ({
  classes,
  to,
  subtopic: { id, name, additional },
  onSubtopicExpand,
  expandedSubtopicId,
}) => {
  const active = id === expandedSubtopicId;

  return (
    <li {...classes('subtopic-item', active && 'active')} key={id}>
      <SafeLink
        {...classes('link')}
        onClick={event => {
          event.preventDefault();
          onSubtopicExpand(id);
        }}
        to={to}>
        {name}
        {additional && <Additional className="c-icon--20" />}
      </SafeLink>
    </li>
  );
};

SubtopicLink.propTypes = {
  classes: PropTypes.func.isRequired,
  subtopic: TopicShape.isRequired,
  to: PropTypes.string.isRequired,
  onSubtopicExpand: PropTypes.func,
  expandedSubtopicId: PropTypes.string,
  toTopic: PropTypes.func,
};

class SubtopicLinkList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdditionalResources: false,
    };
    this.toggleAdditionalResources = this.toggleAdditionalResources.bind(this);
    this.containerRef = null;
  }

  componentDidMount() {
    this.setFocusOnFirstLink();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic.id !== prevProps.topic.id) {
      this.setFocusOnFirstLink();
    }
  }

  setFocusOnFirstLink() {
    this.containerRef.querySelector('a').focus();
  }

  toggleAdditionalResources() {
    this.setState({
      showAdditionalResources: !this.state.showAdditionalResources,
    })
  }

  render() {
    const {
      className,
      classes,
      closeMenu,
      topic,
      toTopic,
      expandedSubtopicId,
      onSubtopicExpand,
      onGoBack,
      messages,
      resourceToLinkProps,
    } = this.props;

    const { showAdditionalResources } = this.state;

    const hasSubTopics = topic.subtopics && topic.subtopics.length > 0;
    const hasContentTypeResults =
      topic.contentTypeResults && topic.contentTypeResults.length > 0;

    const hasContentTypeInfo = hasContentTypeResults && topic.contentTypeResults.some(result => (result.contentType));
    return (
      <div
        className={className}
        ref={ref => {
          this.containerRef = ref;
        }}>
        <button {...classes('back-button')} onClick={onGoBack}>
          <Back /> <span>{messages.backButton}</span>
        </button>
        <SafeLink
          {...classes('link', ['big'])}
          onClick={closeMenu}
          to={toTopic(topic.id)}>
          <span {...classes('link-label')}>{messages.goToLabel}: </span>
          <span {...classes('link-target')}>
            {topic.name} <span {...classes('arrow')}>›</span>
          </span>
        </SafeLink>
        {hasSubTopics && (
          <ul {...classes('list')}>
            {topic.subtopics.map(subtopic => (
              <SubtopicLink
                onSubtopicExpand={onSubtopicExpand}
                expandedSubtopicId={expandedSubtopicId}
                classes={classes}
                key={subtopic.id}
                to={toTopic(topic.id, subtopic.id)}
                subtopic={subtopic}
              />
            ))}
          </ul>
        )}
        {hasContentTypeResults && (
          <aside {...classes('content-type-results', hasContentTypeInfo ? 'with-content-badges' : '')}>
            <div>
              <h1>{messages.learningResourcesHeading}</h1>
              {messages.additionalFilterLabel && <SearchToggleFilter
                checked={showAdditionalResources}
                label={messages.additionalFilterLabel}
                onClick={this.toggleAdditionalResources}
              />}
            </div>
            {topic.contentTypeResults.map(result => (
              <ContentTypeResult
                resourceToLinkProps={resourceToLinkProps}
                onNavigate={closeMenu}
                key={result.title}
                contentTypeResult={result}
                messages={{
                  allResultLabel: messages.contentTypeResultsShowMore,
                  showLessResultLabel: messages.contentTypeResultsShowLess,
                  noHit: messages.contentTypeResultsNoHit,
                }}
                iconOnRight
                showAdditionalResources={showAdditionalResources || !messages.additionalFilterLabel }
              />
            ))}
          </aside>
        )}
      </div>
    );
  }
}

SubtopicLinkList.propTypes = {
  resourceToLinkProps: PropTypes.func.isRequired,
  expandedSubtopicId: PropTypes.string,
  onSubtopicExpand: PropTypes.func,
  classes: PropTypes.func.isRequired,
  className: PropTypes.string,
  closeMenu: PropTypes.func.isRequired,
  topic: TopicShape.isRequired,
  toTopic: PropTypes.func.isRequired,
  onGoBack: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    goToLabel: PropTypes.string.isRequired,
    backButton: PropTypes.string.isRequired,
    contentTypeResultsShowMore: PropTypes.string.isRequired,
    contentTypeResultsShowLess: PropTypes.string.isRequired,
    learningResourcesHeading: PropTypes.string.isRequired,
    contentTypeResultsNoHit: PropTypes.string.isRequired,
    additionalFilterLabel: PropTypes.string, // should be required
  }).isRequired,
};

export default SubtopicLinkList;
