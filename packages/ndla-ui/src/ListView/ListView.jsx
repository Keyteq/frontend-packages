import React, { Component } from 'react';

import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { FilterList, Select } from 'ndla-ui';
import { List as ListIcon, Grid as GridIcon } from 'ndla-icons/action';
import { Search as SearchIcon } from 'ndla-icons/common';
import ListViewDialog from './ListViewDialog';
import ListItem from './ListItem';

const classes = BEMHelper('c-listview');
const searchFieldClasses = new BEMHelper('c-search-field');

const alphabet = 'abcdefghijklmnopqrstuvxyzæøå';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStyle: this.props.viewStyle,
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

    const filterComponents = filters.map(filter => (
      <FilterList
        modifiers="listview"
        options={filter.options}
        values={filter.values}
        label={filter.label}
        onChange={filter.onChange}
        key={filter.id}
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
            onChange={e =>
              search.callback ? search.callback(e.target.value) : null
            }
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
        <h1>Listevisning</h1>
        <div {...classes('sorting')}>
          {sortByComponent}
          {searchComponent}
          <div {...classes('list-style')}>
            <button
              {...classes('style-button', { active: viewStyle === 'list' })}
              onClick={() => this.setState({ viewStyle: 'list' })}>
              <ListIcon />
            </button>
            <button
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
        {filterComponents}

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

ListView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  filters: PropTypes.arrayOf(PropTypes.shape({})),
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
    placeholder: PropTypes.string,
  }),
  viewStyle: PropTypes.oneOf(['grid', 'list']),
};

ListView.defaultProps = {
  filters: [],
  viewStyle: 'grid',
  selectedLetter: '',
};

export default ListView;
