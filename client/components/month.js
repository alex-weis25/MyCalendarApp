import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Day } from './index';

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
    });
  };

  render() {
    const days = this.state.calendar;
    const events = this.state.events;
    return (
      <div id="Month-wrapper">
        <div id="Month-dayview">
          {days.length && //deleted events.length &&
            days.map((day, idx) => {
              const todaysEvents = [];
              const dayIdx = idx + 1
              events.map(event => {
                let start = moment(event.startTime).format('DD');
                let end = moment(event.endTime).format('DD');
                if (dayIdx >= +start && dayIdx <= +end) {
                  todaysEvents.push(event);
                }
              });
              return (
                <Day
                  dayIdx={dayIdx}
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
