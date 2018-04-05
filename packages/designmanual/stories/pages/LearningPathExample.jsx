import React, { Component } from 'react';
import { LearningPath } from 'ndla-ui';

import { learningPath, topicList, subjectList } from '../../dummydata/index';

import Breadcrumb from '../molecules/breadcrumbs';

class LearningPathExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: null,
      nextStep: learningPath.steps[0],
      previousStep: null,
    };
    this.handlePathSelect = this.handlePathSelect.bind(this);
  }

  handlePathSelect(step) {
    const { steps } = learningPath;
    const len = steps.length;
    console.log(step);
    if (step) {
      for (let i = 0; i < len; i += 1) {
        const s = steps[i];
        if (step.id === s.id) {
          const nextStep = steps[i + 1] || null;
          const previousStep = steps[i - 1] || null;
          this.setState({ activeStep: step, nextStep, previousStep });
          break;
        }
      }
    } else {
      this.setState({
        activeStep: null,
        nextStep: learningPath.steps[0],
        previousStep: null,
      });
    }
  }

  render() {
    const { activeStep, nextStep, previousStep } = this.state;
    return (
      <div>
        <LearningPath
          data={learningPath}
          activeStep={activeStep}
          nextStep={nextStep}
          previousStep={previousStep}
          selectCallback={this.handlePathSelect}
          breadcrumb={<Breadcrumb />}
        />
      </div>
    );
  }
}

export default LearningPathExample;
