import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'
import LearningPathSidebar from './LearningPathSidebar'

const classes = new BEMHelper({
  name: 'learning-path',
  prefix: 'c-',
});

const sidebarData = {
  title: 'Bevegelse og enhet i grafisk design',
  introUrl: 'https://www.wikipedia.org/',
  steps: [
    {
      id: '1',
      title: 'Hva husker du om grafisk design?',
      linkTo: 'https://no.wikipedia.org/wiki/Grafisk_design',
      type: 'assessment-resources',
    },
    {
      id: '2',
      title: 'Blikkets reise over komposisjonen',
      linkTo: 'https://no.wikipedia.org/wiki/Komposisjon_(billedkunst)',
      type: 'subject',
    },
    {
      id: '3',
      title: 'Komposisjonsprinsippet',
      linkTo: 'https://no.wikipedia.org/wiki/Komposisjonsprinsipp',
      type: 'subject-material',
    },
    {
      id: '4',
      title: 'Enhet og rytme',
      linkTo: '#',
      type: 'tasks-and-activities',
    },
    {
      id: '5',
      title: 'Organisering av grafiske elementer',
      linkTo: '#',
      type: 'tasks-and-activities',
    },
    {
      id: '6',
      title: 'Hvor enhetlig er merkevaren?',
      linkTo: '#',
      type: 'source-material',
    },
    {
      id: '7',
      title: 'Retnings og bevegelse i grafisk design',
      linkTo: '#',
      type: 'subject-material',
    },
    {
      id: '8',
      title: 'Fra kaos til system',
      linkTo: '#',
      type: 'assessment-resources',
    },
  ]
}


export class LearningPath extends Component {
  constructor(props) {
    super(props)
    this.state = { activeStep: null }
    this.handlePathSelect = this.handlePathSelect.bind(this)
  }

  handlePathSelect(step) {
    this.setState({ activeStep: step })
  }

  render() {
    const { breadcrumb,  } = this.props
    const { activeStep } = this.state
    const iframeSrc = activeStep ? activeStep.linkTo : sidebarData.introUrl

    return (
      <div {...classes()}>
        <LearningPathSidebar
          title={sidebarData.title}
          steps={sidebarData.steps}
          activeStep={activeStep}
          selectCallback={this.handlePathSelect} />
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
}


LearningPath.propTypes = {
  breadcrumb: PropTypes.node,
}

export default LearningPath
