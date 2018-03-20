import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { ConceptDialog } from 'ndla-ui';
import { createUniversalPortal } from '../utils/createUniversalPortal';

const classes = BEMHelper({
  name: 'concept',
  prefix: 'c-',
});

const ConceptContent = ({ item }) => (
  <div>
    { item.image ?
    <div {...classes('popup-image')}>
      <img src={item.image} alt={item.description} />
    </div> : null }
    <p {...classes('description')}>{item.description}</p>
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
    const { item } = this.props;
    const  dialogContent = <ConceptContent item={item} />

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
          source={item.source}
          tags={item.tags}
          ariaHidden={false} />,
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
