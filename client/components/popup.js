import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { EditEvent, AddEvent, DeleteEvent } from "./index";

class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: "",
      type: ""
    };
  }

  componentDidMount = () => {
    this.loadEvents();
  };

  loadEvents = () => {
    const events = this.props.events;
    if (events.length) {
      this.setState({ events });
    }
  };

  onClick = event => {
    event.preventDefault();
    const { name } = event.target;
    this.setState({ type: name });
  };

  selectComponents = () => {
    switch (this.state.type) {
      case "add":
        return (
          <AddEvent
            events={this.state.events}
            month={this.props.month}
            close={this.props.closePopUp}
          />
        );
      case "edit":
        return (
          <EditEvent
            events={this.state.events}
            month={this.props.month}
            close={this.props.closePopUp}
          />
        );
      case "delete":
        return (
          <DeleteEvent
            events={this.state.events}
            month={this.props.month}
            close={this.props.closePopUp}
          />
        );
      default:
        return "";
    }
  };

  render() {
    const type = this.state.type;
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="Add-event-header">My Scheduler</div>
          <div className="btn-wrapper">
            <button
              className="Edit-event-btn"
              onClick={this.onClick}
              name="add"
            >
              Add new event
            </button>
            <button
              className="Edit-event-btn"
              onClick={this.onClick}
              name="edit"
            >
              Edit existing event
            </button>
            <button
              className="Edit-event-btn"
              onClick={this.onClick}
              name="delete"
            >
              Delete existing event
            </button>
            <div>{this.selectComponents()}</div>
          </div>
          <div className="close-btn-wrapper">
            <button
              className="edit-event-submit-btn"
              onClick={this.props.closePopUp}
            >
              Close
            </button>
          </div>
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
)(PopUp);
