import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { ConceptDialog } from 'ndla-ui';
import Tabs from 'ndla-tabs';
import { createUniversalPortal } from '../utils/createUniversalPortal';

const classes = BEMHelper('c-listview-dialog');

const ConceptContent = ({ item }) => (
  <div>
    <div {...classes('image')}>
      <img src={item.image} alt={item.description} />
    </div>
    <p {...classes('description')}>{item.description}</p>
    <div {...classes('meta')}>
      <span {...classes('category-label')}>Brukes i:</span>
      <span {...classes('category')}>{item.category.title}</span>
    </div>
  </div>
);

ConceptContent.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    category: PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
    }),
  }),
};
class ListViewDialog extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.closeCallback) this.props.closeCallback();
  }

  render() {
    /*
    <div {...classes('')}>
      <div {...classes('topbar')}>
        <h1 {...classes('name')}>
          {item.name}{' '}
          <span {...classes('subject')}>{item.subject.title}</span>
        </h1>
      </div>
    */
    const { item } = this.props;
    const dialogContent =
      <Tabs
        selectedIndex={0}
        tabs={[
          {
            title: 'Begrep',
            content: <ConceptContent item={item} />,
          },
          {
            title: 'Ordliste',
            content: <p>Ordliste</p>,
          },
        ]} />;

    return (
      <div>
      { createUniversalPortal(
        <ConceptDialog
          id={1}
          title={item.name}
          subtitle={item.category.title}
          content={dialogContent}
          modifiers={['visible', 'listview']}
          messages={{
            close: 'Lukk',
            ariaLabel: '',
          }}
          closeCallback={this.handleClick}
          license={item.license}
          source={item.source} />,
          'body'
      )}
      </div>
    );
  }
}

ListViewDialog.propTypes = {
  item: PropTypes.shape({}),
  closeCallback: PropTypes.func,
  setItemCallback: PropTypes.func,
  index: PropTypes.number,
};

export default ListViewDialog;
