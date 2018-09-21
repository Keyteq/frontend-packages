/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { ChevronDown, ChevronUp } from 'ndla-icons/common';
import {
  fontSans,
  spacing,
  spacingSmall,
  spacingLarge,
  brandColor,
  brandGreyLightest,
  brandGreyLighter,
} from 'ndla-styles';

const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AccordionChildWrapper = styled.section`
  display: flex;
  overflow-y: scroll;
  transition: opacity 200ms ease;
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
  &.framedChildren > div {
    width: 100%;
    padding: ${spacing} ${spacing} ${spacingLarge};
    border: 1px solid ${brandColor};
    border-top: 0;
  }
`;

const AccordionTitleBar = styled.button`
  font-family: ${fontSans};
  background: ${brandGreyLightest};
  padding: ${spacingSmall} ${spacing};
  color: ${brandColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border: 0;
  border-bottom: 1px solid ${brandGreyLighter};
  transition: color 100ms ease, background 100ms ease;
  &.open,
  &:hover,
  &:focus {
    background: ${brandColor};
    color: #fff;
  }
`;

class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabsOpen: props.tabs
        .map((tab, index) => (tab.open ? index : null))
        .filter(isOpen => isOpen !== null),
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(index) {
    const { tabsOpen } = this.state;
    const { controllable, toggleTab, onlyOpenOne } = this.props;

    if (controllable) {
      toggleTab(index);
    } else if (onlyOpenOne) {
      this.setState({
        tabsOpen: tabsOpen.includes(index) ? [] : [index],
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
    const { tabsOpen } = this.state;

    return (
      <AccordionWrapper>
        {this.props.tabs.map((tab, index) => {
          const expanded = tabsOpen.includes(index);
          const tabId = `${tab.title}-id`;
          const classes = classNames({
            closed: !expanded,
            framedChildren: this.props.framedChildren,
          });
          return (
            <Fragment key={tab.title}>
              <AccordionTitleBar
                className={expanded ? 'open' : null}
                onClick={e => this.toggleTab(index, e)}
                aria-label={tab.title}
                aria-expanded={expanded}
                aria-controls={tabId}>
                {tab.title}
                {expanded ? <ChevronDown /> : <ChevronUp />}
              </AccordionTitleBar>
              <AccordionChildWrapper
                maxHeight={this.props.maxHeight}
                className={classes}
                id={tabId}
                aria-hidden={expanded}>
                <div>{tab.children}</div>
              </AccordionChildWrapper>
            </Fragment>
          );
        })}
      </AccordionWrapper>
    );
  }
}

Accordion.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      open: PropTypes.bool,
    }),
  ).isRequired,
  controllable: PropTypes.bool, // TODO: implement it!
  onlyOpenOne: PropTypes.bool,
  toggleTab: PropTypes.func, // TODO: create example of usage!
  maxHeight: PropTypes.number,
  framedChildren: PropTypes.bool,
};

Accordion.defaultProps = {
  maxHeight: 1000,
};

export default Accordion;
