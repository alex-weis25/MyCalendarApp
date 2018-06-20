import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertDate } from '../helperFunctions';
import { setMonth } from '../store/calendar';

class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeDate = event => {
    event.preventDefault();
    const { value } = event.target;
    const month = this.props.Calendar.month;
    let newMonth;
    if (value === 'down'){
      newMonth = convertDate(month, -1);
    } else {
      newMonth = convertDate(month, 1);
    }
    this.props.setMonth(newMonth);
  }

  render() {
    const setView = this.props.setView;
    return (
      <div id="Seconadary-header">
        <div className="SetView-wrapper">
          <button className="header-btn" onClick={() => {this.props.setView('month');}}> Month view </button>
          <button className="header-btn" onClick={() => {this.props.setView('week');}}> Week view </button>
          <button className="header-btn" onClick={() => {this.props.setView('day');}}> Day view </button>
        </div>
        <div className="Change-date-wrapper">
          <button className="Change-date-btn" value="down" onClick={this.changeDate}> - </button>
          <button className="Change-date-btn" value="up" onClick={this.changeDate}> + </button>
        </div>
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = { setMonth };

export default connect(
  mapState,
  mapDispatch
)(SecondaryHeader);

/*
<div className="secondary-header-wrapper">
          <button className="header-btn" onClick={setView("month")}>
            Month
          </button>
          <button className="header-btn" onClick={setView("week")}>
            Week
          </button>
          <button className="header-btn" onClick={setView("day")}>
            Day
          </button>
        </div>

*/
