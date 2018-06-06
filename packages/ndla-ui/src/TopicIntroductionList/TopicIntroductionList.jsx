/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import SafeLink from '../common/SafeLink';
import { TopicShape, ShortcutShape } from '../shapes';
import TopicIntroductionShortcuts from './TopicIntroductionShortcuts';
import { Additional, Core } from 'ndla-icons/common';
import { Tooltip, NoContentBox } from 'ndla-ui';

const topicClasses = new BEMHelper({
  prefix: 'c-',
  name: 'topic-introduction',
  outputIsString: true,
});

const TopicIntroduction = ({
  toTopic,
  topic,
  subjectPage,
  shortcuts,
  messages,
  shortcutAlwaysExpanded,
  additional,
  showAdditionalCores,
}) => (
  <li
    className={topicClasses('item', {
      subjectPage,
      additional,
      showAdditionalCores,
    })}>
    <article className={topicClasses('body')}>
      <div className={topicClasses('heading-wrapper')}>
        <h1 className={topicClasses('header')}>
          <SafeLink to={toTopic(topic.id)}>{topic.name}</SafeLink>
        </h1>
        {additional && (
          <Tooltip tooltip={messages.tooltipAdditionalTopic} align="right">
            <Additional className="c-icon--20 u-margin-left-tiny" />
          </Tooltip>
        )}
        {!additional &&
          showAdditionalCores && (
            <Tooltip tooltip={messages.tooltipCoreTopic} align="right">
              <Core className="c-icon--20 u-margin-left-tiny" />
            </Tooltip>
          )}
      </div>
      {/* Since topic introduction is already escaped from the api
        we run into a double escaping issues as React escapes all strings.
        Use dangerouslySetInnerHTML to circumvent the issue */}
      <p dangerouslySetInnerHTML={{ __html: topic.introduction }} />
      {shortcuts && (
        <TopicIntroductionShortcuts
          alwaysExpanded={shortcutAlwaysExpanded}
          id={`${topic.id}_shortcuts`}
          shortcuts={shortcuts}
          messages={{
            toggleButtonText: messages.shortcutButtonText,
          }}
        />
      )}
    </article>
  </li>
);

TopicIntroduction.propTypes = {
  messages: PropTypes.shape({
    shortcutButtonText: PropTypes.string.isRequired,
    tooltipAdditionalTopic: PropTypes.string,
    tooltipCoreTopic: PropTypes.string,
  }),
  topic: TopicShape.isRequired,
  toTopic: PropTypes.func.isRequired,
  subjectPage: PropTypes.bool,
  shortcuts: PropTypes.arrayOf(ShortcutShape),
  twoColumns: PropTypes.bool,
  shortcutAlwaysExpanded: PropTypes.bool,
};

const TopicIntroductionList = ({
  topics,
  twoColumns,
  shortcutAlwaysExpanded,
  showAdditionalCores,
  toggleAdditionalCores,
  messages,
  ...rest
}) => {
  const renderAdditionalTopicsTrigger =
    !showAdditionalCores &&
    topics.filter(topic => topic.additional).length > 0 &&
    topics.filter(topic => !topic.additional).length === 0;

  return (
    <ul className={topicClasses('list', { twoColumns })}>
      {topics.map(topic => {
        const { shortcuts, additional } = topic;
        return (
          <TopicIntroduction
            key={topic.id}
            {...rest}
            topic={topic}
            shortcuts={shortcuts}
            additional={additional}
            showAdditionalCores={showAdditionalCores}
            shortcutAlwaysExpanded={shortcutAlwaysExpanded}
            messages={messages}
          />
        );
      })}
      {renderAdditionalTopicsTrigger && (
        <NoContentBox onClick={toggleAdditionalCores} text={messages.noContentBoxLabel} buttonText={messages.noContentBoxButtonText} />
      )}
    </ul>
  );
}

TopicIntroductionList.propTypes = {
  toTopic: PropTypes.func.isRequired,
  topics: PropTypes.arrayOf(TopicShape).isRequired,
  twoColumns: PropTypes.bool,
  shortcutAlwaysExpanded: PropTypes.bool,
  showAdditionalCores: PropTypes.bool,
  toggleAdditionalCores: PropTypes.func.isRequired,
  messages: PropTypes.shape({
    noContentBoxLabel: PropTypes.string.isRequired,
    noContentBoxButtonText: PropTypes.string.isRequired,
  }).isRequired,
};

TopicIntroductionList.defaultProps = {
  twoColumns: false,
  shortcutAlwaysExpanded: false,
  showAdditionalCores: false,
};

export default TopicIntroductionList;
