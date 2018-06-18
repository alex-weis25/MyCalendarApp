import React from 'react';
import moment from 'moment';

export const SingleEvent = props => {
  return (
    <div className="event-wrapper">
      <div>{props.event.eventName}</div>
      <div>{props.event.location}</div>
      <div>{moment(props.event.startTime).format('h:mm A')}</div>
    </div>
  );
};
