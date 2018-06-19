import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Month,
  Week,
  Day
} from './components/index.js';
import { fetchEvents, setSelected } from './store/calendar';
import PopUp from './components/popup.js';
import { selectDay } from './helperFunctions';


let showing = false;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calendar: '',
      events: [],
      view: 'month',
      showPopUp: showing
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
    const popUpLive = this.state.showPopUp;
    return (
      <div id="App-main">
        <div id="App-Title">
          <div>Alex's Calendar</div>
        </div>
        <div>{this.selectComponents()}</div>
        <div>{this.state.showPopUp ? <PopUp /> : ''}</div>
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = { fetchEvents, setSelected };

export default connect(mapState, mapDispatch)(App);
