import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import {
  ContentTypeBadge,
} from 'ndla-ui';
import {
  Checked,
  Time,
} from 'ndla-icons/common';

const classes = new BEMHelper({
  name: 'learning-path',
  prefix: 'c-',
});

const LearningPathSidebarIcon = ({  activeStepLoaded, step, activeStep }) => {
  if (activeStepLoaded || !activeStep) {
    return (<ContentTypeBadge type={step.type} extraClass='c-learning-path__navitem-icon' background />)
  }
  return <div {...classes('navitem-icon')}><Checked /></div>
}

LearningPathSidebarIcon.propTypes = {
  activeStepLoaded: PropTypes.bool,
  step: PropTypes.shape(),
  activeStep: PropTypes.shape(),
};

function handleKeyDown(evt) {
  if (evt.keyCode === 32) {
    evt.preventDefault();
  }
}

const LearningPathSidebarItem = ({ step, activeStep, activeStepLoaded, callback, keyUpCallback }) => {
  const modifiers = []
  if (!activeStepLoaded && activeStep) {
     modifiers.push('done')
  }
  return (
    <li {...classes('navitem', modifiers)}
        key={`navitem-${step.id}`}>
        <div role="button" tabIndex={0} onClick={callback} onKeyUp={(evt)=> keyUpCallback(step, evt)} onKeyDown={(evt) => handleKeyDown(evt)}>
          <div {...classes('navitem-border')} />
          { <LearningPathSidebarIcon activeStepLoaded={ activeStepLoaded } step={step} activeStep={activeStep} /> }
          <span {...classes('navitem-title')}>{ step.title }</span>
        </div>
    </li>
  )
}

LearningPathSidebarItem.propTypes = {
  step: PropTypes.shape(),
  activeStep: PropTypes.shape(),
  activeStepLoaded: PropTypes.bool,
  callback: PropTypes.func,
  keyUpCallback: PropTypes.func,
};

class LearningPathSidebar extends Component {
  constructor(props) {
    super(props)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(step, evt) {
    if (evt.keyCode === 32) {
      evt.preventDefault();
      this.props.selectCallback(step);
    }
  }

  render() {
    const { title, steps, activeStep, linkLabel, timeNeeded, selectCallback } = this.props;
    let activeStepLoaded = false;
    return (
      <ul {...classes('sidebar')}>
        <li {...classes('navitem')}>
          <div onClick={ () => selectCallback(null)} onKeyUp={(evt) => this.handleKeyUp(null,evt)} onKeyDown={(evt) => handleKeyDown(evt) } role="button" tabIndex={0}>
            <div {...classes('navitem-border')} />
            <ContentTypeBadge type="learning-path" extraClass='c-learning-path__navitem-icon' />
            <span {...classes('navitem-title', 'top')}>Du er nå inne i en læringssti</span>
            <h2 {...classes('navheader')}>{ title }</h2>
            <div {...classes('navitem-time')}>
              <Time />
              { timeNeeded }
            </div>
            <span {...classes('navitem-title', 'toplink')}>{ linkLabel }</span>
          </div>
        </li>
        {
          steps.map((step) => {
            if (activeStep) {
              if (step.id === activeStep.id) activeStepLoaded = true
            }
            return (
              <LearningPathSidebarItem
                key={step.id}
                step={step}
                callback={selectCallback}
                keyUpCallback={this.handleKeyUp}
                activeStep={activeStep}
                activeStepLoaded={activeStepLoaded} />)
          }
        )
      }
      </ul>
    )
  }
}

LearningPathSidebar.propTypes =  {
  title: PropTypes.string,
  steps: PropTypes.arrayOf(
    PropTypes.shape(),
  ),
  activeStep: PropTypes.shape(),
  linkLabel: PropTypes.string,
  timeNeeded: PropTypes.string,
  selectCallback: PropTypes.func,
};

export default LearningPathSidebar
