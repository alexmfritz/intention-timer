class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }
  startTimer(minutes, seconds) {
   disableButton(startTimerButton);
   setInterval(function () {
     if(seconds > 0) {
       seconds -= 1;
     } else if (minutes > 0) {
       minutes -= 1;
       seconds = 59;
     } else if (minutes == 0 && seconds == 0) {
       show(startTimerButton, 'disabled');
       startTimerButton.innerText = 'FINISHED!';
       visible(logActivityButton);
       return timerDisplay.innerText = 'NICE JOB!';
     }
     minutes = minutes.toString().padStart(2, '0');
     seconds = seconds.toString().padStart(2, '0');
     timerDisplay.innerText = `${minutes}:${seconds}`}, 1000
   )
  }
  markComplete() {
    this.completed = true;
    hide(pastActivitiesText, 'hidden');


  }
  saveToStorage() {

  }
}


module.exports = Activity;
