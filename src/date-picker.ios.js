import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

let CommunityDatePicker;
let DatePickerIOS;

try {
  CommunityDatePicker = require('@react-native-community/datetimepicker');
} catch (_e) {}

if (!CommunityDatePicker) {
  // Deprecated
  DatePickerIOS = require('react-native').DatePickerIOS;
}

export default class DatePicker extends PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    maximumDate: PropTypes.instanceOf(Date),
    minimumDate: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['date', 'time', 'datetime']),
    onDateChange: PropTypes.func.isRequired,
    minuteInterval: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30]),
  };

  static defaultProps = {
    mode: 'date',
    date: new Date(),
  };

  state = {
    date: null,
  };

  onDateChange = (date) => {
    this.setState({ date });
    this.props.onDateChange(date);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.date !== nextProps.date) {
      return { date: nextProps.date };
    }
    return null;
  }

  render() {
    if (!!CommunityDatePicker) {
      return (
        <CommunityDatePicker
          {...this.props}
          onChange={(_event, date) => {
            this.onDateChange(date);
          }}
          value={this.state.date}
        />
      );
    }
    return (
      <DatePickerIOS
        {...this.props}
        onDateChange={this.onDateChange}
        date={this.state.date}
      />
    );
  }

  getValue() {
    return this.state.date;
  }
}
