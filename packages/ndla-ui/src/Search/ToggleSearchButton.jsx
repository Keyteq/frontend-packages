import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'ndla-icons/common';
import BEMHelper from 'react-bem-helper';

import { ModalButton, Button } from 'ndla-ui';

const classes = BEMHelper({
  prefix: 'c-',
  name: 'toggle-search-button',
  outputIsString: true,
});

export const OpenSearchButton = ({ messages }) => {
  const buttonContent = (
    <button type="button" className="c-button c-toggle-search-button__button c-toggle-search-button__button--wide">
      <span className={classes('button-text')}>{messages.buttonText}???</span>
      <Search />
    </button>
  );

  return (
    <ModalButton
      activateButton={buttonContent}
    >
      {(onClose) => (
        <Fragment>
          <Button outline onClick={onClose}>Lukk</Button>
          {buttonContent}
        </Fragment>
      )}
    </ModalButton>
  );
};

OpenSearchButton.propTypes = {
  messages: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
};

const ToggleSearchButton = ({ messages, children }) => {
  const buttonContent = (
    <button type="button" className="c-button c-toggle-search-button__button c-toggle-search-button__button--wide">
      <span className={classes('button-text')}>{messages.buttonText}</span>
      <Search />
    </button>
  );
  return (
    <ModalButton
      activateButton={buttonContent}
    >
      {(onClose) => (<div>Search content <button type="button" onClick={onClose}>close</button></div>)}
    </ModalButton>
  );
};

ToggleSearchButton.propTypes = {
  messages: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.func.isRequired,
};

export default ToggleSearchButton;
