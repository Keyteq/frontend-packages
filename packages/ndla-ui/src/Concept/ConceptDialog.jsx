import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { getLicenseByAbbreviation } from 'ndla-licenses';
import LicenseByline from '../LicenseByline';

const classes = new BEMHelper({
  name: 'concept',
  prefix: 'c-',
});
const sourceClasses = new BEMHelper({
  name: 'source-list',
  prefix: 'c-',
});

const ConceptDialog = ({
  title,
  authors,
  source,
  content,
  id,
  messages,
  license,
  modifiers,
  closeCallback,
  subtitle,
  ariaHidden,
  linkTo,
  tags,
}) => {
  const licenseRights = getLicenseByAbbreviation(license).rights;
  return (
    <div
      aria-hidden={ariaHidden}
      role="dialog"
      data-concept-id={id}
      aria-labelledby={id}
      aria-describedby={id}
      {...classes('popup', modifiers)}>
      <button {...classes('close', 'u-close')} onClick={() => closeCallback ? closeCallback() : null}>{messages.close}</button>
      <h3 {...classes('title')}>{title} { subtitle ? <span {...classes('subtitle')}>{ subtitle }</span> : null }</h3>
      <div {...classes('content')}>{content}</div>
      
      { tags || linkTo ?
      <div {...classes('popup-extra')}>
        { tags ?
          <div { ...classes('popup-tags')}>
            Brukes i:
            { tags.map((tag) => <span {...classes('popup-tag')}>{tag}</span> )}
          </div> : null
        }
        { linkTo ?
          <div {...classes('popup-link')}>
            <a {...classes('linkTo')} href={linkTo.href}>{ linkTo.label }</a>
          </div> : null
        }
      </div> : null }

      <div {...sourceClasses()}>
        {licenseRights.length > 0 && (
          <LicenseByline
          className="c-source-list__item"
          licenseRights={licenseRights}
          />
        )}
        {authors.map(author => (
          <span {...sourceClasses('item')} key={author}>
          {author}
          </span>
        ))}
        <span {...sourceClasses('item')} key={source}>
        {source}
        </span>
      </div>
    </div>
  )
}

ConceptDialog.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(PropTypes.string),
  source: PropTypes.string,
  content: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
  ]).isRequired,
  messages: PropTypes.shape({
    ariaLabel: PropTypes.string.isRequired,
    close: PropTypes.string.isRequired,
  }),
  license: PropTypes.string,
  children: PropTypes.string,
  modifiers: PropTypes.arrayOf(PropTypes.string),
  closeCallback: PropTypes.func,
  subtitle: PropTypes.string,
  ariaHidden: PropTypes.bool,
  linkTo: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

ConceptDialog.defaultProps = {
  authors: [],
  license: '',
  children: '',
  modifiers: [],
  ariaHidden: true,
};

export default ConceptDialog;
