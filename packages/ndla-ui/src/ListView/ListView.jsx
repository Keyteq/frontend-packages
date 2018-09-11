import React, { Component } from 'react';

import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

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
    };
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

  render() {
    const {
      items,
      filters,
      detailedItem,
      selectedLetter,
      selectCallback,
      selectedLetterCallback,
      sortBy,
      search,
    } = this.props;
    const { viewStyle } = this.state;
    const listItems = items.map(item => (
      <ListItem
        item={item}
        key={item.id}
        clickCallback={() => selectCallback(item)}
      />
    ));

    const sortByComponent = sortBy ? (
      <div {...classes('sortBy')}>
        <Select
          id="listViewSortBy"
          label={sortBy.label}
          onChange={sortBy.onChange}>
          {sortBy.options.map(option => (
            <option value={option.value}>{option.label}</option>
          ))}
        </Select>
      </div>
    ) : null;

    const searchComponent = search ? (
      <div {...classes('search')}>
        <div {...searchFieldClasses()}>
          <input
            {...searchFieldClasses('input', 'small')}
            type="search"
            placeholder={search.placeholder}
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
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
          {sortByComponent}
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
        {filters && filters.map(filter => (
          <FilterListPhone
            key={filter.key}
            label={filter.label}
            options={filter.options}
            values={filter.filterValues}
            onChange={(values) => { filter.onChange(filter.key, values) }}
          />
        ))}
        <ul {...classes('content', [viewStyle])}>{listItems}</ul>
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
  detailedItem: PropTypes.shape(),
  selectCallback: PropTypes.func,
  selectedLetterCallback: PropTypes.func,
  selectedLetter: PropTypes.string,
  sortBy: PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
  }),
  search: PropTypes.shape({
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }),
  viewStyle: PropTypes.oneOf(['grid', 'list']),
};

ListView.defaultProps = {
  viewStyle: 'grid',
  selectedLetter: '',
};

export default ListView;
