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
  }

  setDetailedItem(item) {
    this.setState({ detailedItem: item });
  }

  setSelectedLetter(letter) {
    this.setState({ selectedLetter: letter });
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
    const { detailedItem, selectedLetter, searchInput } = this.state;

    return (
      <div>
        <ListView
          items={mockListView.items}
          detailedItem={detailedItem}
          selectedLetter={selectedLetter}
          selectCallback={this.setDetailedItem}
          selectedLetterCallback={this.setSelectedLetter}
          sortBy="title"
          search={{
            value: searchInput,
            placeholder: 'Søk i listen',
            onChange: this.handleSearch,
          }}
          activeFilters={{
            subject: ['murerfaget', 'betongfaget'],
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
