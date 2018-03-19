import React, { Component } from 'react';

import { ListView } from 'ndla-ui';
import { mockListView } from '../../dummydata';

class ListViewExample extends Component {
  render() {
    console.log(mockListView.items)
    return (
      <div>
        <ListView
          items={mockListView.items}
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
