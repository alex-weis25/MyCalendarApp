import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Day } from './index';

import { convertDate } from '../helperFunctions';
const today = new Date();

class Month extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: '',
      calendar: '',
      events: []
    };
  }

  componentDidMount() {
    this.buildCalendar(today);
  }

  buildCalendar = date => {
    const newCalendar = new Array(28).fill('');
    const month = convertDate(date);
    this.setState({
      calendar: newCalendar,
      currentMonth: month
    });
  };

  componentWillReceiveProps = props => {
    const events = props.Calendar.events;
    const month = this.state.currentMonth;
    const newEvents = [];
    events.map(event => {
      if (event.month === month) {
        newEvents.push(event);
      }
    });
    this.setState({ events: newEvents });
  };

  render() {
    const days = this.state.calendar;
    const events = this.state.events;
    return (
      <div id="Month-wrapper">
        <h1>Month view</h1>
        <div id="Month-dayview">
          {days.length &&
            events.length &&
            days.map((day, idx) => {
              const todaysEvents = [];
              events.map(event => {
                if (idx + 1 === event.monthDay) {
                  todaysEvents.push(event);
                }
              });
              return (
                <Day
                  dayIdx={idx + 1}
                  events={todaysEvents}
                  month={this.state.currentMonth}
                />
              );
            })}
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
)(Month);
