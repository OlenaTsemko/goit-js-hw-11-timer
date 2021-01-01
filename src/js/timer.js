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
    // this.newTime = null;
    this.timerView = document.querySelector(selector);
    this.wishDate = targetDate.getTime();

    this.start();
  }

  render() {
    const currentTime = Date.now();
    const deltaTime = this.wishDate - currentTime;

    if (deltaTime <= 0) {
      this.stop();
      return;
    }

    this.getTimeParts(deltaTime);
  }

  start() {
    this.render();

    this.intervalId = setInterval(() => {
      this.render();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.getTimeParts(0);

    finishTimer();
  }

  getTimeParts(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    const newTime = { days, hours, mins, secs };

    updateTimerView(newTime);
    // updateTimerView({ days, hours, mins, secs });
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jan 01, 2022'),
});

function updateTimerView({ days, hours, mins, secs }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}

function finishTimer() {
  refs.text.textContent = 'Congratulations! Happy New Year!';
}
