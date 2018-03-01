import React from 'react';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';
import { SearchField } from '../Search';
import { OneColumn } from '../Layout';

const classes = BEMHelper('c-movie-search');

const MovieSearch = ({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  messages,
}) => (
  <section {...classes()}>
    <OneColumn>
      <SearchField
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={onSearchChange}
        messages={messages}
      />
      <div {...classes('filter')} />
    </OneColumn>
  </section>
);

MovieSearch.propTypes = {
  messages: PropTypes.shape({
    searchFieldTitle: PropTypes.string.isRequired,
  }).isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string.isRequired,
};

export default MovieSearch;
