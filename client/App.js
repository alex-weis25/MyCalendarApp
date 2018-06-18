import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Month,
  Week,
  Day
} from './components/index.js';
import { fetchEvents } from './store/calendar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: '',
      events: [],
      view: 'month'
    };
  }

  componentDidMount = () => {
    this.setRedux();
  };

  setRedux = () => {
    const { fetchEvents } = this.props;
    fetchEvents();
  }

  setView = view => {
    this.setState({
      view
    });
  };

  selectComponents() {
    switch (this.state.view) {
      case 'month':
        return <Month />;
      case 'week':
        return (
          <Week />
        );
      case 'day':
        return (
          <Day />
        );
    }
  }

  render() {
    return (
      <div id="App-main">
        <div id="App-Title">
          <div>Alex's Calendar</div>
        </div>
        <div>{this.selectComponents()}</div>
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = { fetchEvents };

export default connect(mapState, mapDispatch)(App);
