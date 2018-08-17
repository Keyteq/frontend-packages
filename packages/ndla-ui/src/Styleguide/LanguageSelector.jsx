import React, { Fragment } from 'react';
import { MessagesContext } from 'ndla-ui';
import { FilterList } from '../Filter';

const LANGUAGES = [
  {
    title: 'Norsk bokmål',
    value: 'nb',
  },
  {
    title: 'Norsk nynorsk',
    value: 'nn',
  },
  {
    title: 'Engelsk',
    value: 'en',
  },
];

const LanguageSelector = () => (
  <MessagesContext.Consumer>
    {context => (
      <Fragment>
        <h2 className="u-heading">Velg språk for labels</h2>
        <div className="c-filter u-margin-top">
          <FilterList
            labelNotVisible
            options={LANGUAGES}
            values={[context.lang]}
            onChange={e => {
              context.changeLanguage(e.pop());
            }}
          />
        </div>
      </Fragment>
    )}
  </MessagesContext.Consumer>
);

export default LanguageSelector;
