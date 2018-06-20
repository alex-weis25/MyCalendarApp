// import React, { Component } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import { Day } from './index.js';


// class Week extends Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       currentWeek: 1,
//       days: []
//     };
//   }

//   componentDidMount(){
//     this.buildWeek();
//   }

//   buildWeek = () => {
//     let newWeek = (new Array(7)).fill(<Day />);
//     this.setState({ days: newWeek });
//   }

//   componentWillReceiveProps = props => {
//     const events = props.Calendar.events;
//     const week = this.state.currentWeek;
//     const selected = this.props.selected;

//     const newEvents = [];
//     events.map(event => {
//       const weekSplit = {
//         1:
//       }
//       if (event.month === month) {
//         newEvents.push(event);
//       }
//     });
//     this.setState({ events: newEvents });
//   };

//   render() {
//     const week = this.state.days;
//     return (
//       <div className="Week-wrapper">
//         {
//           week && week.map(day => {
//             return (
//               <Day
//                   dayIdx={idx + 1}
//                   events={todaysEvents}
//                   month={this.state.currentMonth}
//                 />
//             );
//           })
//         }
//       </div>
//     );
//   }
// }


// const mapState = ({ }) => ({ });
// const mapDispatch = null;

// export default connect(mapState, mapDispatch)(Week);
