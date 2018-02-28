/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { ThemeShape } from '../shapes';
import { getCssModifierByTheme, themes } from '../model/Theme';

const classes = new BEMHelper({
  name: 'container',
  prefix: 'o-',
});

export const PageContainer = ({
  children,
  background,
  backgroundWide,
  theme,
}) => {
  const modifiers = { background, backgroundWide };

  const themeModifier = getCssModifierByTheme(theme);

  if (themeModifier) {
    modifiers[themeModifier] = true;
  }

  return <div {...classes('', modifiers)}>{children}</div>;
};

PageContainer.propTypes = {
  theme: ThemeShape,
  children: PropTypes.node,
  background: PropTypes.bool,
  backgroundWide: PropTypes.bool,
};

PageContainer.defaultProps = {
  theme: themes.NORMAL,
  background: false,
  backgroundWide: false,
};

export default PageContainer;
