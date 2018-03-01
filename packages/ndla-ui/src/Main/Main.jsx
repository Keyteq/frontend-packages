import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

const classes = BEMHelper('c-main');

const Main = ({ children, className }) => (
  <main {...classes('', null, className)}>{children}</main>
);

Main.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Main;
