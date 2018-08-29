import React, { Component, Fragment } from 'react';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';
import { Back } from 'ndla-icons/common';
import debounce from 'lodash/debounce';
import { getCurrentBreakpoint, breakpoints } from 'ndla-util';
import { Button, Modal, ModalHeader, ModalBody } from 'ndla-ui';

import SearchField from './SearchField';
import ActiveFilters from './ActiveFilters';

const classes = BEMHelper('c-search-page');

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNarrowScreen: false,
    };

    this.filterCloseButton = null;

    this.checkScreenSize = this.checkScreenSize.bind(this);
    this.checkScreenSizeDebounce = debounce(() => this.checkScreenSize(), 100);
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkScreenSizeDebounce);
    this.checkScreenSize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenSizeDebounce);
  }

  checkScreenSize() {
    const currentBreakpoint = getCurrentBreakpoint();
    const isNarrowScreen =
      currentBreakpoint === breakpoints.mobile ||
      currentBreakpoint === breakpoints.tablet;

    /* eslint react/no-did-mount-set-state: 0 */
    if (isNarrowScreen !== this.state.isNarrowScreen) {
      this.setState({
        isNarrowScreen,
      });
    }
  }

  render() {
    const {
      searchString,
      onSearchFieldChange,
      searchFieldPlaceholder,
      onSearchFieldFilterRemove,
      searchFieldFilters,
      onSearch,
      // only on narrow screen
      activeFilters,
      resourceToLinkProps,
      filters,
      children,
      messages,
      author,
      hideResultText,
    } = this.props;

    return (
      <main {...classes()}>
        <div {...classes('search-field-wrapper')}>
          <SearchField
            value={searchString}
            onChange={onSearchFieldChange}
            onSearch={onSearch}
            placeholder={searchFieldPlaceholder}
            filters={searchFieldFilters}
            onFilterRemove={onSearchFieldFilterRemove}
            resourceToLinkProps={resourceToLinkProps}
            messages={{
              searchFieldTitle: messages.searchFieldTitle,
            }}
          />
        </div>
        {author}
        <div {...classes('filter-result-wrapper')}>
          <button
            type="button"
            onClick={() => {
              this.handleToggleFilter(false);
            }}
            {...classes('filter-close-button')}>
            <Back /> <span>{messages.narrowScreenFilterHeading}</span>
          </button>
          <aside {...classes('filter-wrapper')}>
            <h1 {...classes('filter-heading')}>{messages.filterHeading}</h1>
            <div {...classes('filters')}>{!this.state.isNarrowScreen && filters}</div>
          </aside>
          <div {...classes('result-wrapper')}>
            <h2 aria-hidden="true" {...classes('result-label', 'large-screen')}>
              {!hideResultText ? messages.resultHeading : '\u00A0'}
            </h2>
            <div {...classes('active-filters')}>
              <ActiveFilters
                filters={activeFilters}
                onFilterRemove={onSearchFieldFilterRemove}
              />
            </div>
            <div {...classes('toggle-filter')}>
              <Modal
                animation="slide-up"
                size="fullscreen"
                backgroundColor="grey"
                activateButton={(<Button outline>Filter</Button>)}
              >
                {(onClose) => (
                  <Fragment>
                    <ModalHeader modifier="grey-dark">
                      <Button onClick={onClose}>Close</Button>
                    </ModalHeader>
                    <ModalBody>
                      {filters}
                    </ModalBody>
                  </Fragment>
                )}
              </Modal>
            </div>
            <h2 aria-hidden="true" {...classes('result-label', 'small-screen')}>
              {!hideResultText ? messages.resultHeading : '\u00A0'}
            </h2>
            {children}
          </div>
        </div>
      </main>
    );
  }
}

SearchPage.propTypes = {
  // should be <Fragment />
  filters: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  searchString: PropTypes.string.isRequired,
  onSearchFieldChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  searchFieldPlaceholder: PropTypes.string.isRequired,
  onSearchFieldFilterRemove: PropTypes.func.isRequired,
  resourceToLinkProps: PropTypes.func.isRequired,
  searchFieldFilters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
  activeFilters: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      filterName: PropTypes.string.isRequired,
    }),
  ),
  messages: PropTypes.shape({
    filterHeading: PropTypes.string.isRequired,
    narrowScreenFilterHeading: PropTypes.string.isRequired,
    resultHeading: PropTypes.string,
    searchFieldTitle: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.node,
  hideResultText: PropTypes.bool,
  filterScreenChange: PropTypes.func,
};

SearchPage.defaultProps = {
  author: null,
};
