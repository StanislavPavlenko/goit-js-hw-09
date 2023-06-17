import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const textInput = document.querySelector('input[type="text"]');
const btnStart = document.querySelector('button[data-start]');

btnStart.disabled = true;
let countDown = 0;
let selTimer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      return Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
      selTimer = selectedDates[0];
      countDown = selTimer - Date.now();
    }
  },
};

btnStart.addEventListener('click', () => {
  timer.start();
});

flatpickr(textInput, options);

const timer = {
  timerId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    btnStart.disabled = true;
    textInput.disabled = true;
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      countDown = selTimer - currentTime;
      const { days, hours, minutes, seconds } = convertMs(countDown);
      displayCountDown(days, hours, minutes, seconds);
      if (countDown <= 0) {
        displayCountDown(0, 0, 0, 0);
        clearInterval(this.timerId);
      }
    }, 1000);
  },
};

function convertMs(ms) {

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function displayCountDown(days, hours, minutes, seconds) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent = addLeadingZero(seconds);
}