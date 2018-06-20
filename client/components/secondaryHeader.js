import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertDate, setWeek, setDay } from '../helperFunctions';
import { setMonth, setSelected } from '../store/calendar';

class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeDate = event => {
    event.preventDefault();
    const { value } = event.target;
    const month = this.props.Calendar.month;
    const selected = +this.props.Calendar.selected;
    const view = this.props.view;
    let newMonth;
    /* check for view then check for up or down, set redux */
    if (view === 'month') {
      if (value === 'down') {
        newMonth = convertDate(month, -1);
      } else {
        newMonth = convertDate(month, 1);
      }
      this.props.setMonth(newMonth);
    } else if (view === 'week') {
      if (value === 'down') {
        const newDay = setDay(selected - 7);
        this.props.setSelected(newDay[1]);
        console.log('newDay[0]', newDay[0]);
        if (newDay[0] !== 0) {
          newMonth = convertDate(month, newDay[0]);
          this.props.setMonth(newMonth);
        }
      } else {
        const newDay = setDay(selected + 7);
        this.props.setSelected(newDay[1]);
        if (newDay[0] !== 0) {
          newMonth = convertDate(month, newDay[0]);
          this.props.setMonth(newMonth);
        }
      }
    }
  };

  render() {
    return (
      <div id="Seconadary-header">
        <div className="Month-title">{this.props.Calendar.month}</div>
        <div className="SetView-wrapper">
          <button
            className="Header-btn"
            onClick={() => {
              this.props.setView('month');
            }}
          >
            Month view
          </button>
          <button
            className="Header-btn"
            onClick={() => {
              this.props.setView('week');
            }}
          >
            Week view
          </button>
        </div>
        <div className="Change-date-wrapper">
          <button
            className="Change-date-btn"
            value="down"
            onClick={this.changeDate}
          >
            {' '}
            -{' '}
          </button>
          <button
            className="Change-date-btn"
            value="up"
            onClick={this.changeDate}
          >
            {' '}
            +{' '}
          </button>
        </div>
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = { setMonth, setSelected };

export default connect(
  mapState,
  mapDispatch
)(SecondaryHeader);
