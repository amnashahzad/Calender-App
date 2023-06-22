// Get the necessary elements
const dateElement = document.querySelector('.date');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const daysElement = document.querySelector('.days');

// Define variables for the current year and month
let currentYear, currentMonth;

// Define an array to store events
let events = [];

// Event class
class Event {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}

// Display the current date
function displayDate() {
  const options = { month: 'long', year: 'numeric' };
  const currentDate = new Date(currentYear, currentMonth);
  dateElement.innerHTML = currentDate.toLocaleDateString(undefined, options);
}

// Display the days in the calendar
function displayDays() {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  daysElement.innerHTML = '';

  // Add empty cells for the previous month
  for (let i = 0; i < firstDayIndex; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day', 'empty');
    daysElement.appendChild(dayElement);
  }

  // Add days
  for (let i = 1; i <= daysInMonth; i++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');
    dayElement.textContent = i;

    // Check if there are events on this day
    const dayEvents = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === currentYear &&
             eventDate.getMonth() === currentMonth &&
             eventDate.getDate() === i;
    });

    // Add event elements
    dayEvents.forEach((event) => {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event');
      eventElement.textContent = event.title;
      dayElement.appendChild(eventElement);
    });

    daysElement.appendChild(dayElement);
  }
}

// Add an event
function addEvent() {
  const title = prompt('Enter event title:');
  const date = prompt('Enter event date (YYYY-MM-DD):');

  if (title && date) {
    const event = new Event(title, date);
    events.push(event);
    displayDays();
  }
}

// Update the displayed month and year
function updateMonth(direction) {
  if (direction === 'prev') {
    currentMonth--;
    if (currentMonth < 0) {
      currentYear--;
      currentMonth = 11;
    }
  } else if (direction === 'next') {
    currentMonth++;
    if (currentMonth > 11) {
      currentYear++;
      currentMonth = 0;
    }
  }

  displayDate();
  displayDays();
}

// Attach event listeners
prevButton.addEventListener('click', () => updateMonth('prev'));
nextButton.addEventListener('click', () => updateMonth('next'));
daysElement.addEventListener('click', addEvent);

// Initial setup
const currentDate = new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth();
displayDate();
displayDays();
