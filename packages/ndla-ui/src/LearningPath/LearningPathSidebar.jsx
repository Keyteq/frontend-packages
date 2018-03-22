import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import {
  ContentTypeBadge,
} from 'ndla-ui';
import {
  Checked,
} from 'ndla-icons/common';
import * as contentTypes from '../model/ContentType';


const classes = new BEMHelper({
  name: 'learning-path',
  prefix: 'c-',
});

const LearningPathSidebarIcon = ({  activeStepLoaded, step, activeStep }) => {
  if (activeStepLoaded || !activeStep) {
    return (<ContentTypeBadge type={step.type} extraClass='c-learning-path__navitem-icon' />)
  }
  return <div {...classes('navitem-icon')}><Checked /></div>
}

const LearningPathSidebarItem = ({ step, index, callback, activeStep, activeStepLoaded }) => {
  const modifiers = []
  if (!activeStepLoaded && activeStep) {
     modifiers.push('done')
  }
  return (
    <li {...classes('navitem', modifiers)}
        key={`navitem-${step.id}`}
        onClick={() => callback(step)}>
      <div {...classes('navitem-border')} />
      { <LearningPathSidebarIcon activeStepLoaded={ activeStepLoaded } step={step} activeStep={activeStep} /> }
      <span {...classes('navitem-title')}>{ step.title }</span>
    </li>
  )
}

const LearningPathSidebar = ({ title, steps, activeStep, selectCallback }) => {
  let activeStepLoaded = false
  return (
    <ul {...classes('sidebar')}>
      <li {...classes('navitem')}>
      <div {...classes('navitem-border')} />
      <ContentTypeBadge type="learning-path" extraClass='c-learning-path__navitem-icon' />
      <span {...classes('navitem-title', 'top')}>Du er nå inne i en læringssti</span>
      <h2 {...classes('navheader')}>{ title }</h2>
      </li>
      {
        steps.map((step, index) => {
          if (activeStep) {
            if (step.id === activeStep.id) activeStepLoaded = true
          }
          return (<LearningPathSidebarItem
                    key={step.id}
                    step={step}
                    index={index}
                    callback={selectCallback}
                    activeStep={activeStep}
                    activeStepLoaded={activeStepLoaded} />)
        }
      )
    }
    </ul>
  )
}

export default LearningPathSidebar
