import React from 'react';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';
import { ChevronDown } from 'ndla-icons/common';

const classes = BEMHelper('c-select');

const Select = ({ children, className, label, id, onChange, ...rest }) => (
  <div {...classes()}>
    <label htmlFor={id} {...classes('label')}>
      {label}
    </label>
    <div {...classes('wrapper')}>
      <select
        {...classes('input')}
        {...rest}
        id={id}
        onChange={e => (onChange ? onChange(e.target.value) : null)}>
        {children}
      </select>
      <span {...classes('symbol')}>
        <ChevronDown />
      </span>
    </div>
  </div>
);

Select.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  className: '',
  label: '',
  id: 'selectElement',
};

export default Select;
