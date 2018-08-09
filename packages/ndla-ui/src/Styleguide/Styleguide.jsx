import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/styles/hljs';

import Tabs from 'ndla-tabs';
import { uuid } from 'ndla-util';
import { CopyButton } from 'ndla-ui';

const statusMessages = {
  0: ['Eksperimentel, ikke trygg å bruke', 'alert'],
  1: ['Under utvikling, forvent endringer på komponent', 'alert'],
  2: ['Til testing', 'warn'],
  3: ['Klar for bruk', 'safe'],
};

const classes = BEMHelper('c-styleguide');

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const Styleguide = ({
  reactCode,
  messages,
  status,
  usesPropTypes,
  children,
}) => {
  const tabContent = [
    {
      title: 'Kode eksempel',
      content: (
        <Fragment>
          <CopyButton
            onClick={() => {
              copyToClipboard(reactCode);
            }}
            outline
            copyNode="Kode kopiert!">
            Kopier til clipboard
          </CopyButton>
          <SyntaxHighlighter language="jsx" style={docco}>
            {reactCode}
          </SyntaxHighlighter>
        </Fragment>
      ),
    },
    {
      title: 'PropTypes',
      content: (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {usesPropTypes.map(prop => (
              <tr key={uuid()}>
                <td>{prop.name}</td>
                <td>{prop.type}</td>
                <td className={prop.default === 'Required' ? 'required' : ''}>
                  {prop.default}
                </td>
                <td>{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];
  if (messages) {
    tabContent.push({
      title: 'Annet',
      content: <p>{messages}</p>,
    });
  }
  if (children) {
    tabContent.unshift({
      title: 'Eksempel',
      content: children,
    });
  }
  return (
    <div {...classes('')}>
      <p {...classes('status-label', statusMessages[status][1])}>
        Status: {statusMessages[status][0]}
      </p>
      <Tabs tabs={tabContent} />
    </div>
  );
};

Styleguide.propTypes = {
  reactCode: PropTypes.string,
  messages: PropTypes.string,
  status: PropTypes.oneOf([0, 1, 2, 3]),
  usesPropTypes: PropTypes.arrayOf(PropTypes.shape()),
  children: PropTypes.node,
};

Styleguide.defaultProps = {
  reactCode: `console.log('Nothing added yet..')`,
  messages: undefined,
  status: 0,
  usesPropTypes: [],
  children: null,
};

export default Styleguide;
