import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  newTimes,
  convertTime,
  setWeek,
  checkTimes,
  buildWeek,
  verifyInputs
} from '../helperFunctions.js';
import { createEvent } from '../store/calendar.js';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: '',
      eventName: '',
      description: '',
      startTime: '',
      endTime: '',
      endDay: '',
      verified: true,
      correctTimes: true
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const { eventName, description, startTime, endTime, endDay } = this.state;
    const month = this.props.month;
    const monthDay = +this.props.Calendar.selected;
    const createEvent = this.props.createEvent;
    /* verification and conversions */
    const newStart = convertTime(month, monthDay, startTime);
    const newEnd = convertTime(month, endDay, endTime);
    const newWeek = setWeek(monthDay);
    const verified = verifyInputs(eventName, startTime, endTime);
    const correctTimes = checkTimes(newStart, newEnd);
    const submitInfo = {
      eventName,
      description,
      month,
      monthDay,
      endDay,
      week: newWeek,
      startTime: newStart,
      endTime: newEnd
    };
    this.setState({ verified, correctTimes }, () => {
      if (this.state.verified && this.state.correctTimes) {
        createEvent(submitInfo);
        this.props.close();
      }
    });
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  /* Form is long, refactoring a possibility */
  render() {
    const daySelect = buildWeek(this.props.Calendar.selected);
    const today = +this.props.Calendar.selected;
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
            <label>
              End Day:
              <select
                value={this.state.endDay}
                onChange={this.handleChange}
                name="endDay"
              >
                <option value="endDay">Select Day</option>
                {daySelect &&
                  daySelect.map(time => {
                    if (time >= today) {
                      return <option value={time}>{time}</option>;
                    }
                  })}
              </select>
            </label>
            <button className="submit-event-btn">Submit</button>
          </form>
          <div className="close-btn-wrapper">
            <div className="Close-btn-top">
              {!this.state.verified ? (
                <div id="Submission-error">
                  You must enter a name, start and end time
                </div>
              ) : (
                ''
              )}
              {this.state.verified && !this.state.correctTimes ? (
                <div id="Submission-error">
                  Your end time must be after your start time
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="Close-btn-bottom">
              <button
                className="edit-event-submit-btn"
                onClick={this.props.close}
              >
                Close
              </button>
            </div>
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
