import React, { Component } from 'react';

import { ListView } from 'ndla-ui';
import { mockListView } from '../../dummydata';

class ListViewExample extends Component {
  render() {
    console.log(mockListView);
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
            },
          ]}
        />
      </div>
    );
  }
}

export default ListViewExample;
