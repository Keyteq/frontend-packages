import React, { Component } from 'react';

import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { injectT } from 'ndla-i18n';
import { FilterListPhone, Select } from 'ndla-ui';
import { List as ListIcon, Grid as GridIcon } from 'ndla-icons/action';
import { Search as SearchIcon } from 'ndla-icons/common';
import ListViewDialog from './ListViewDialog';
import ListItem from './ListItem';

export const listItemShape = PropTypes.shape({
  name: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
  subject: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }),
  category: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }),
  source: PropTypes.string,
  license: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
});

const classes = BEMHelper('c-listview');
const searchFieldClasses = new BEMHelper('c-search-field');
const alphabet = 'abcdefghijklmnopqrstuvxyzæøå';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStyle: props.viewStyle,
      searchInput: '',
      filters: props.activeFilters,
      sortBy: props.sortBy,
    };
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  getActiveLetters() {
    const { items } = this.props;
    const letters = {};
    const len = items.length;
    for (let i = 0; i < len; i += 1) {
      const item = items[i];
      letters[item.name.charAt(0).toLowerCase()] = true;
    }
    return letters;
  }

  handleChangeFilters(key, values) {
    this.setState(prevState => {
      const currentFilters = prevState.filters;
      currentFilters[key] = values;
      return {
        filters: currentFilters,
      };
    });
  }

  handleSortBy(sortBy) {
    this.setState({
      sortBy,
    });
  }

  render() {
    const {
      items,
      filters: useFilters,
      detailedItem,
      selectedLetter,
      selectCallback,
      selectedLetterCallback,
      disableSortBy,
      disableSearch,
      t,
    } = this.props;

    const {
      searchInput,
      filters,
      sortBy,
    } = this.state;

    // 1. Filter items
    let filteredItems = items.filter(item => (
      Object.keys(filters).length === 0 || Object.keys(filters).every((filterKey) => (
        !filters[filterKey] || filters[filterKey].length === 0 || filters[filterKey].includes(item[filterKey].value)
      ))
    ));

    // 2. Filter with search (testing name, description and tags[])
    if (searchInput.length > 0) {
      const searchInputLowercase = searchInput.toLowerCase();
      filteredItems = filteredItems.filter(item => (
        (item.tags && item.tags.some(tag => tag.toLowerCase().indexOf(searchInputLowercase) !== -1)) ||
        (item.description && item.description.toLowerCase().indexOf(searchInputLowercase) !== -1) ||
        item.name.toLowerCase().indexOf(searchInputLowercase) !== -1
      ));
    }

    // 3. Sort filtered results ??? how????
    if (sortBy === 'title') {
      filteredItems = filteredItems.sort((a, b) => (
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      ));
    } else {
      filteredItems = filteredItems.sort((a, b) => (
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      ));
    }

    const { viewStyle } = this.state;

    const searchComponent = !disableSearch ? (
      <div {...classes('search')}>
        <div {...searchFieldClasses()}>
          <input
            {...searchFieldClasses('input', 'small')}
            type="search"
            placeholder='Søk i listevisning'
            value={searchInput}
            onChange={(e) => this.setState({ searchInput: e.target.value })}
          />
          <button
            tabIndex="-1"
            {...searchFieldClasses('button')}
            type="submit"
            value="Search">
            <SearchIcon />
          </button>
        </div>
      </div>
    ) : null;

    return (
      <div {...classes()}>
        <div {...classes('sorting')}>
          {!disableSortBy && (
            <div {...classes('sortBy')}>
              <Select
                id="listViewSortBy"
                label="Sorter etter"
                defaultValue={sortBy}
                onChange={this.handleSortBy}>
                  <option value="title">Tittle</option>
                  <option value="subject">Fag</option>
                  <option value="category">Kategori</option>
              </Select>
            </div>
          )}
          {searchComponent}
          <div {...classes('list-style')}>
            <button
              type="button"
              {...classes('style-button', { active: viewStyle === 'list' })}
              onClick={() => this.setState({ viewStyle: 'list' })}>
              <ListIcon />
            </button>
            <button
              type="button"
              {...classes('style-button', { active: viewStyle === 'grid' })}
              onClick={() => this.setState({ viewStyle: 'grid' })}>
              <GridIcon />
            </button>
          </div>

          {viewStyle === 'list' && selectedLetterCallback ? (
            <ul {...classes('alphabet')}>
              {alphabet.split('').map(letter => (
                <li key={`letter-${letter}`} {...classes('letter')}>
                  <button
                    type="button"
                    {...classes('letter-button', {
                      active: selectedLetter === letter,
                      disabled: !this.getActiveLetters()[letter],
                    })}
                    onClick={() =>
                      selectedLetter === letter
                        ? selectedLetterCallback('')
                        : selectedLetterCallback(letter)
                    }>
                    {letter}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {useFilters && useFilters.map(filter => (
          <FilterListPhone
            key={filter.key}
            label={filter.label}
            options={filter.options}
            values={filters[filter.key]}
            messages={{
              useFilter: t('masthead.menu.useFilter'),
              openFilter: t('masthead.menu.openFilter'),
              closeFilter: t('masthead.menu.closeFilter'),
            }}
            onChange={(values) => { this.handleChangeFilters(filter.key, values) }}
          />
        ))}
        <div {...classes('content-wrapper')}>
          <div {...classes('content', [viewStyle])}>
            {filteredItems.map(item => (
              <ListItem
                item={item}
                key={item.id}
                clickCallback={() => selectCallback(item)}
              />
            ))}
          </div>
        </div>
        {detailedItem ? (
          <ListViewDialog
            item={detailedItem}
            closeCallback={() => selectCallback(null)}
          />
        ) : null}
      </div>
    );
  }
}

const filterShapes = PropTypes.shape({
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.func,
    noResults: PropTypes.bool,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  filterValues: PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
});

ListView.propTypes = {
  items: PropTypes.arrayOf(
    listItemShape,
  ).isRequired,
  filters: PropTypes.arrayOf(filterShapes),
  activeFilters: PropTypes.shape({
    subject: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    category: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }),
  detailedItem: PropTypes.shape(),
  selectCallback: PropTypes.func,
  selectedLetterCallback: PropTypes.func,
  selectedLetter: PropTypes.string,
  viewStyle: PropTypes.oneOf(['grid', 'list']),
  disableSortBy: PropTypes.bool,
  disableSearch: PropTypes.bool,
  sortBy: PropTypes.oneOf(['title', 'category', 'subject']),
  t: PropTypes.func.isRequired,
};

ListView.defaultProps = {
  viewStyle: 'grid',
  selectedLetter: '',
  activeFilters: {},
  sortBy: 'title',
};

export default injectT(ListView);
