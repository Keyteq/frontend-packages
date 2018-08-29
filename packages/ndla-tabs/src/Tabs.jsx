/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs as ReactTabs, TabList, TabPanel } from 'react-tabs';
import isFunction from 'lodash/isFunction';
import BEMHelper from 'react-bem-helper';

const classes = new BEMHelper({
  name: 'tabs',
  prefix: 'c-',
});

class Tabs extends Component {
  constructor(props) {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: props.selectedIndex || 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { index } = this.state;

    if (
      nextProps.selectedIndex !== undefined &&
      nextProps.selectedIndex !== index
    ) {
      this.setState({ index: nextProps.selectedIndex });
    }
  }

  handleSelect(index, last) {
    this.setState({
      index,
    });

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(index, last);
    }
  }

  render() {
    const { tabs, forceRenderTabPanel, modifier } = this.props;
    const { index } = this.state;

    return (
      <ReactTabs
        {...classes({ modifier })}
        onSelect={this.handleSelect}
        selectedIndex={this.state.index}
        forceRenderTabPanel={forceRenderTabPanel}>
        <TabList {...classes('list', modifier)}>
          {tabs.map((tab, i) => (
            <Tab
              {...classes('tab', {
                selected: i === index,
                disabled: tab.disabled,
                [modifier]: modifier,
              })}
              key={tab.key ? tab.key : i}
              tabIndex={tab.disabled ? '-1' : '0'}
              disabled={tab.disabled}>
              {tab.title}
            </Tab>
          ))}
        </TabList>
        {tabs.map((tab, i) => (
          <TabPanel {...classes('panel', modifier)} key={tab.key ? tab.key : i}>
            {isFunction(tab.content) ? tab.content() : tab.content}
          </TabPanel>
        ))}
      </ReactTabs>
    );
  }
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
      disabled: PropTypes.string.bool,
    }),
  ),
  onSelect: PropTypes.func,
  modifier: PropTypes.string,
  forceRenderTabPanel: PropTypes.bool,
  selectedIndex: PropTypes.number,
};

export default Tabs;
