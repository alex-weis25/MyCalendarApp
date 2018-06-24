import React, { Component } from 'react';

export default class DaysOfWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="DayOfWeek-wrapper">
        <div className="DayOfWeek">Sunday</div>
        <div className="DayOfWeek">Monday</div>
        <div className="DayOfWeek">Tuesday</div>
        <div className="DayOfWeek">Wednesday</div>
        <div className="DayOfWeek">Thursday</div>
        <div className="DayOfWeek">Friday</div>
        <div className="DayOfWeek">Saturday</div>
      </div>
    );
  }
}
