import axios from 'axios';

/**
 * INITIAL STATE
 */
const initialState = {
  events: [],
  selected: [],
  month: 'June',
  week: 1
};

/**
 * ACTION TYPES
 */
const GET_EVENTS = 'GET_EVENTS';
const SET_SELECTED = 'SET_SELECTED';
const UPDATE_EVENT = 'UPDATE_EVENT';
const ADD_EVENT = 'ADD_EVENT';
const SET_MONTH = 'SET_MONTH';

/**
 * ACTION CREATORS
 */
export const getEvents = events => ({ type: GET_EVENTS, events });
export const setSelected = selected => ({ type: SET_SELECTED, selected });
export const updateNew = updated => ({ type: UPDATE_EVENT, updated });
export const addNew = created => ({ type: ADD_EVENT, created });
export const setMonth = month => ({ type: SET_MONTH, month });

/**
 * THUNK CREATORS
 */

export const fetchEvents = () => dispatch => {
  axios
    .get('/api/events/all')
    .then(res => {
      dispatch(getEvents(res.data));
    })
    .catch(err => console.log(err));
};

export const updateEvent = (id, info) => dispatch => {
  axios
    .put(`/api/events/${id}`, info)
    .then(updated => {
      dispatch(updateNew(updated.data));
    })
    .catch(err => console.log(err));
};

export const createEvent = info => dispatch => {
  axios
    .post(`/api/events`, info)
    .then(created => {
      dispatch(addNew(created.data));
    })
    .catch(err => console.log(err));
};

export const removeEvent = id => dispatch => {
  axios
    .delete(`/api/events/${id}`)
    .then(fetchAll => {
      console.log('fetching all', fetchAll.data);
      dispatch(getEvents(fetchAll.data));
    })
    .catch(err => console.log(err));
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EVENTS:
      return Object.assign({}, state, { events: action.events });

    case SET_SELECTED:
      return Object.assign({}, state, { selected: action.selected });

    case UPDATE_EVENT:
      return Object.assign({}, state, { events: action.updated });

    case ADD_EVENT:
      return Object.assign({}, state, {
        events: [...state.events, action.created]
      });

    case SET_MONTH:
      return Object.assign({}, state, { month: action.month });

    default:
      return state;
  }
}
