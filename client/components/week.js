import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Day } from './index.js';


class Week extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentWeek: 1,
      days: []
    };
  }

  componentDidMount(){
    this.buildWeek();
  }

  buildWeek = () => {
    let newWeek = (new Array(7)).fill(<Day />);
    this.setState({ days: newWeek });
  }

  render() {
    const week = this.state.days;
    return (
      <div className="Day-wrapper">
        {
          week && week.map(day => {
            return <Day key={day} />;
          })
        }
      </div>
    );
  }
}


const mapState = ({ }) => ({ });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(Week);
