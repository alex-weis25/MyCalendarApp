import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { newTimes, convertTime, setWeek } from '../helperFunctions.js';
import { createEvent } from '../store/calendar.js';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: '',
      eventName: '',
      description: '',
      startTime: '',
      endTime: ''
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const { eventName, description, startTime, endTime } = this.state;
    const month = this.props.month;
    const monthDay = +this.props.Calendar.selected;
    const newStart = convertTime(month, monthDay, startTime);
    const newEnd = convertTime(month, monthDay, endTime);
    const newWeek = setWeek(monthDay);
    const submitInfo = {
      eventName,
      description,
      month,
      monthDay,
      week: newWeek,
      startTime: newStart,
      endTime: newEnd
    };
    const createEvent = this.props.createEvent;
    createEvent(submitInfo);
    this.props.close();
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="Add-event-header">Add event</div>
          <form className="form-control" onSubmit={this.onSubmit}>
            <text className="input-text">Name</text>
            <input
              value={this.state.eventName}
              onChange={this.handleChange}
              name="eventName"
              className="form-control"
              type="text"
            />
            <text className="input-text">Description</text>
            <input
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
              className="form-control"
              type="text"
            />
            <label>
              Start Time:
              <select
                value={this.state.startTime}
                onChange={this.handleChange}
                name="startTime"
              >
                <option value="selectStart">Select Start</option>
                {newTimes &&
                  newTimes.map(time => {
                    return <option value={time}>{time}</option>;
                  })}
              </select>
            </label>
            <label>
              End Time:
              <select
                value={this.state.endTime}
                onChange={this.handleChange}
                name="endTime"
              >
                <option value="selectTime">Select End</option>
                {newTimes &&
                  newTimes.map(time => {
                    return <option value={time}>{time}</option>;
                  })}
              </select>
            </label>
            <button className="edit-event-submit-btn">Submit</button>
          </form>
          <div className="close-btn-wrapper">
            <button
              className="edit-event-submit-btn"
              onClick={this.props.close}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = { createEvent };

export default connect(
  mapState,
  mapDispatch
)(AddEvent);