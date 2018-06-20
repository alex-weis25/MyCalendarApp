import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Day, SecondaryHeader } from './index';

import { convertDate } from '../helperFunctions';


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
    this.buildCalendar();
  }

  buildCalendar = () => {
    const newCalendar = new Array(28).fill('');
    const month = this.props.Calendar.month;
    console.log('building month', this.state);
    this.setState({
      calendar: newCalendar,
      currentMonth: month
    });
    this.componentWillReceiveProps(this.props);
  };

  componentWillReceiveProps = props => {
    const events = props.Calendar.events;
    const month = props.Calendar.month;
    const newEvents = [];
    events.map(event => {
      if (event.month === month) {
        newEvents.push(event);
      }
    });
    this.setState({
      events: newEvents,
      currentMonth: month
    }, () => {
      console.log('received props: ', this.state, this.props);
    });
  };

  render() {
    const days = this.state.calendar;
    const events = this.state.events;
    console.log('month mounting', this.state.currentMonth);
    return (
      <div id="Month-wrapper">
        <h1>Month view</h1>

        <div id="Month-dayview">
          {days.length && //deleted events.length &&
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
