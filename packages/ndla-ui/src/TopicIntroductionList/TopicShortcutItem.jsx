import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';
import { ContentTypeBadge, Tooltip, MessagesContext } from 'ndla-ui';

import SafeLink from '../common/SafeLink';

import { ShortcutShape } from '../shapes';

const classes = new BEMHelper({
  name: 'topic-shortcuts',
  prefix: 'c-',
});

const ShortcutItem = ({
  shortcut: { id, tooltip, contentType, url, count },
}) => (
  <MessagesContext.Consumer>
    {context => (
      <Tooltip
        id={`shortcut-tooltip-${id}`}
        tooltip={context.getMessage('resource.shortcutsTooltip', { count })}
        delay={100}
        align="bottom">
        <SafeLink {...classes('item-link')} aria-label={tooltip} to={url}>
          <ContentTypeBadge type={contentType} size="x-small" background />
          <span {...classes('count')}>{count}</span>
        </SafeLink>
      </Tooltip>
    )}
  </MessagesContext.Consumer>
);

ShortcutItem.propTypes = {
  shortcut: ShortcutShape.isRequired,
  disableToolTip: PropTypes.bool,
};

ShortcutItem.defaultProps = {
  disableToolTip: false,
};

export default ShortcutItem;
