import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeEvent } from '../store/calendar';

class DeleteEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: '',
      eventName: ''
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const eventName = this.state.eventName;
    const deleteEvent = this.props.removeEvent;
    let id = this.props.events.filter(event => {
      if (event.eventName === eventName) {
        return event;
      }
    })[0].id;
    deleteEvent(id);
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
          <div className="Add-event-header">Delete event</div>
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
            <button className="edit-event-submit-btn">Submit</button>
          </form>
          <div className="close-btn-wrapper">
            <div className="Close-btn-top" />
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
const mapDispatch = { removeEvent };

export default connect(
  mapState,
  mapDispatch
)(DeleteEvent);
