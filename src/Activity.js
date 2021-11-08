class Activity {
  constructor(category, description, minutes, seconds, color) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.color = color;
    this.completed = false;
    this.id = Date.now();
  }
  startTimer(minutes, seconds) {
    disableButton(startTimerButton);
    var timer = setInterval(function () {
      if(seconds > 0) {
        seconds -= 1;
      } else if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
      } else {
        clearInterval(timer);
        show(startTimerButton, 'disabled');
        startTimerButton.innerText = 'FINISHED!';
        show(logActivityButton, 'visibility');
        return timerDisplay.innerText = 'NICE JOB!';
      }
      minutes = minutes.toString().padStart(2, '0');
      seconds = seconds.toString().padStart(2, '0');
      timerDisplay.innerText = `${minutes}:${seconds}`}, 1000
    )
  }
  markComplete() {
    this.completed = true;
  }
  saveToStorage() {

  }
}
