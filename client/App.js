import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Month,
  Week,
  Day,
  SecondaryHeader
} from './components/index.js';
import { fetchEvents, setSelected } from './store/calendar';
import { selectDay } from './helperFunctions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: '',
      events: [],
      view: 'month'
    };
    document.addEventListener('click', () => {
      const selected = selectDay();
      const setSelected = this.props.setSelected;
      setSelected(selected);
    });
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
        {this.selectComponents()}

      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = { fetchEvents, setSelected };

export default connect(mapState, mapDispatch)(App);
