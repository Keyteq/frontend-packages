import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { Cross } from 'ndla-icons/action';
import { uuid } from 'ndla-util';

import { SearchField } from '../Search';
import { OneColumn } from '../Layout';
import Logo from '../Logo';
import SafeLink from '../common/SafeLink';
import ClickToggle from '../common/ClickToggle';

const classes = BEMHelper('c-frontpage-header');
const classesMenu = new BEMHelper({
  name: 'topic-menu',
  prefix: 'c-',
});

class FrontpageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuIsOpen: false,
    };
  }

  render() {
    const {
      searchFieldValue,
      onSearchFieldChange,
      onSearch,
      searchFieldPlaceholder,
      links,
      logoTo,
      messages,
      heading,
      menuSubject,
    } = this.props;
    return (
      <header {...classes()}>
        <div {...classes('inner-background')} />
        <div {...classes('wrapper')}>
          <OneColumn noPadding>
            <nav {...classes('navigation')}>
              <ul>
                {links.map(link => (
                  <li key={link.to}>
                    <SafeLink to={link.to}>{link.text}</SafeLink>
                  </li>
                ))}
              </ul>
            </nav>
          </OneColumn>
          <OneColumn>
            <div {...classes('content')}>
              <ClickToggle
                id="frontpageMenuId"
                isOpen={this.state.menuIsOpen}
                onToggle={isOpen => {
                  this.setState({
                    menuIsOpen: isOpen,
                  });
                }}
                title="Meny"
                openTitle="Lukk"
                className="c-topic-menu-container"
                buttonClassName="c-frontpage-header__menu-button">
                {onClose => (
                  <nav
                    {...classesMenu('', '', 'o-wrapper u-1/1')}
                    id="frontpageMenuId">
                    <div {...classesMenu('masthead')}>
                      <div {...classesMenu('masthead-left')}>
                        <button
                          type="button"
                          {...classesMenu('close-button')}
                          onClick={onClose}>
                          <Cross />
                          <span>{messages.closeButton}</span>
                        </button>
                      </div>
                      <div {...classesMenu('masthead-right')}>
                        <h1>MODAL MENU TOGGLER!!</h1>
                        <Logo to="#" label="Nasjonal digital læringsarena" />
                      </div>
                    </div>
                    <div {...classesMenu('dropdown')}>
                      <div {...classesMenu('content')}>
                        {menuSubject}
                        <div {...classesMenu('section', 'main')}>
                          <ul {...classesMenu('list')}>
                            {links.map(link => (
                              <li key={uuid()} {...classesMenu('topic-item')}>
                                <SafeLink to={link.to} {...classesMenu('link')}>
                                  {link.text}
                                </SafeLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </nav>
                )}
              </ClickToggle>
              <Logo
                to={logoTo}
                label={heading}
                cssModifier="white"
                large
                color="currentColor"
              />
              <SearchField
                value={searchFieldValue}
                onChange={onSearchFieldChange}
                placeholder={searchFieldPlaceholder}
                messages={messages}
                onSearch={onSearch}
              />
            </div>
          </OneColumn>
        </div>
      </header>
    );
  }
}

FrontpageHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  searchFieldValue: PropTypes.string.isRequired,
  onSearchFieldChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  searchFieldPlaceholder: PropTypes.string.isRequired,
  logoTo: PropTypes.string,
  messages: PropTypes.shape({
    searchFieldTitle: PropTypes.string.isRequired,
    menuButton: PropTypes.string.isRequired,
  }).isRequired,
  menuSubject: PropTypes.node.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default FrontpageHeader;
