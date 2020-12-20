const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
  text: document.querySelector('.some-text'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.newTime = null;
    this.timerView = document.querySelector(selector);
    this.wishDate = targetDate.getTime();
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();

      const deltaTime = this.wishDate - currentTime;

      this.getTimeParts(deltaTime);
      this.stop();
    }, 1000);
  }

  stop() {
    const { days, hours, mins, secs } = this.newTime;

    if (+days <= 0 && +hours <= 0 && +mins <= 0 && +secs <= 0) {
      clearInterval(this.intervalId);
      this.getTimeParts(0);

      finishTimer();
    }
  }

  getTimeParts(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this.newTime = { days, hours, mins, secs };

    updateTimerView(this.newTime);
    // updateTimerView({ days, hours, mins, secs });
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2021'),
  // targetDate: new Date(2020, 11, 20, 23, 27),
});

timer.start();

function updateTimerView({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}

function finishTimer() {
  refs.text.innerHTML = `Congratulations! Happy New Year!`;
}
