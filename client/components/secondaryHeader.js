import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeWeek, changeMonth } from '../helperFunctions';
import { setMonth, setSelected } from '../store/calendar';
import { DaysOfWeek } from './index';

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
      newMonth = changeMonth(month, value);
      this.props.setMonth(newMonth);
    } else if (view === 'week') {
      let newWeek = changeWeek(selected, month, value);
      if (newWeek[0] !== 0) this.props.setMonth(newWeek[0]);
      console.log('changeWeek', newWeek);
      this.props.setSelected(newWeek[1]);
    }
  };

  render() {
    return (
      <div id="Seconadary-header">
        <div id="Secondary-header-top">
          <div id="Month-title">{this.props.Calendar.month}</div>
          <div id="Secondary-header-top-btn-wrapper">
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
        </div>
        <DaysOfWeek />
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
