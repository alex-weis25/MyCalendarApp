import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Day, SecondaryHeader } from "./index.js";
import { setWeek } from "../helperFunctions";

class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeek: 2,
      days: []
    };
  }

  componentDidMount() {
    this.buildWeek();
  }

  buildWeek = () => {
    let newWeek = new Array(7).fill();
    const selected = +this.props.Calendar.selected;
    // const currentWeek = setWeek(selected);
    // console.log('currentWeek', currentWeek);
    this.setState({
      days: newWeek
      // currentWeek
    });
  };

  componentWillReceiveProps = props => {
    // const selected = +this.props.Calendar.selected;
    // const currentWeek = setWeek(selected);
    // console.log('currentWeek WRP', currentWeek);
    // this.setState({ currentWeek });
  };

  render() {
    const week = this.state.days;
    const weekIdx = this.state.currentWeek;
    return (
      <div className="Week-wrapper">
        <div className="Week-top">
          <div>Week View</div>

        </div>
        <div className="Week-bottom">
          {week &&
            week.map((day, idx) => {
              let dayIdx = (weekIdx - 1) * 7 + idx + 1;
              return <Day dayIdx={dayIdx} events={[]} month="June" />;
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
