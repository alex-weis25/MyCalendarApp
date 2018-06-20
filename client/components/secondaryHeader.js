import React, { Component } from "react";
import { connect } from "react-redux";

class SecondaryHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const setView = this.props.setView;
    return (
      <div id="Seconadary-header">
        <h5> Secondary Header </h5>
        <button className='header-btn' onClick={() => {this.props.setView('month')}}> click </button>
        <button className='header-btn' onClick={() => {this.props.setView('week')}}> click </button>
        <button className='header-btn' onClick={() => {this.props.setView('day')}}> click </button>
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = {};

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
