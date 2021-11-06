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
//errors
var selectionError = document.querySelector('.selection');
var accomplishError = document.querySelector('.accomplish');
var minutesError = document.querySelector('.minutes');
var secondsError = document.querySelector('.seconds');
var keyErrors = ['-', '+', 'e', 'E', '.'];

//event listeners

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

startActivityButton.addEventListener('click', showTimer);
studyButton.addEventListener('click', highlightStudy);
meditateButton.addEventListener('click', highlightMeditate);
exerciseButton.addEventListener('click', highlightExercise);

//functions
function highlightStudy() {
  highlight(studyButton, studyImage, "studyClick", "study");
};

function highlightMeditate() {
  highlight(meditateButton, meditateImage, "meditateClick", "meditate");
};

function highlightExercise() {
  highlight(exerciseButton, exerciseImage, "exerciseClick", "exercise");
};

function showTimer(element) {
  show(timerView);
  hide(userActivityInputView);
  changeActivityTitle();
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
  }
};

// function preventKeyInput(event) {
//   if (keyErrors.includes(event.key)) {
//     event.preventDefault();
//   }
// }

// function numbersErrorMessage() {
//   visible(minutesError);
// }


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
