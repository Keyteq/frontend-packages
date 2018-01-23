import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'ndla-icons/common';
import BEMHelper from 'react-bem-helper';

import ClickToggle from '../common/ClickToggle';
import SafeLink from '../common/SafeLink';

const classes = BEMHelper({
  prefix: 'c-',
  name: 'toggle-search-button',
  outputIsString: true,
});

const ToggleSearchButton = ({
  messages,
  children,
  expanded,
  searchPageUrl,
}) => {
  const buttonContent = (
    <span className={classes('button-content')}>
      <span className={classes('button-text')}>{messages.buttonText}</span>
      <Search />
    </span>
  );

  return (
    <Fragment>
      <SafeLink to={searchPageUrl} className={classes('button', 'narrow')}>
        {buttonContent}
      </SafeLink>
      <ClickToggle
        title={buttonContent}
        className={classes()}
        buttonClassName={classes('button', 'wide')}
        expanded={expanded}>
        {children}
      </ClickToggle>
    </Fragment>
  );
};

ToggleSearchButton.propTypes = {
  messages: PropTypes.shape({
    buttonText: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  searchPageUrl: PropTypes.string.isRequired,
};

export default ToggleSearchButton;
