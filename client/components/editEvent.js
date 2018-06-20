import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { newTimes, convertTime } from "../helperFunctions.js";
import { updateEvent } from "../store/calendar";

class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: "",
      eventName: "",
      description: "",
      startTime: "",
      endTime: ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const { eventName, description, startTime, endTime } = this.state;
    const monthDay = +this.props.Calendar.selected;
    let id = this.props.events.filter(event => {
      if (event.eventName === eventName) {
        return event;
      }
    })[0].id;
    const month = this.props.month;
    const newStart = convertTime(month, monthDay, startTime);
    const newEnd = convertTime(month, monthDay, endTime);
    const submitInfo = {
      eventName,
      description,
      month,
      monthDay,
      startTime: newStart,
      endTime: newEnd
    };
    const updateEvent = this.props.updateEvent;
    updateEvent(id, submitInfo);
    this.props.close();
  };

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const events = this.props.events;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="Add-event-header">Edit event</div>
          <form className="form-control" onSubmit={this.onSubmit}>
            <label>
              Event:
              <select
                value={this.state.eventName}
                onChange={this.handleChange}
                name="eventName"
              >
                <option value="selectEvent">Select Event</option>
                {events &&
                  events.map(event => {
                    return (
                      <option key={event.id} value={event.eventName}>
                        {event.eventName}
                      </option>
                    );
                  })}
              </select>
            </label>
            <text>Description</text>
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
const mapDispatch = { updateEvent };

export default connect(
  mapState,
  mapDispatch
)(EditEvent);
