import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Month,
  Week,
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
        return <Month setView={this.setView} />;
      case 'week':
        return (
          <Week setView={this.setView} />
        );
    }
  }

  render() {
    return (
      <div id="App-main">
        <div id="App-Title">
          <SecondaryHeader setView={this.setView} view={this.state.view} />
        </div>
        {this.selectComponents()}
      </div>
    );
  }
}

const mapState = ({ Calendar }) => ({ Calendar });
const mapDispatch = { fetchEvents, setSelected };

export default connect(mapState, mapDispatch)(App);
