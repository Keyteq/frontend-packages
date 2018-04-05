import React, { Component } from 'react'
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

export class LearningPath extends Component {
  constructor(props) {
    super(props);
    this.state = { iframeHeight: null, articleHeight: null };
    this.handleIframeSize = this.handleIframeSize.bind(this);
  }

  componentDidMount() {
    this.iframeRef.addEventListener('load', this.handleIframeSize);
  }

  handleIframeSize() {
    const iframe = this.iframeRef;

    try {
      if (iframe.contentWindow.document) {
        this.setState({ iframeHeight: iframe.contentWindow.document.body.scrollHeight })
      }
    } catch(error) {
      const clientRect = iframe.getBoundingClientRect();
      const height = window.innerHeight - clientRect.top - 100;
      this.setState({ articleHeight: height })
    }
  }

  render() {
    const {
      data,
      activeStep,
      nextStep,
      previousStep,
      breadcrumb,
      selectCallback,
    } = this.props;
    const {
      iframeHeight,
      articleHeight,
    } = this.state;
    const iframeSrc = activeStep ? activeStep.linkTo : data.introUrl
    const articleStyle = {}
    const iframeHeightAttr = iframeHeight || '99.99%'
    const iframeScrollAttr = iframeHeight ? 'no' : 'auto'
    if (articleHeight && !iframeHeight) {
      articleStyle.height = articleHeight
    } else if (iframeHeight) {
      articleStyle.height = iframeHeight + 2;
    }

    return (
      <div {...classes()}>
        <LearningPathSidebar
        title={data.title}
        steps={data.steps}
        activeStep={activeStep}
        linkLabel={data.linkLabel}
        timeNeeded={data.timeNeeded}
        selectCallback={selectCallback} />
        <main {...classes('content')}>
          { breadcrumb }
          <article {...classes('article')} style={articleStyle}>
            <iframe
              {...classes('article__iframe')}
              ref={ref => {
                this.iframeRef = ref;
              }}
              title="Learning Path iframe"
              src={iframeSrc}
              height={iframeHeightAttr}
              frameBorder="0"
              scrolling={iframeScrollAttr} />
          </article>
        </main>
        <nav {...classes('navigation')}>
          <div {...classes('navigation__filler')} />
          <div {...classes('navigation__content')}>
            { previousStep ?
              <div {...classes('navigation__item')}>
              <Button stripped onClick={() => selectCallback(previousStep)}>
              Forrige: { previousStep.title }
              </Button>
              </div> : null }
            { nextStep ?
              <div {...classes('navigation__item', 'next')}>
                <Button stripped onClick={() => selectCallback(nextStep)}>
                  Neste: { nextStep.title }
                </Button>
              </div> : null }
                </div>
          </nav>
        </div>
      )
  }
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
