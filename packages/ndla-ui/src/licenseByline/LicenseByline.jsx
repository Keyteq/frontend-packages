/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 * FRI OG BEGRENSET
 */
import React, { Component, PropTypes } from 'react';
import Icons from '../icons/Icons';
import LicenseBox from './LicenseBox';

class LicenseByline extends Component {
  constructor() {
    super();
    this.licenseExpander = this.licenseExpander.bind(this);
    this.state = {
      expandLicense: false,
    };
  }

  licenseExpander() {
    this.setState({
      expandLicense: !this.state.expandLicense,
    });
  }
  render() {
    return (
      <div>
        <button>Open</button>
        <div>
          <div><Icons.bysa /></div>
          <div>Usephrase</div>
          <div>Authors</div>
        </div>
        <LicenseBox />
      </div>);
  }

  /*
  render() {
    const { licenseHandler, article, licenseType, contentType, t, top } = this.props;
    const { expandLicense } = this.state;
    const authors = article.copyright.authors.map(author => author.name).join(', ') || t('license.unknown');
    const expandedIcon = classnames({
      'u-expanded--svg': expandLicense,
    });

    const licenseMap = (type) => {
      switch (type.replace(/-/g, '')) {
        case 'cc' : return { img: [<Icon.LicenseCc className={expandedIcon} />] };
        case 'byncnd' : return {
          img: [
            <Icon.LicenseCc className={expandedIcon} />,
            <Icon.LicenseBy className={expandedIcon} />,
            <Icon.LicenseNc className={expandedIcon} />,
            <Icon.LicenseNd className={expandedIcon} />] };
        case 'byncsa' : return {
          img: [
            <Icon.LicenseCc className={expandedIcon} />,
            <Icon.LicenseBy className={expandedIcon} />,
            <Icon.LicenseNc className={expandedIcon} />,
            <Icon.LicenseSa className={expandedIcon} />],
        };
        case 'bync' : return { img: [<Icon.LicenseCc className={expandedIcon} />, <Icon.LicenseBy className={expandedIcon} />, <Icon.LicenseNc className={expandedIcon} />] };
        case 'bynd' : return { img: [<Icon.LicenseCc className={expandedIcon} />, <Icon.LicenseBy className={expandedIcon} />, <Icon.LicenseNd className={expandedIcon} />] };
        case 'bysa' : return { img: [<Icon.LicenseCc className={expandedIcon} />, <Icon.LicenseBy className={expandedIcon} />, <Icon.LicenseSa className={expandedIcon} />] };
        default : return { img: [] };
      }
    };
    if (top) {
      return (
        <div className={classnames('license', { 'u-expanded': expandLicense })}>
          {
            licenseHandler && contentType ?
              <button
                className="un-button license-toggler site-nav_link"
                onClick={this.licenseExpander}
              >
                {expandLicense ? t('license.actionClose') : t(`license.usePhrase.${licenseType.replace(/-/g, '')}`)}
              </button> : null
          }
          { expandLicense &&
            <LicenseBox
              article={article}
              licenseType={licenseType}
            ><div className="license-byline__icons">
              {
                licenseMap(licenseType).img.map(((licenseIcon, index) => (<span className="license__icon" key={index}>{licenseIcon}</span>)))
              }
            </div>
              <div className="license-byline__body">
                <span>{t(`license.usePhrase.${licenseType.replace(/-/g, '')}`)}</span>
              </div>
              <div className="license-byline__body">
                <span className="article_meta">{authors}. {t('article.published')}: {article.created}</span>.
              </div>
            </LicenseBox>
          }
        </div>
      );
    }
    return (
      <div className={classnames('license', { 'u-expanded': expandLicense })}>
        {
          licenseHandler && contentType ?
            <button
              className="un-button license-toggler site-nav_link"
              onClick={this.licenseExpander}
            >
              {expandLicense ? t('license.actionClose') : `${t('license.actionOpen')} ${contentType.toLowerCase()}`}
            </button> : null
        }
        <div className="license-byline">
          <div className="license-byline__icons">
            {
              licenseMap(licenseType).img.map(((licenseIcon, index) => (<span className="license__icon" key={index}>{licenseIcon}</span>)))
            }
          </div>
          <div className="license-byline__body">
            <span>{t(`license.usePhrase.${licenseType.replace(/-/g, '')}`)}</span>
          </div>
          <div className="license-byline__body">
            <span className="article_meta">{authors}. {t('article.published')}: {article.created}</span>.
          </div>
        </div>
        { expandLicense &&
          <LicenseBox
            article={article}
            licenseType={licenseType}
          />
        }
      </div>
    );
  }
  // render end */
}
/*
LicenseByline.propTypes = {
  article: PropTypes.object,
  contentType: PropTypes.string,
  licenseType: PropTypes.string,
  licenseHandler: PropTypes.func,
  top: PropTypes.bool,
};
*/
LicenseByline.defaultProps = {
  hideLicenseByline: false,
  licenseType: null,
  contentType: null,
  t: () => false,
  article: {
    copyright: {
      authors: [],
    },
  },
  licenseHandler: () => true,
};

export default LicenseByline;
