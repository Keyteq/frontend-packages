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
  }

  setDetailedItem(item) {
    this.setState({ detailedItem: item });
  }

  setSelectedLetter(letter) {
    this.setState({ selectedLetter: letter })
  }

  render() {
    const { detailedItem, selectedLetter } = this.state
    console.log(detailedItem)
    return (
      <div>
        <ListView
          items={mockListView.items}
          detailedItem={detailedItem}
          selectedLetter={selectedLetter}
          selectCallback={this.setDetailedItem}
          selectedLetterCallback={this.setSelectedLetter}
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
