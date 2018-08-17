/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { messages } from 'ndla-ui';
import { formatNestedMessages } from 'ndla-i18n';
import IntlMessageFormat from 'intl-messageformat';

const NB = {
  name: 'Bokmål',
  abbreviation: 'nb',
  messages: formatNestedMessages(messages.nb),
};

const NN = {
  name: 'Nynorsk',
  abbreviation: 'nn',
  messages: formatNestedMessages(messages.nn),
};
const EN = {
  name: 'English',
  abbreviation: 'en',
  messages: formatNestedMessages(messages.en),
};

const appLocales = [NB, NN, EN];

export const MessagesContext = React.createContext();
const languages = appLocales.map(locale => locale.abbreviation);

class MessagesContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      langIndex: 0,
    };
    this.getMessage = this.getMessage.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  getMessage(txt, values) {
    if (!values) {
      return appLocales[this.state.langIndex].messages[txt];
    }
    const msg = new IntlMessageFormat(appLocales[this.state.langIndex].messages[txt]);
    return msg.format(values);
  }

  changeLanguage(lang) {
    const index = languages.indexOf(lang);
    if (index !== -1) {
      this.setState({
        langIndex: index,
        lang,
      });
    }
  }

  render() {
    return (
      <MessagesContext.Provider
        value={{
          lang: this.state.lang,
          changeLanguage: this.changeLanguage,
          getMessage: this.getMessage,
        }}>
        {this.props.children}
      </MessagesContext.Provider>
    );
  }
}

MessagesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const MessagesWrapper = storyFn => (
  <MessagesContextProvider>
    {storyFn()}
  </MessagesContextProvider>
);

export default MessagesWrapper;
