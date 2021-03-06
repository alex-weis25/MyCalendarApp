
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

/* converts date to send to redux state */
export const convertDate = (month, val) => {
  let monthVal = (months[month] + val) % 12;
  if (monthVal < 0) monthVal += 12;
  return monthsReverse[monthVal];
};

/* Find correct parent div for onClick event handler */
export const selectDay = () => {
  const lastClicked = document.getElementsByClassName('selected')[0];
  /* remove previous highlight */
  if (lastClicked) {
    lastClicked.classList.remove('selected');
  }

  /* Find cell */
  const today = window.event.toElement;
  let innerHTML;
  const divs = today.getElementsByTagName('div');
  if (divs[0] && divs[0].className === 'Day-header') {
    today.classList.add('selected');
    innerHTML = divs[1].innerHTML;
    return innerHTML;
  } else {
    /* traverse dom until correct div is found */
    let parent = today.parentNode;
    let parentDivs = parent.getElementsByTagName('div');
    if (parent) {
      while (parentDivs[0].className !== 'Day-header') {
        parent = parent.parentNode;
        parentDivs = parent.getElementsByTagName('div');
      }
    } else {
      return '';
    }
    /* if 'Day-header found, return */
    parent.classList.add('selected');
    innerHTML = parentDivs[1].innerHTML;
    return innerHTML;
  }
};

/* Build times */
const times = new Array(48).fill(0);
export const newTimes = times.map((val, idx) => {
  let start = 0;
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

/* convert time to sequelize value */
export const convertTime = (month, day, time) => {
  const monthDate = months[month];
  const submitDate = new Date(
    2018,
    monthDate,
    day,
    +time.split(':')[0],
    +time.split(':')[1]
  );
  return submitDate;
};

/* build week */
export const buildWeek = day => {
  if (0 < day && day <= 7){
    return [1, 2, 3, 4, 5, 6, 7];
  } else if (7 < day && day <= 14){
    return [8, 9, 10, 11, 12, 13, 14];
  } else if (14 < day && day <= 21){
    return [15, 16, 17, 18, 19, 20, 21];
  } else {
    return [22, 23, 24, 25, 26, 27, 28];
  }
};


/* Sort events by time */
export const sortEvents = array => {
  let updatedOrder = [];
  if (!array) {
    return [];
  } else if (!array.length) {
    return [];
  } else {
    array.forEach(event => {
      for (var i = 0; i < array.length; i++) {
        if (!updatedOrder[i] || event.startTime <= updatedOrder[i].startTime) {
          updatedOrder.splice(i, 0, event);
          break;
        }
      }
    });
  }
  return updatedOrder;
};

/* Set Week by selected */
export const setWeek = val => {
  if (!val) return 1;
  if (val <= 7) {
    return 1;
  } else if (val <= 14) {
    return 2;
  } else if (val <= 21) {
    return 3;
  } else {
    return 4;
  }
};

/* Form validation */
export const verifyInputs = (name, start, end) => {
  if (!start || !end || start === 'Select Start' || end === 'selectTime' || !name || name === ' '){
    return false;
  } else {
    return true;
  }
};

export const checkTimes = (start, end) => {
  if (end <= start){
    return false;
  } else {
    return true;
  }
};


/* increments days in week view, checks for month change */
export const setDay = (val, change) => {
  let newDate = val + change;
  let daySelected;
  let monthChange;
  if (newDate < 0) {
    daySelected = 28 + val;
  } else if (newDate === 0 || newDate === 28) {
    daySelected = 28;
  } else {
    daySelected = Math.abs(newDate % 28);
  }
  /* Don't change month on 28 */
  if (newDate === 28 && change > 0) {
    monthChange = 0;
  } else if (newDate <= 0) {
    newDate -= 28;
    monthChange = Math.ceil(newDate / 28);
  } else {
    monthChange = Math.floor(newDate / 28);
  }
  return [monthChange, daySelected];
};

export const changeMonth = (month, direction) => {
  let newMonth;
  if (direction === 'down') {
    newMonth = convertDate(month, -1);
  } else {
    newMonth = convertDate(month, 1);
  }
  return newMonth;
};

export const changeWeek = (day, month, direction) => {
  let newMonth = month;
  let newDay;
  if (direction === 'down') {
    newDay = setDay(day, -7);
    if (newDay[0] !== 0) {
      newMonth = convertDate(month, newDay[0]);
    }
  } else {
    newDay = setDay(day, 7);
    if (newDay[0] !== 0) {
      newMonth = convertDate(month, newDay[0]);
    }
  }
  return [newMonth, newDay[1]];
};
