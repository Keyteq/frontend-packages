/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { Search as SearchIcon } from 'ndla-icons/common';

import SafeLink from '../common/SafeLink';

import ActiveFilters from './ActiveFilters';
import ContentTypeResult from './ContentTypeResult';

const classes = new BEMHelper('c-search-field');

const searchResultShape = PropTypes.arrayOf(
  PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    totalCount: PropTypes.number.isRequired,
    showAllLinkUrl: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        display: PropTypes.string.isRequired,
      }),
    ),
  }),
);

export const SearchResult = ({ result, messages, allResultUrl }) => (
  <section {...classes('search-result')}>
    <h1 {...classes('search-result-heading')}>
      {messages.searchResultHeading}
    </h1>
    <div {...classes('search-result-content')}>
      {result.map(contentTypeResult => (
        <ContentTypeResult
          contentTypeResult={contentTypeResult}
          key={contentTypeResult.title}
          messages={{
            allResultLabel: messages.allContentTypeResultLabel,
            noHit: messages.contentTypeResultNoHit,
          }}
        />
      ))}
    </div>
    <div {...classes('go-to-search')}>
      <SafeLink to={allResultUrl}>{messages.allResultButtonText}</SafeLink>
    </div>
  </section>
);

SearchResult.propTypes = {
  result: searchResultShape,
  messages: PropTypes.shape({
    allResultButtonText: PropTypes.string.isRequired,
    searchResultHeading: PropTypes.string.isRequired,
    allContentTypeResultLabel: PropTypes.string.isRequired,
    contentTypeResultNoHit: PropTypes.string.isRequired,
  }).isRequired,
  allResultUrl: PropTypes.string.isRequired,
};

const SearchField = ({
  placeholder,
  value,
  onChange,
  filters,
  onFilterRemove,
  messages,
  children,
}) => {
  const modifiers = [];

  const hasSearchResult = children !== null;

  if (hasSearchResult) {
    modifiers.push('has-search-result');
  }

  if (filters && filters.length > 0) {
    modifiers.push('has-filter');
  }

  return (
    <div {...classes('', modifiers)}>
      <input
        aria-label={messages.searchFieldTitle}
        type="search"
        {...classes('input')}
        aria-autocomplete="list"
        autoComplete="off"
        name="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div {...classes('filters')}>
        <ActiveFilters filters={filters} onFilterRemove={onFilterRemove} />
      </div>
      <button tabIndex="-1" {...classes('button')} type="submit" value="Search">
        <SearchIcon />
      </button>
      {children}
    </div>
  );
};

SearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterRemove: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  messages: PropTypes.shape({
    searchFieldTitle: PropTypes.string.isRequired,
  }).isRequired,
  searchResult: searchResultShape,
  allResultUrl: PropTypes.string,
  children: PropTypes.node,
};

SearchField.defaultProps = {
  children: null,
};

export default SearchField;
