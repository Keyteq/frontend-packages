/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BEMHelper from 'react-bem-helper';

import { DisplayOnPageYOffset } from '../Animation';
import { themes, getCssModifierByTheme } from '../model/Theme';
import { ThemeShape } from '../shapes';

const classes = new BEMHelper({
  name: 'masthead',
  prefix: 'c-',
});

export const MastheadItem = ({ children, className, left, right }) => {
  const itemClassNames = classNames(
    { [classes('left').className]: left },
    { [classes('right').className]: right },
    className,
  );

  return <div className={itemClassNames}>{children}</div>;
};

MastheadItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  right: PropTypes.bool,
  left: PropTypes.bool,
};

MastheadItem.defaultProps = {
  right: false,
  left: false,
};

const MastheadInfo = ({ children }) => (
  <div {...classes('info')}>
    <div {...classes('info-content')}>{children}</div>
  </div>
);

MastheadInfo.propTypes = {
  children: PropTypes.node.isRequired,
};

export const Masthead = ({
  children,
  fixed,
  hideOnNarrowScreen,
  infoContent,
  theme,
}) => {
  const modifiers = { fixed, hideOnNarrowScreen, infoContent };

  const themeModifier = getCssModifierByTheme(theme);

  if (themeModifier) {
    modifiers[themeModifier] = true;
  }

  return (
    <Fragment>
      <div {...classes('placeholder', { infoContent, fixed })} />
      <div {...classes('', modifiers)}>
        {infoContent && (
          <DisplayOnPageYOffset yOffsetMin={0} yOffsetMax={90}>
            <MastheadInfo>{infoContent}</MastheadInfo>
          </DisplayOnPageYOffset>
        )}

        <div className={`u-1/1 ${classes('content').className}`}>
          {children}
        </div>
      </div>
    </Fragment>
  );
};

Masthead.propTypes = {
  children: PropTypes.node,
  fixed: PropTypes.bool,
  hideOnNarrowScreen: PropTypes.bool,
  infoContent: PropTypes.node,
  theme: ThemeShape,
};

Masthead.defaultProps = {
  theme: themes.NORMAL,
};

export default Masthead;
