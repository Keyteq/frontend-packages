import React from 'react';
import PropTypes from 'prop-types';
import { Search } from 'ndla-icons/common';
import BEMHelper from 'react-bem-helper';

import ClickToggle from '../common/ClickToggle';
import Button from '../Button';

const classes = BEMHelper({
  prefix: 'c-',
  name: 'toggle-search-button',
  outputIsString: true,
});

export const OpenSearchButton = ({ messages, onOpen }) => {
  const buttonContent = (
    <span className={classes('button-content')}>
      <span className={classes('button-text')}>{messages.buttonText}</span>
      <Search />
    </span>
  );

  return (
    <Button onClick={onOpen} className={classes('button', 'wide')}>
      {buttonContent}
    </Button>
  );
};

OpenSearchButton.propTypes = {
  messages: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
};

const ToggleSearchButton = ({ messages, children, isOpen, onToggle }) => {
  const buttonContent = (
    <span className={classes('button-content')}>
      <span className={classes('button-text')}>{messages.buttonText}</span>
      <Search />
    </span>
  );
  return (
    <ClickToggle
      isOpen={isOpen}
      onToggle={onToggle}
      title={buttonContent}
      returnFocusOnDeactivate={false}
      className={classes()}
      buttonClassName={classes('button', 'wide')}>
      {children}
    </ClickToggle>
  );
};

ToggleSearchButton.propTypes = {
  messages: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default ToggleSearchButton;
