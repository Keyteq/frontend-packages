import React, { Component } from 'react';

import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { FilterList, Select } from 'ndla-ui';
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
      detailedItem: null,
      nextItem: null,
      index: null,
      viewStyle: this.props.viewStyle,
      sortBy: 'alphabet',
      searchWord: '',
      selectedLetter: '',
    };
    this.setDetailedItem = this.setDetailedItem.bind(this);
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

  setDetailedItem(item, index) {
    const { items } = this.props;
    const nextItem = items[index + 1] ? items[index + 1] : null;
    const previousItem = items[index - 1] ? items[index - 1] : null;
    const stateObj = { detailedItem: item, nextItem, previousItem, index };
    this.setState(stateObj);
  }

  sortItems() {
    const { items } = this.props;
    let result = [];
    let filtered = false;
    const sortedItems = items.sort((a, b) => {
      if (this.state.sortBy === 'alphabet') {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName > bName) {
          return 1;
        }
        if (aName < bName) {
          return -1;
        }
        return 0;
      }
      return 0;
    });

    if (this.state.selectedLetter === '' && this.state.searchWord === '') {
      return sortedItems;
    }

    if (this.state.selectedLetter) {
      const { selectedLetter } = this.state;
      const itemsLen = sortedItems.length;
      for (let i = 0; i < itemsLen; i += 1) {
        const item = sortedItems[i];
        if (item.name.charAt(0).toLowerCase() === selectedLetter) {
          result.push(item);
        }
      }
      filtered = true;
    }

    if (this.state.searchWord !== '') {
      const searchWord = this.state.searchWord.toLowerCase();
      if (filtered) {
        // Use results
        result = result.filter(
          item => item.name.toLowerCase().indexOf(searchWord) > -1,
        );
      } else {
        result = sortedItems.filter(
          item => item.name.toLowerCase().indexOf(searchWord) > -1,
        );
      }
    }
    return result;
  }

  render() {
    const { filters } = this.props;
    const { viewStyle } = this.state;
    const sortedItems = this.sortItems();
    const listItems = sortedItems.map((item, index) => (
      <ListItem
        item={item}
        key={item.id}
        clickCallback={this.setDetailedItem}
        itemIndex={index} />
    ));

    const filterComponents = filters.map(filter => (
      <FilterList
        modifiers="listview"
        options={filter.options}
        values={filter.values}
        label={filter.label}
        onChange={filter.onChange} />
    ));

    return (
      <div {...classes()}>
        <h1>Listevisning</h1>
        <p> asdasdas dasd asd s</p>
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
  filters: PropTypes.array,
  viewStyle: PropTypes.oneOf(['grid', 'list']),
};

ListView.defaultProps = {
  filters: [],
  viewStyle: 'grid',
};

export default ListView;
