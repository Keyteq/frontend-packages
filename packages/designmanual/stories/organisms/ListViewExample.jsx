import React, { Component } from 'react';
import { ListView } from 'ndla-ui';
import { mockListView } from '../../dummydata';

class ListViewExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      detailedItem: null,
      selectedLetter: '',
      filters: {},
    };
    this.setDetailedItem = this.setDetailedItem.bind(this);
    this.setSelectedLetter = this.setSelectedLetter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.handleChangeFilters = this.handleChangeFilters.bind(this);
  }

  setDetailedItem(item) {
    this.setState({ detailedItem: item });
  }

  setSelectedLetter(letter) {
    this.setState({ selectedLetter: letter });
  }

  handleSearch(searchInput) {
    this.setState({
      searchInput,
    });
  }

  handleSortBy(value) {
    console.log('value: ', value);
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

  render() {
    const { detailedItem, selectedLetter, filters, searchInput } = this.state;

    // Filter items
    let filteredItems = mockListView.items.filter(item => (
      Object.keys(filters).length === 0 || Object.keys(filters).every((filterKey) => (
        !filters[filterKey] || filters[filterKey].length === 0 || filters[filterKey].includes(item[filterKey].value)
      ))
    ));

    // Filter with search
    if (searchInput.length > 0) {
      const searchInputLowercase = searchInput.toLowerCase();
      filteredItems = filteredItems.filter(item => (
        (!item.tags || item.tags.some(tag => tag.toLowerCase().indexOf(searchInputLowercase) !== -1)) &&
        (!item.description || item.description.toLowerCase().indexOf(searchInputLowercase) !== -1) &&
        item.name.toLowerCase().indexOf(searchInputLowercase) !== -1
      ));
    }

    return (
      <div>
        <ListView
          items={filteredItems}
          detailedItem={detailedItem}
          selectedLetter={selectedLetter}
          selectCallback={this.setDetailedItem}
          selectedLetterCallback={this.setSelectedLetter}
          sortBy={{
            label: 'Sorter etter',
            options: [
              {
                value: 'alphabet',
                label: 'Alfabetisk a-å',
              },
            ],
            onChange: this.handleSortBy,
          }}
          search={{
            value: searchInput,
            placeholder: 'Søk i listen',
            onChange: this.handleSearch,
          }}
          filters={[
            {
              options: [
                { title: 'Betongfaget', value: 'betongfaget' },
                { title: 'Innredningsfaget', value: 'innredningsfaget' },
                { title: 'Murerfaget', value: 'murerfaget' },
                { title: 'Trelastfaget', value: 'trelastfaget' },
                { title: 'Tømrerfaget', value: 'tomrerfaget' },
              ],
              filterValues: this.state.filters.subject,
              onChange: this.handleChangeFilters,
              key: 'subject',
              label: 'Fag',
            },
            {
              options: [
                { title: 'El-håndverkøy', value: 'elhandverktoy' },
                { title: 'Håndverkøy', value: 'handverktoy' },
                { title: 'Maskiner', value: 'maskiner' },
                { title: 'Måleverkøy', value: 'maleverktoy' },
              ],
              filterValues: this.state.filters.category,
              onChange: this.handleChangeFilters,
              key: 'category',
              label: 'Verktøy',
            },
          ]}
        />
      </div>
    );
  }
}

export default ListViewExample;
