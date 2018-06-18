import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';

/**
 * INITIAL STATE
 */
const initialState = {
  events: []
};

/**
 * ACTION CREATORS
 */
export const getEvents = events => ({type: GET_EVENTS, events});

/**
 * THUNK CREATORS
 */
export const fetchEvents = () =>
  dispatch => {
    axios.get('/api/events/all')
      .then(res => {
        dispatch(getEvents(res.data));
      })
      .catch(err => console.log(err));
  };

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return Object.assign({}, state, {events: action.events});

    default:
      return state;
  }
}
