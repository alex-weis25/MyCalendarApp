import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Day, SecondaryHeader } from './index.js';
import { setWeek } from '../helperFunctions';

class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      currentWeek: '',
      days: [],
      events: []
    };
  }

  componentDidMount() {
    this.buildWeek();
  }

  buildWeek = () => {
    let newWeek = new Array(7).fill();
    const selected = +this.props.Calendar.selected;
    let week = setWeek(selected);
    const month = this.props.Calendar.month;
    this.setState({
      days: newWeek,
      month,
      currentWeek: week
    });
    this.componentWillReceiveProps(this.props);
  };

  componentWillReceiveProps = props => {
    const events = props.Calendar.events;
    const selected = +props.Calendar.selected;
    const month = props.Calendar.month;
    const week = setWeek(selected);
    const newEvents = [];
    events.map(event => {
      if (event.week === week) {
        newEvents.push(event);
      }
    });
    this.setState({
      events: newEvents,
      currentWeek: week,
      month
    });
    console.log('state on week: ', this.state, events, week)
  };

  render() {
    const days = this.state.days;
    const weekIdx = this.state.currentWeek;
    const events = this.state.events;
    const month = this.state.month;
    return (
      <div className="Week-wrapper">
        <div className="Week-top">
          <div>Week View</div>

        </div>
        <div className="Week-bottom">
          {days.length &&
            days.map((day, idx) => {
              const todaysEvents = [];
              let dayIdx = (weekIdx - 1) * 7 + idx + 1;
              events.map(event => {
                if (dayIdx === event.monthDay && month === event.month){
                  todaysEvents.push(event);
                }
              });
              return (
                <Day dayIdx={dayIdx} events={todaysEvents} month={month} />
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
)(Week);
