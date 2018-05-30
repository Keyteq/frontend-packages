import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { classes } from './ResourcesWrapper';
import SafeLink from '../common/SafeLink';

import ResourceToggleFilter from '../ResourceGroup/ResourceToggleFilter';
import ClickToggle from '../common/ClickToggle';
import { Additional } from 'ndla-icons/common';
import Dialog from '../Dialog';

const classesButton = new BEMHelper({
  name: 'filter',
  prefix: 'c-',
});

const ResourcesTopicTitle = ({ messages, title, url, hasAdditionalResources, toggleAdditionalResources, showAdditionalResources, showAdditionalDialog, toggleAdditionalDialog }) => (
  <header {...classes('topic-title-wrapper')}>
    <div {...classes('topic-title-text')}>
      <p {...classes('topic-title-label')}>{messages.label}</p>
      <h1 {...classes('topic-title')}>
        {url ? <SafeLink to={url} {...classes('topic-title-link')}>
          {title}
        </SafeLink> : title}
      </h1>
      {hasAdditionalResources && (
        <Fragment>
          <ResourceToggleFilter
            checked={showAdditionalResources}
            label={messages.toggleFilterLabel}
            onClick={toggleAdditionalResources}
          />
          <div>
            <button
              {...classesButton('list', 'float-right')}
              onClick={toggleAdditionalDialog}
            >
              <Additional
                className={`c-icon--22 u-margin-left-tiny ${
                  classes('icon').className
                }`}
              />
            </button>
            <Dialog
              labelledby="show-additional-dialog-id"
              hidden={!showAdditionalDialog}
              onClose={toggleAdditionalDialog}
              disablePortal
              messages={{ close: 'lukk' }}
              modifier={
                showAdditionalDialog ? 'active' : ''
              }>
                <div>
                  <h1 id="show-additional-dialog-id">{messages.additionalDialogLabel}</h1>
                  <hr />
                  <p>{messages.additionalDialogDescription1}</p>
                  {messages.additionalDialogDescription2 && <p>{messages.additionalDialogDescription2}</p>}
                </div>
            </Dialog>
          </div>
        </Fragment>
      )}
    </div>
  </header>
);

ResourcesTopicTitle.propTypes = {
  messages: PropTypes.shape({
    label: PropTypes.string.isRequired,
    toggleFilterLabel: PropTypes.string.isRequired,
    additionalDialogLabel: (props, propName, componentName) => {
      if (typeof props[propName] !== 'string' && props.hasAdditionalResources) {
        console.warn(
          `<${componentName} /> messages.additionalDialogLabel prop must be a string if props[hasAdditionalResources] === true`,
        );
        return new Error(
          'Invalid prop `' +
            propName +
            '` supplied to' +
            ' `' +
            componentName +
            '`. Validation failed.',
        );
      }
    },
    additionalDialogDescription1: (props, propName, componentName) => {
      if (typeof props[propName] !== 'string' && props.hasAdditionalResources) {
        console.warn(
          `<${componentName} /> messages.additionalDialogDescription1 prop must be a string if props[hasAdditionalResources] === true`,
        );
        return new Error(
          'Invalid prop `' +
            propName +
            '` supplied to' +
            ' `' +
            componentName +
            '`. Validation failed.',
        );
      }
    },
    additionalDialogDescription2: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  toggleAdditionalResources: PropTypes.func.isRequired,
  hasAdditionalResources: PropTypes.bool.isRequired,
  toggleAdditionalDialog: (props, propName, componentName) => {
    if (typeof props[propName] !== 'function' && props.hasAdditionalResources) {
      console.warn(
        `<${componentName} /> toggleAdditionalDialog prop must be a function if props[hasAdditionalResources] === true`,
      );
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.',
      );
    }
  },
  showAdditionalDialog: (props, propName, componentName) => {
    if (typeof props[propName] !== 'function' && props.hasAdditionalResources) {
      console.warn(
        `<${componentName} /> toggleAdditionalDialog prop must be a function if props[hasAdditionalResources] === true`,
      );
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.',
      );
    }
  },
  url: PropTypes.string,
};

ResourcesTopicTitle.defaultProps = {
  hasAdditionalResources: false,
};

export default ResourcesTopicTitle;
