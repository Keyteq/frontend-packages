import React, { Component } from 'react'
import {
  Breadcrumb,
  LearningPath,
} from 'ndla-ui'
import { learningPath, topicList, subjectList } from '../../dummydata/index';

class LearningPathExample extends Component {
  constructor(props) {
    super(props)
    this.state = { activeStep: null }
    this.handlePathSelect = this.handlePathSelect.bind(this)
  }

  handlePathSelect(step) {
    this.setState({ activeStep: step });
  }

  render() {
    return (
      <div>
        <LearningPath
          data={learningPath}
          activeStep={this.state.activeStep}
          selectCallback={this.handlePathSelect}
          breadcrumb={
          <Breadcrumb
            toSubjects={() => '#'}
            subjectsTitle="Fag"
            subject={subjectList[1]}
            topicPath={topicList.slice(0, -1)}
            toTopic={() => '#'}
            isCurrent />} />
      </div>
    )
  }
}

export default LearningPathExample;
