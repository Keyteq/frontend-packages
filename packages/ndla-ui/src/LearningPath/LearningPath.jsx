import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import { Button } from 'ndla-ui'
import { RightArrow } from 'ndla-icons/action'
import LearningPathSidebar from './LearningPathSidebar'

const classes = new BEMHelper({
  name: 'learning-path',
  prefix: 'c-',
});

// Object to verify learningPath objects in prop types validation
const stepObject = {
  id: PropTypes.string,
  title: PropTypes.string,
  linkTo: PropTypes.string,
  type: PropTypes.string,
};

export const LearningPath = ({
  data,
  activeStep,
  nextStep,
  previousStep,
  breadcrumb,
  selectCallback,
}) => {
  const iframeSrc = activeStep ? activeStep.linkTo : data.introUrl
  return (
    <div {...classes()}>
      <LearningPathSidebar
        title={data.title}
        steps={data.steps}
        activeStep={activeStep}
        linkLabel={data.linkLabel}
        timeNeeded={data.timeNeeded}
        selectCallback={selectCallback} />
      <section {...classes('content')}>
        { breadcrumb }
        <article {...classes('article')}>
          <iframe
            {...classes('article__iframe')}
            title="Learning Path iframe"
            src={iframeSrc}
            frameBorder="0"
            scrolling="auto" />
        </article>
      </section>
      <nav {...classes('navigation')}>
        <div {...classes('navigation__filler')} />
        <div {...classes('navigation__content')}>
          { previousStep ?
            <div {...classes('navigation__item')}>
              <Button stripped onClick={() => selectCallback(previousStep)}>
                Forrige: { previousStep.title }
              </Button>
            </div>
          : null }
          { nextStep ?
            <div {...classes('navigation__item', 'next')}>
              <Button stripped onClick={() => selectCallback(nextStep)}>
                Neste: { nextStep.title }
              </Button>
            </div>
          : null }
        </div>
      </nav>
    </div>
  )
}


LearningPath.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    steps: PropTypes.arrayOf(PropTypes.shape(stepObject)),
  }),
  activeStep: PropTypes.shape(stepObject),
  nextStep: PropTypes.shape(stepObject),
  previousStep: PropTypes.shape(stepObject),
  breadcrumb: PropTypes.node,
  selectCallback: PropTypes.func,
}

export default LearningPath
