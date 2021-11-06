var activityPresenter = document.querySelector('.activity-presenter');
var activityTitle = document.querySelector('#new-activity');
var selectorBox = document.querySelector('.selector-box');
//images
var studyImage = document.querySelector('.study-image');
var meditateImage = document.querySelector('.meditate-image');
var exerciseImage = document.querySelector('.exercise-image');
//buttons
var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var startActivityButton = document.querySelector('#start-activity');
var timerView = document.querySelector('.timer-presenter');
var userActivityInputView = document.querySelector('.user-activity-input');
//inputs
var userAccomplishInput = document.querySelector('#user-accomplish');
var userMinutesInput = document.querySelector('#user-minutes');
var userSecondsInput = document.querySelector('#user-seconds');
//timer
var timerDisplay = document.querySelector('.start-time');
var chosenActivityDisplay = document.querySelector('.chosen-activity');
var circle = document.querySelector('.circle');
//errors
var accomplishError = document.querySelector('.accomplish');
var minutesError = document.querySelector('.minutes');
var secondsError = document.querySelector('.seconds');
var keyErrors = ['-', '+', 'e', 'E', '.'];
var currentActivity = {};
var savedActivities = [];
var selectedCategory= "";
var meditateIds = ["meditate", "meditateImg", "meditateText"];
var exerciseIds = ["exercise", "exerciseImg", "exerciseText"];
var studyIds = ["study", "studyImg", "studyText"];

//event listeners
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
selectorBox.addEventListener('click', function (event) {
  checkCategory(event, meditateIds, "Meditate")
  checkCategory(event, exerciseIds, "Exercise")
  checkCategory(event, studyIds, "Study")

});

//functions
function highlightStudy() {
  highlight(studyButton, studyImage, "studyClick", "study");
  unhighlight(meditateButton, meditateImage, "meditateClick", "meditate");
  unhighlight(exerciseButton, exerciseImage, "exerciseClick", "exercise");
};

function highlightMeditate() {
  highlight(meditateButton, meditateImage, "meditateClick", "meditate");
  unhighlight(studyButton, studyImage, "studyClick", "study");
  unhighlight(exerciseButton, exerciseImage, "exerciseClick", "exercise");
};

function highlightExercise() {
  highlight(exerciseButton, exerciseImage, "exerciseClick", "exercise");
  unhighlight(meditateButton, meditateImage, "meditateClick", "meditate");
  unhighlight(studyButton, studyImage, "studyClick", "study");
};

function showTimer() {
  show(timerView);
  hide(userActivityInputView);
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
    element.classList.add('green');
  } else if (currentActivity.category === "Meditate") {
    element.classList.add('purple');
  } else if (currentActivity.category === "Exercise") {
    element.classList.add('red');
  }
};

function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};

function visible(element) {
  element.classList.remove('visibility');
};

function invisible(element) {
  element.classList.add('visibility');
};
