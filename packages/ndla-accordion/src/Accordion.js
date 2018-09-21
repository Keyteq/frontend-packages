/**
 * Copyright (c) 2017-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { ChevronDown, ChevronUp } from 'ndla-icons/common';

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const AccordionChildWrapper = styled.section`
  display: flex;
  overflow-y: scroll;
  transition: opacity 300ms ease;
  opacity: 1;
  ${props =>
    css`
      max-height: ${props.maxHeight}px;
    `};
  &.closed {
    max-height: 0;
    opacity: 0;
    > div {
      display: none !important;
    }
  }
`

const AccordionTitleBar = styled.button`
  border-radius: 3px;
  backgroundColor: #ccc;
  padding: 0.25em 1em;
  color: palevioletred;
  display: flex;
  alignItems: space-between;
  justifyContent: center;

  ${props =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `};
`

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsOpen: props.tabs.map((tab, index) => (tab.open ? index : null)).filter(isOpen => isOpen !== null),
    };
    this.toggleTab = this.toggleTab.bind(this);
    this.updateRefs();
  }

  updateRefs() {
    this.refArray = this.props.tabs.map(() => React.createRef());
  }

  toggleTab(index) {
    const { tabsOpen } = this.state;
    const { controllable, toggleTab, onlyOpenOne } = this.props;

    if (controllable) {
      toggleTab(index);
    } else if (onlyOpenOne) {
      this.setState({
        tabsOpen: [index],
      });
    } else if (tabsOpen.includes(index)) {
      tabsOpen.splice(tabsOpen.indexOf(index), 1);
      this.setState({
        tabsOpen,
      });
    } else {
      tabsOpen.push(index);
      this.setState({
        tabsOpen,
      });
    }
  }

  render() {

    const {
      tabsOpen,
    } = this.state;

    return (
      <AccordionWrapper>
        {this.props.tabs.map((tab, index) => {
          const expanded = tabsOpen.includes(index);
          const tabId = `${tab.title}-id`;
          return (<Fragment key={tab.title}>
            <AccordionTitleBar onClick={(e) => this.toggleTab(index, e)} aria-expanded={expanded} aria-controls={tabId}>
              {tab.title}
              {expanded ? (
                <ChevronDown />
              ) : (
                <ChevronUp />
              )}
            </AccordionTitleBar>
            <AccordionChildWrapper maxHeight={this.props.maxHeight} className={expanded ? '' : 'closed'} id={tabId} aria-hidden={expanded}>
              <div>{tab.children}</div>
            </AccordionChildWrapper>
          </Fragment>);
        })}
      </AccordionWrapper>
    );
  }
}

Accordion.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    open: PropTypes.bool,
  })).isRequired,
  controllable: PropTypes.bool,
  onlyOpenOne: PropTypes.bool,
  toggleTab: PropTypes.func,
  maxHeight: PropTypes.number,
};

Accordion.defaultProps = {
  maxHeight: 1000,
};

export default Accordion;
