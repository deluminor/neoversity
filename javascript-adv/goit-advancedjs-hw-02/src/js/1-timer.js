import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateInput: getRequiredElement('#datetime-picker'),
  startButton: getRequiredElement('[data-start]'),
  days: getRequiredElement('[data-days]'),
  hours: getRequiredElement('[data-hours]'),
  minutes: getRequiredElement('[data-minutes]'),
  seconds: getRequiredElement('[data-seconds]'),
};

let userSelectedDate = null;
let intervalId = null;

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const isFutureDate = selectedDate && selectedDate.getTime() > Date.now();

    if (!isFutureDate) {
      userSelectedDate = null;
      refs.startButton.disabled = true;
      iziToast.error({
        title: 'Invalid date',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      return;
    }

    userSelectedDate = selectedDate;
    refs.startButton.disabled = false;
  },
};

flatpickr(refs.dateInput, options);

refs.startButton.addEventListener('click', handleStartTimer);

function handleStartTimer() {
  if (!userSelectedDate) {
    return;
  }

  refs.startButton.disabled = true;
  refs.dateInput.disabled = true;
  updateTimer();

  intervalId = setInterval(updateTimer, 1000);
}

function updateTimer() {
  const timeLeft = userSelectedDate.getTime() - Date.now();

  if (timeLeft <= 0) {
    clearInterval(intervalId);
    intervalId = null;
    userSelectedDate = null;
    refs.dateInput.disabled = false;
    refs.startButton.disabled = true;
    renderTimer(convertMs(0));
    return;
  }

  renderTimer(convertMs(timeLeft));
}

function renderTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function getRequiredElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
}
