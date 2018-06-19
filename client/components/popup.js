import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { EditEvent, AddEvent } from './index';

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: '',
      type: ''
    };
  }

  componentDidMount = () => {
    this.loadEvents();
  };

  loadEvents = () => {
    const events = this.props.events;
    console.log('events: ', events);
    if (events.length) {
      this.setState({ events });
    }
  };

  onClick = event => {
    event.preventDefault();
    const { name } = event.target;
    this.setState({ type: name });
  };

  render() {
    const type = this.state.type;
    return (
      <div className="popup">
        <div className="popup_inner">
        <div className="Add-event-header">
        My Scheduler</div>
          <div className="btn-wrapper">
            <button className="Add-event-btn" onClick={this.onClick} name="add">
              Add new event
            </button>
            <button
              className="Edit-event-btn"
              onClick={this.onClick}
              name="edit"
            >
              Edit existing event
            </button>
            <div>
              {type === 'add' ? (
                <AddEvent
                  events={this.state.events}
                  month={this.props.month}
                  close={this.props.closePopUp}
                />
              ) : (
                ''
              )}
              {type === 'edit' ? (
                <EditEvent
                  events={this.state.events}
                  month={this.props.month}
                  close={this.props.closePopUp}
                />
              ) : (
              ''
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = null;

export default connect(
  mapState,
  mapDispatch
)(PopUp);
