import React from "react";
import moment from "moment";

export const SingleEvent = props => {
  return (
    <div className="event-wrapper">
      <div className="event-time">
        {moment(props.event.startTime).format("h:mm A")}
      </div>
      <div className="event-detail">
        {props.event.eventName} <br />
        {props.event.location} <br />
      </div>
    </div>
  );
};
