import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PopUp } from './index.js';
import { SingleEvent } from './SingleEvent';
import { sortEvents } from '../helperFunctions.js';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: '',
      active: false
    };
  }

  togglePopUp = () => {
    event.preventDefault();
    this.setState({
      active: !this.state.active
    });
  };

  render() {
    let events = sortEvents(this.props.events);
    const dayIdx = this.props.dayIdx;
    const currentDay = +this.props.Calendar.selected;
    return (
      <div className="Day-wrapper">
        <div className="Day-header">
          <div>{dayIdx}</div>
        </div>
        <div className="Day-content">
          {events
            ? events.map(event => {
                if (event.eventName) {
                  return <SingleEvent key={event.monthDay} event={event} />;
                }
              })
            : ''}
        </div>
        <div />
        <div className="Edit-btn-wrapper">
          {currentDay && currentDay === dayIdx ? (
            <button className="Edit-btn" onClick={this.togglePopUp}>
              Open Scheduler
            </button>
          ) : (
            ''
          )}
          <div className="toggle-btn">
            {this.state.active ? (
              <PopUp
                closePopUp={this.togglePopUp}
                events={events}
                month={this.props.month}
              />
            ) : (
              ''
            )}
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
)(Day);

/*
<div className="toggle-btn">
          {this.state.active ? (
            <PopUp
              closePopUp={this.togglePopUp}
              events={events}
              month={this.props.month}
            />
          ) : (
            ''
          )}
        </div>
*/
