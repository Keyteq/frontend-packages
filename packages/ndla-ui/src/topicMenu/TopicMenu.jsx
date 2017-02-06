/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import BEMHelper from 'react-bem-helper';
import SubtopicLinkList from './SubtopicLinkList';
import { TopicShape } from '../shapes';

const lclasses = new BEMHelper({
  name: 'topic-menu',
  prefix: 'l-',
});

const classes = new BEMHelper({
  name: 'topic-menu',
  prefix: 'c-',
});

export default class TopicMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedTopicId: undefined,
    };

    this.closeCallback = null;
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentWillUnmount() {
    if (this.closeCallback) {
      clearTimeout(this.closeCallback);
    }
  }

  handleMouseOver(topicId) {
    if (this.closeCallback) {
      clearTimeout(this.closeCallback);
      this.closeCallback = null;
    }
    this.setState({ expandedTopicId: topicId });
  }

  handleMouseLeave() {
    this.closeCallback = setTimeout(() => {
      this.setState({ expandedTopicId: undefined });
    }, this.props.delay);
  }

  render() {
    const { topics, toTopic, close: closeMenu } = this.props;
    const { expandedTopicId } = this.state;
    const expandedTopic = topics.find(topic => topic.id === expandedTopicId);
    return (
      <div {...lclasses(null, null, 'o-wrapper u-1/1')} onMouseLeave={this.handleMouseLeave}>
        <ul {...classes('list', null, lclasses('left').className)}>
          { topics.map(topic =>
            (<li {...classes('topic-item', topic.id === expandedTopicId && 'active')} onMouseOver={() => this.handleMouseOver(topic.id)} key={topic.id}>
              <Link {...classes('link')} onClick={closeMenu} to={toTopic(topic.id)}>{ topic.name }</Link>
            </li>),
          ) }
        </ul>
        { expandedTopic ?
          <SubtopicLinkList
            classes={classes}
            className={lclasses('right').className}
            closeMenu={closeMenu}
            topic={expandedTopic}
            toTopic={toTopic}
          /> : null}
      </div>
    );
  }
}

TopicMenu.propTypes = {
  topics: PropTypes.arrayOf(TopicShape).isRequired,
  toTopic: PropTypes.func.isRequired,
  close: PropTypes.func,
  delay: PropTypes.number,
};

TopicMenu.defaultProps = {
  delay: 500,
};
