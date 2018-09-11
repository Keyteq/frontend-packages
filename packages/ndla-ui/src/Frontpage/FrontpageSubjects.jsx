import React, { Component, Fragment } from 'react';
import BEMHelper from 'react-bem-helper';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { ChevronDown, ChevronUp } from 'ndla-icons/common';

import { injectT } from 'ndla-i18n';
import {
  FrontpageMenuitemExtention,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Button,
} from 'ndla-ui';
import { OneColumn } from '../Layout';
import SafeLink from '../common/SafeLink';

const wrapperClasses = BEMHelper('c-frontpage-subjects-wrapper');
const sectionClasses = BEMHelper('c-frontpage-subjects-section');

export const FrontpageSubjectsSection = injectT(
  ({ name, subjects, expanded, onExpand, id, isNarrowScreen, t }) => {
    const getItems = (disable = false) =>
      subjects.map(subject => (
        <li key={subject.url} {...sectionClasses('item')}>
          {subject.subLinks && !isNarrowScreen ? (
            <FrontpageMenuitemExtention
              to={subject.url}
              subLinks={subject.subLinks}>
              <span {...sectionClasses('text')}>{subject.text}</span>
              {subject.yearInfo && (
                <span {...sectionClasses('year-info')}>{subject.yearInfo}</span>
              )}
            </FrontpageMenuitemExtention>
          ) : (
            <SafeLink
              tabIndex={disable ? '-1' : null}
              to={subject.url}
              {...sectionClasses('link')}
              aria-label={`${subject.text} ${subject.yearInfo}`}>
              <span {...sectionClasses('text')}>{subject.text}</span>
              {subject.yearInfo && (
                <span {...sectionClasses('year-info')}>{subject.yearInfo}</span>
              )}
            </SafeLink>
          )}
          {subject.beta && (
            <Modal
              narrow
              containerClass={sectionClasses('beta-label-container').className}
              activateButton={
                <Button
                  lighter
                  {...sectionClasses('beta-label')}
                  aria-label={t('subjectPage.subjectIsBeta.dialogHeader')}>
                  {t('subjectPage.subjectIsBeta.iconLabel')}
                </Button>
              }>
              {onClose => (
                <Fragment>
                  <ModalHeader>
                    <ModalCloseButton
                      onClick={onClose}
                      title={t('modal.closeModal')}
                    />
                  </ModalHeader>
                  <ModalBody>
                    <h1>{t('subjectPage.subjectIsBeta.dialogHeader')}</h1>
                    <hr />
                    <p>{t('subjectPage.subjectIsBeta.dialogText')}</p>
                  </ModalBody>
                </Fragment>
              )}
            </Modal>
          )}
        </li>
      ));

    return (
      <nav {...sectionClasses('', { expanded })}>
        <h1 {...sectionClasses('heading')}>
          <button
            type="button"
            onClick={() => {
              onExpand(!expanded);
            }}
            {...sectionClasses('expand-button')}
            aria-expanded={expanded}
            aria-controls={id}>
            <span {...sectionClasses('expand-button-text')}>{name}</span>
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          <span {...sectionClasses('heading-text')}>{name}</span>
        </h1>
        <ul {...sectionClasses('subjects', 'wide')}>{getItems()}</ul>
        <ul
          {...sectionClasses('subjects', 'narrow')}
          id={id}
          aria-hidden={!expanded}>
          {getItems(!expanded)}
        </ul>
      </nav>
    );
  },
);

FrontpageSubjectsSection.propTypes = {
  id: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  onExpand: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isNarrowScreen: PropTypes.bool,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      yearInfo: PropTypes.string,
    }),
  ),
};

export class FrontpageSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: props.expanded,
    };
    this.setScreenSizeDebounced = debounce(() => this.setScreenSize(false), 50);
  }

  componentDidMount() {
    this.setScreenSize(true);
    window.addEventListener('resize', this.setScreenSizeDebounced);
  }

  componentWillUnmount() {
    this.setScreenSizeDebounced.cancel();
    window.removeEventListener('resize', this.setScreenSizeDebounced);
  }

  setScreenSize() {
    const isNarrowScreen =
      (window.innerWidth || document.documentElement.clientWidth) < 601;
    if (isNarrowScreen !== this.state.isNarrowScreen) {
      this.setState({
        isNarrowScreen,
      });
    }
  }

  render() {
    return (
      <OneColumn wide noPadding>
        <div {...wrapperClasses()}>
          {Object.keys(this.props.subjects).map(key => (
            <FrontpageSubjectsSection
              key={key}
              expanded={this.state.expanded === key}
              onExpand={expanded => {
                this.setState({
                  expanded: expanded ? key : undefined,
                });
              }}
              isNarrowScreen={this.state.isNarrowScreen}
              id={key}
              name={this.props.subjects[key].name}
              subjects={this.props.subjects[key].subjects}
            />
          ))}
        </div>
      </OneColumn>
    );
  }
}

FrontpageSubjects.propTypes = {
  expanded: PropTypes.string,
  subjects: PropTypes.shape({
    id: PropTypes.isRequired,
    name: PropTypes.isRequired,
    subject: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        yearInfo: PropTypes.string,
      }),
    ),
  }),
};

FrontpageSubjects.defaultProps = {
  expanded: undefined,
};

export default FrontpageSubjects;
