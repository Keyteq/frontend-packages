import React, { Component } from 'react';
import { ListView } from 'ndla-ui';
import { mockListView } from '../../dummydata';

class ListViewExample extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detailedItem: null,
      selectedLetter: '',
    };
    this.setDetailedItem = this.setDetailedItem.bind(this);
    this.setSelectedLetter = this.setSelectedLetter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  setDetailedItem(item) {
    this.setState({ detailedItem: item });
  }

  setSelectedLetter(letter) {
    this.setState({ selectedLetter: letter })
  }

  handleSearch(searchWord) {
    console.log('Search ', searchWord)
  }

  handleSortBy(value) {
    console.log('value: ', value);
  }

  render() {
    const { detailedItem, selectedLetter } = this.state
    return (
      <div>
        <ListView
          items={mockListView.items}
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
              }
            ],
            onChange: this.handleSortBy,
          }}
          search={{
            placeholder: 'Søk i listen',
            callback: this.handleSearch,
          }}
          filters={[
            {
              options: [
                { title: 'El-håndverkøy', value: 'elhandverktoy' },
                { title: 'Håndverkøy', value: 'handverktoy' },
                { title: 'Maskiner', value: 'maskiner' },
                { title: 'Måleverkøy', value: 'maleverktoy' },
              ],
              values: [],
              label: 'Fag',
              onChange: () => console.log('Filter items based on fag'),
              id: '1',
            },
          ]} />
      </div>
    );
  }
}


export default ListViewExample;
