import React from 'react';
import PropTypes from 'prop-types';
import BEMHelper from 'react-bem-helper';

import SubjectConcept from './SubjectConcept';

import { SubjectSectionTitle } from './Subject';

const classes = BEMHelper('c-subject-concepts');

const SubjectConcepts = ({ concepts, title }) => (
  <section {...classes('')}>
    <SubjectSectionTitle>{title}</SubjectSectionTitle>
    <ul {...classes('list')}>
      {concepts.map(concept => (
        <SubjectConcept
          key={`subjectconcept-${concept.id}`}
          concept={concept}
        />
      ))}
    </ul>
  </section>
);

SubjectConcepts.propTypes = {
  concepts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string),
      source: PropTypes.string,
      content: PropTypes.string.isRequired,
      messages: PropTypes.shape({
        ariaLabel: PropTypes.string.isRequired,
        close: PropTypes.string.isRequired,
      }),
      license: PropTypes.string,
      children: PropTypes.string,
      visible: PropTypes.bool,
      closeCallback: PropTypes.func,
      dialogRef: PropTypes.func,
    }),
  ),
  title: PropTypes.string,
};

SubjectConcepts.defaultProps = {
  concepts: [],
  title: '',
};

export default SubjectConcepts;
