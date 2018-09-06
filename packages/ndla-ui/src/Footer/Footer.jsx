/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Button,
} from 'ndla-ui';
import Tabs from 'ndla-tabs';

import { privacyTexts } from './privacyTexts';

export const FooterText = ({ children }) => (
  <p className="footer_text">{children}</p>
);

FooterText.propTypes = {
  children: PropTypes.node.isRequired,
};

export const FooterRuler = () => <div className="footer_ruler" />;

export const FooterEditor = ({ title, name }) => (
  <span className="footer_editor">
    {title} <strong>{name}</strong>
  </span>
);

const FooterPrivacy = ({ lang }) => (
  <Modal
    size="medium"
    activateButton={
      <Button renderAsLink>{privacyTexts[lang].linkLabel}</Button>
    }>
    {onClose => (
      <Fragment>
        <ModalHeader>
          <ModalCloseButton onClick={onClose} title="Lukk" />
        </ModalHeader>
        <ModalBody>
          <div className="footer_privacy">
            <h1 id="privacyId">{privacyTexts[lang].header}</h1>
            <Tabs
              tabs={privacyTexts[lang].tabs.map(tab => ({
                title: tab.title,
                content: tab.content,
              }))}
            />
          </div>
        </ModalBody>
      </Fragment>
    )}
  </Modal>
);

FooterPrivacy.propTypes = {
  lang: PropTypes.string.isRequired,
};

FooterEditor.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const Footer = ({ lang, children }) => (
  <footer className="footer">
    {children}
    <FooterPrivacy lang={lang} />
  </footer>
);

Footer.propTypes = {
  children: PropTypes.node.isRequired,
  lang: PropTypes.oneOf(['nb', 'nn', 'en']),
};

Footer.defaultProps = {
  lang: 'nb',
};

// expose the children to top level exports for ease of use
Footer.Text = FooterText;
Footer.Ruler = FooterRuler;
Footer.Editor = FooterEditor;

export default Footer;
