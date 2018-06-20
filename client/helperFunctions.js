import React from 'react';
import Popup from 'reactjs-popup';

// Helper's helpers
const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11
};

const monthsReverse = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
};

export const convertDate = (month, val) => {
  console.log('values in convert date', month, val)
  const monthVal = (months[month] + val) % 12;
  return monthsReverse[monthVal];
};

export const selectDay = () => {
  const lastClicked = document.getElementsByClassName('selected')[0];
  /* remove previous highlight */
  if (lastClicked){
    lastClicked.classList.remove('selected');
  }

  /* Find cell */
  const today = window.event.toElement;
  let innerHTML;
  const divs = today.getElementsByTagName('div');
  if (divs[0] && divs[0].className === 'Day-header'){
    today.classList.add('selected');
    innerHTML = divs[1].innerHTML;
    return innerHTML;
  } else {
    /* traverse dom until correct div is found */
    let parent = today.parentNode;
    let parentDivs = parent.getElementsByTagName('div');
    if (parent) {
      while (parentDivs[0].className !== 'Day-header'){
      parent = parent.parentNode;
      parentDivs = parent.getElementsByTagName('div');
    }} else {
      return '';
    }
    /* if 'Day-header found, return */
    parent.classList.add('selected');
    innerHTML = parentDivs[1].innerHTML;
    return innerHTML;
  }
};

/* Build times */
const times = new Array(25).fill(0);
export const newTimes = times.map((val, idx) => {
  let start = 8;
  let hour = Math.floor(idx / 2);
  let min;
  if (idx % 2 === 0) {
    min = '00';
  } else {
    min = (idx % 2) * 30;
  }
  let time = (start + hour).toString() + ':' + min;
  return time;
});


/* convert time to sequelize value /* new Date(2018, 5, 1, 9, 30) */
export const convertTime = (month, day, time) => {
  const monthDate = months[month];
  const submitDate = new Date(2018, monthDate, day, +time.split(':')[0], +time.split(':')[1]);
  return submitDate;
};

/* Sort events by time */
export const sortEvents = array => {
  if (!array) return [];
  if (!array.length) return [];
  const updatedOrder = [];
  array.forEach(event => {
    for (var i = 0; i < array.length; i++) {
      if (!updatedOrder[i] || event.startTime <= updatedOrder[i].startTime) {
        updatedOrder.splice(i, 0, event);
        break;
      }
    }
  });
  return updatedOrder;
};


/* Set Week by selected */

export const setWeek = val => {
  if (!val) return 1;
  if (val <= 7){
    return 1;
  } else if (val <= 14){
    return 2;
  } else if (val <= 21){
    return 3;
  } else {
    return 4;
  }
};
