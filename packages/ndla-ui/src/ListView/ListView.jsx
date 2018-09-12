import React, { Component } from 'react';

import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import { injectT } from 'ndla-i18n';
import {
  FilterListPhone,
  Select,
  Modal,
  ConceptDialog,
  ConceptDialogContent,
  ConceptDialogImage,
  ConceptDialogText,
} from 'ndla-ui';
import { List as ListIcon, Grid as GridIcon } from 'ndla-icons/action';
// import ListViewDialog from './ListViewDialog';
import ListItem from './ListItem';

export const listItemShape = PropTypes.shape({
  name: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string,
  subject: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  })),
  category: PropTypes.shape({
    title: PropTypes.string,
    value: PropTypes.string,
  }),
  source: PropTypes.string,
  license: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
});

const classes = BEMHelper('c-listview');
const filterClasses = BEMHelper('c-filter');
const searchFieldClasses = new BEMHelper('c-search-field');
const alphabet = 'abcdefghijklmnopqrstuvxyzæøå';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewStyle: props.viewStyle,
      searchInput: '',
      filters: props.activeFilters,
      sortBy: props.sortBy,
      detailedItem: null,
    };
    this.handleSortBy = this.handleSortBy.bind(this);
  }

  getActiveLetters() {
    const { items } = this.props;
    const letters = {};
    const len = items.length;
    for (let i = 0; i < len; i += 1) {
      const item = items[i];
      letters[item.name.charAt(0).toLowerCase()] = true;
    }
    return letters;
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

  handleSortBy(sortBy) {
    this.setState({
      sortBy,
    });
  }

  handleSelectItem(detailedItem) {
    this.setState({
      detailedItem,
    });
  }

  render() {
    const {
      items,
      filters: useFilters,
      selectedLetter,
      selectedLetterCallback,
      disableSortBy,
      disableSearch,
      disableViewOption,
      t,
    } = this.props;

    const {
      searchInput,
      filters,
      sortBy,
      detailedItem,
    } = this.state;

    console.log('render', detailedItem);

    let filteredItems = items;

    // 1. Filter items on subjects
    if (filters.subject && filters.subject.length) {
      filteredItems = filteredItems.filter(item => item.subject.some(subject => filters.subject.includes(subject.value)))
    }

    // 2 Filter items on category
    if (filters.category && filters.category.length) {
      filteredItems = filteredItems.filter(item => filters.category.includes(item.category.value));
    }


    // 2. Filter with search (testing name, description and tags[])
    if (searchInput.length > 0) {
      const searchInputLowercase = searchInput.toLowerCase();
      filteredItems = filteredItems.filter(item => (
        (item.tags && item.tags.some(tag => tag.toLowerCase().indexOf(searchInputLowercase) !== -1)) ||
        (item.description && item.description.toLowerCase().indexOf(searchInputLowercase) !== -1) ||
        item.name.toLowerCase().indexOf(searchInputLowercase) !== -1
      ));
    }

    // 3. Sort filtered results ??? how????
    if (sortBy === 'title') {
      filteredItems = filteredItems.sort((a, b) => (
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      ));
    } else {
      filteredItems = filteredItems.sort((a, b) => (
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
      ));
    }

    const { viewStyle } = this.state;

    const searchComponent = !disableSearch ? (
      <div {...classes('search')}>
        <div {...searchFieldClasses()}>
          <div {...searchFieldClasses('input-wrapper', 'with-icon')}>
            <input
              {...searchFieldClasses('input', 'small')}
              type="search"
              placeholder='Søk i listevisning'
              value={searchInput}
              onChange={(e) => this.setState({ searchInput: e.target.value })}
            />
          </div>
        </div>
      </div>
    ) : null;

    return (
      <div {...classes()}>
        <div {...classes('sorting')}>
          {!disableSortBy && (
            <div {...classes('sortBy')}>
              <Select
                id="listViewSortBy"
                label="Sorter etter"
                defaultValue={sortBy}
                onChange={this.handleSortBy}>
                  <option value="title">Tittle</option>
                  <option value="subject">Fag</option>
                  <option value="category">Kategori</option>
              </Select>
            </div>
          )}
          {searchComponent}
          {!disableViewOption && (<div {...classes('list-style')}>
            <button
              type="button"
              {...classes('style-button', { active: viewStyle === 'list' })}
              onClick={() => this.setState({ viewStyle: 'list' })}>
              <ListIcon />
            </button>
            <button
              type="button"
              {...classes('style-button', { active: viewStyle === 'grid' })}
              onClick={() => this.setState({ viewStyle: 'grid' })}>
              <GridIcon />
            </button>
          </div>)}

          {viewStyle === 'list' && selectedLetterCallback ? (
            <ul {...classes('alphabet')}>
              {alphabet.split('').map(letter => (
                <li key={`letter-${letter}`} {...classes('letter')}>
                  <button
                    type="button"
                    {...classes('letter-button', {
                      active: selectedLetter === letter,
                      disabled: !this.getActiveLetters()[letter],
                    })}
                    onClick={() =>
                      selectedLetter === letter
                        ? selectedLetterCallback('')
                        : selectedLetterCallback(letter)
                    }>
                    {letter}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {useFilters && (
          <div className="c-bodybox">
            <div {...filterClasses('wrapper-multiple-filters')}>
              {useFilters.map(filter => (
                <FilterListPhone
                  key={filter.key}
                  label={filter.label}
                  options={filter.options}
                  alignedGroup
                  values={filters[filter.key]}
                  messages={{
                    useFilter: t(`listview.filters.${filter.key}.useFilter`),
                    openFilter: t(`listview.filters.${filter.key}.openFilter`),
                    closeFilter: t(`listview.filters.${filter.key}.closeFilter`),
                  }}
                  onChange={(values) => { this.handleChangeFilters(filter.key, values) }}
                />
              ))}
            </div>
          </div>
        )}
        <div {...classes('content-wrapper')}>
          <div {...classes('content', [viewStyle])}>
            {filteredItems.map(item => (
              <ListItem
                item={item}
                key={item.id}
                clickCallback={() => this.handleSelectItem(item)}
              />
            ))}
          </div>
        </div>
        {detailedItem !== null && <Modal controllable isOpen onClose={() => { this.handleSelectItem(null); }}>
          {(onClose) => (
            <ConceptDialog
              title={detailedItem.name}
              subtitle={detailedItem.category.title}
              content={(
                <ConceptDialogContent>
                  {detailedItem.image ? (
                    <ConceptDialogImage src={detailedItem.image} alt={detailedItem.description} wide />
                  ) : null}
                  <ConceptDialogText>{detailedItem.description}</ConceptDialogText>
                </ConceptDialogContent>
              )}
              modifiers={['visible', 'listview']}
              messages={{
                close: 'Lukk',
                ariaLabel: '',
              }}
              closeCallback={onClose}
              license={detailedItem.license}
              source={detailedItem.source}
              tags={detailedItem.tags}
              ariaHidden={false}
            />
          )}
        </Modal>}
      </div>
    );
  }
}

const filterShapes = PropTypes.shape({
  options: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.func,
    noResults: PropTypes.bool,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
  filterValues: PropTypes.arrayOf([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  key: PropTypes.oneOf(['subject', 'category']),
});

ListView.propTypes = {
  items: PropTypes.arrayOf(
    listItemShape,
  ).isRequired,
  filters: PropTypes.arrayOf(filterShapes),
  activeFilters: PropTypes.shape({
    subject: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    category: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  }),
  selectedLetterCallback: PropTypes.func,
  selectedLetter: PropTypes.string,
  viewStyle: PropTypes.oneOf(['grid', 'list']),
  disableSortBy: PropTypes.bool,
  disableSearch: PropTypes.bool,
  disableViewOption: PropTypes.bool,
  sortBy: PropTypes.oneOf(['title', 'category', 'subject']),
  t: PropTypes.func.isRequired,
};

ListView.defaultProps = {
  viewStyle: 'grid',
  selectedLetter: '',
  activeFilters: {},
  sortBy: 'title',
};

export default injectT(ListView);
