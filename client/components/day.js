import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { SingleEvent } from './SingleEvent';

class Day extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: ''
    };
  }

  render() {
    const events = this.props.events;
    return (
      <div className="Day-wrapper">
        <div className="Day-header">
          <div>{this.props.dayIdx}</div>
        </div>
        <div className="Day-content">
        {
          events.length ? events.map(event => {
            if (event.eventName){
              return (
                <SingleEvent key={event.monthDay} event={event} />
              );
            }
          }) : ''
      }
        </div>
      </div>
    );
  }
}

const mapState = ({}) => ({});
const mapDispatch = null;

export default connect(
  mapState,
  mapDispatch
)(Day);
