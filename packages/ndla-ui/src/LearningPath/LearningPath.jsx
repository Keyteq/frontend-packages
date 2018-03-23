import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import LearningPathSidebar from './LearningPathSidebar'

const classes = new BEMHelper({
  name: 'learning-path',
  prefix: 'c-',
});

export const LearningPath = ({ data, activeStep, breadcrumb, selectCallback }) => {
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
            title="Learning Path iframe"
            src={iframeSrc}
            frameBorder="0"
            scrolling="auto" />
        </article>
      </section>
    </div>
  )
}


LearningPath.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        linkTo: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      }),
    ),
  }),
  activeStep: PropTypes.shape({
  }),
  breadcrumb: PropTypes.node,
  selectCallback: PropTypes.func,
}

export default LearningPath
