var activityPresenter = document.querySelector('.activity-presenter');
var activityTitle = document.querySelector('#newActivity');
var categoryBox = document.querySelector('.category-box');
//images
var studyImage = document.querySelector('.study-image');
var meditateImage = document.querySelector('.meditate-image');
var exerciseImage = document.querySelector('.exercise-image');
//buttons
var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var startActivityButton = document.querySelector('#startActivity');
var startTimerButton = document.querySelector('.start');
//inputs
var userAccomplishInput = document.querySelector('#userAccomplish');
var userMinutesInput = document.querySelector('#userMinutes');
var userSecondsInput = document.querySelector('#userSeconds');
//views
var timerView = document.querySelector('.timer-presenter');
var userActivityInputView = document.querySelector('.user-activity-input');
//timer
var timerDisplay = document.querySelector('.start-time');
var chosenActivityDisplay = document.querySelector('.chosen-activity');
var circle = document.querySelector('.circle');
//errors
var accomplishError = document.querySelector('.accomplish');
var minutesError = document.querySelector('.minutes');
var secondsError = document.querySelector('.seconds');
var keyErrors = ['-', '+', 'e', 'E', '.'];
//arrays
var savedActivities = [];
var meditateIds = ["meditate", "meditateImg", "meditateText"];
var exerciseIds = ["exercise", "exerciseImg", "exerciseText"];
var studyIds = ["study", "studyImg", "studyText"];
var selectedCategory= "";

var currentActivity = {};

//event listeners
startTimerButton.addEventListener('click', beginTimer);
startActivityButton.addEventListener('click', startActivity);
studyButton.addEventListener('click', highlightStudy);
meditateButton.addEventListener('click', highlightMeditate);
exerciseButton.addEventListener('click', highlightExercise);
userMinutesInput.addEventListener('keydown', function(event) {
  if(keyErrors.includes(event.key)) {
    event.preventDefault();
  }
});
userSecondsInput.addEventListener('keydown', function(event) {
  if(keyErrors.includes(event.key)) {
    event.preventDefault();
  }
});
categoryBox.addEventListener('click', function (event) {
  checkCategory(event, meditateIds, "Meditate")
  checkCategory(event, exerciseIds, "Exercise")
  checkCategory(event, studyIds, "Study")

});

//functions
function highlightStudy() {
  highlight(studyButton, studyImage, "study-click", "study");
  unhighlight(meditateButton, meditateImage, "meditate-click", "meditate");
  unhighlight(exerciseButton, exerciseImage, "exercise-click", "exercise");
};

function highlightMeditate() {
  highlight(meditateButton, meditateImage, "meditate-click", "meditate");
  unhighlight(studyButton, studyImage, "study-click", "study");
  unhighlight(exerciseButton, exerciseImage, "exercise-click", "exercise");
};

function highlightExercise() {
  highlight(exerciseButton, exerciseImage, "exercise-click", "exercise");
  unhighlight(meditateButton, meditateImage, "meditate-click", "meditate");
  unhighlight(studyButton, studyImage, "study-click", "study");
};

function showTimer() {
  show(timerView, 'hidden');
  hide(userActivityInputView, 'hidden');
  changeActivityTitle();
  displayUserInput();
  changeCircleColor(circle);
};

function changeActivityTitle() {
  activityTitle.innerText = 'Current Activity';
};

function highlight(element, element2, rule, icon) {
  if (element.classList.contains(rule)) {
    element2.src = `./assets/${icon}.svg`;
    element.classList.remove(rule);
  } else {
    element2.src = `./assets/${icon}-active.svg`
    element.classList.add(rule);
  };
};

function validateAccomplish() {
  if (userAccomplishInput.value === '') {
    visible(accomplishError);
  };
};

function validateMinutes() {
  if (userMinutesInput.value === '') {
    visible(minutesError);
  };
};

function validatedSeconds() {
  if (userSecondsInput.value === '') {
    visible(secondsError);
  };
};

function startActivity() {
  if (userAccomplishInput.value !== "" && userMinutesInput.value !== "" && userSecondsInput.value !== "") {
    createActivity();
    showTimer();
  } else {
    showErrorMessages();
  }
};

function beginTimer() {
  currentActivity.startTimer(currentActivity.minutes, currentActivity.seconds);
};

function showErrorMessages() {
  validateAccomplish();
  validateMinutes();
  validatedSeconds();
};

function unhighlight(element, element2, rule, icon) {
  element2.src = `./assets/${icon}.svg`;
  element.classList.remove(rule);
};

function createActivity() {
  currentActivity = new Activity(selectedCategory, userAccomplishInput.value, userMinutesInput.value, userSecondsInput.value);
  savedActivities.push(currentActivity);
};

function checkCategory(event, category, activity) {
  for (var i = 0; i < category.length; i++) {
    if (category[i] === event.target.id) {
      selectedCategory = activity;
    }
  }
};

function displayUserInput() {
  currentActivity.minutes = currentActivity.minutes.toString().padStart(2, "0");
  currentActivity.seconds = currentActivity.seconds.toString().padStart(2, "0");
  timerDisplay.innerText = `${currentActivity.minutes}:${currentActivity.seconds}`;
  chosenActivityDisplay.innerText = `${currentActivity.description}`;
}

function changeCircleColor(element) {
  if (currentActivity.category === "Study") {
    hide(element, 'green');
  } else if (currentActivity.category === "Meditate") {
    hide(element, 'purple');
  } else if (currentActivity.category === "Exercise") {
    hide(element, 'red');
  }
};

function show(element, rule) {
  element.classList.remove(rule);
};

function hide(element, rule) {
  element.classList.add(rule);
};

function visible(element) {
  element.classList.remove('visibility');
};

function invisible(element) {
  element.classList.add('visibility');
};
