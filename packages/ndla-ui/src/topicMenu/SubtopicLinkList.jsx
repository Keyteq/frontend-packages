/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Back } from 'ndla-icons/common';

import SafeLink from '../common/SafeLink';
import { TopicShape } from '../shapes';

const SubtopicLink = ({
  classes,
  closeMenu,
  to,
  subtopic: { subtopics, id, name },
  onSubtopicExpand,
  expandedSubtopicId,
}) => {
  const active = id === expandedSubtopicId;
  const hasSubtopics = Array.isArray(subtopics) && subtopics.length > 0;
  return (
    <li {...classes('subtopic-item', active && 'active')} key={id}>
      <SafeLink
        {...classes('link')}
        onClick={event => {
          if (hasSubtopics) {
            event.preventDefault();
            onSubtopicExpand(id);
          } else {
            closeMenu();
          }
        }}
        to={to}>
        {name}
      </SafeLink>
    </li>
  );
};

SubtopicLink.propTypes = {
  classes: PropTypes.func.isRequired,
  closeMenu: PropTypes.func,
  subtopic: TopicShape.isRequired,
  to: PropTypes.string.isRequired,
  onSubtopicExpand: PropTypes.func,
  expandedSubtopicId: PropTypes.string,
  toTopic: PropTypes.func,
};

class SubtopicLinkList extends Component {
  constructor(props) {
    super(props);
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
    } = this.props;

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
        <ul {...classes('list')}>
          {topic.subtopics.map(subtopic => (
            <SubtopicLink
              onSubtopicExpand={onSubtopicExpand}
              expandedSubtopicId={expandedSubtopicId}
              classes={classes}
              closeMenu={closeMenu}
              key={subtopic.id}
              to={toTopic(topic.id, subtopic.id)}
              subtopic={subtopic}
              toTopic={toTopic}
            />
          ))}
        </ul>
      </div>
    );
  }
}

SubtopicLinkList.propTypes = {
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
  }).isRequired,
};

export default SubtopicLinkList;
