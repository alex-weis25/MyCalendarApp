import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Day } from './index.js';


class WeekContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentWeek: 1,
      days: []
    };
  }

  componentDidMount(){

  }


  componentWillReceiveProps = props => {

  };

  render() {

    return (
      <div className="WeekContainer-wrapper">

      </div>
    );
  }
}


const mapState = ({ }) => ({ });
const mapDispatch = null;

export default connect(mapState, mapDispatch)(WeekContainer);
