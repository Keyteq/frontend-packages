import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { TopicIntroductionList, SubjectFilter } from 'ndla-ui';

class TwoColumnsExample extends Component {
  constructor(props) {
    super(props);
    this.state = { filterValues: [] };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(newValues) {
    this.setState({ filterValues: newValues });
  }

  filterTopics() {
    const { filterValues } = this.state;
    if (filterValues.length === 0) return this.props.topicList;
    const topics = [];
    const len = this.props.topicList.length;
    for (let i = 0; i < len; i += 1) {
      const topic = this.props.topicList[i];
      const filterlen = filterValues.length;
      for (let j = 0; j < filterlen; j += 1) {
        const filter = filterValues[j];
        if (topic.tags.indexOf(filter) > -1) {
          topics.push(topic);
        }
      }
    }
    return topics;
  }

  render() {
    const { filterValues } = this.state;
    return (
      <section>
        <SubjectFilter
          label="Filter"
          options={this.props.subjectFilterOptions}
          values={filterValues}
          onChange={(newValues, value) => {
            this.onFilterChange(newValues, value, this);
          }}
        />
        <TopicIntroductionList
          toTopic={() => '#'}
          topics={this.filterTopics()}
          twoColumns
          messages={{
            shortcutButtonText: 'Lærestoff',
          }}
        />
      </section>
    );
  }
}

TwoColumnsExample.propTypes = {
  subjectFilterOptions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })),
  topicList: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

TwoColumnsExample.defaultProps = {
  subjectFilterOptions: [
    { title: 'VG1', value: 'VG1' },
    { title: 'VG2', value: 'VG2' },
    { title: 'VG3', value: 'VG3' },
  ],
}

export default TwoColumnsExample;
