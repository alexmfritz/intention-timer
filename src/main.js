var activityPresenter = document.querySelector('.activity-presenter');
var activityTitle = document.querySelector('#new-activity');
var selectorBox = document.querySelector('.selector-box');
//buttons
var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var startActivityButton = document.querySelector('#start-activity');
var timerView = document.querySelector('.timer-presenter');
var userActivityInputView = document.querySelector('.user-activity-input');
//inputs
var userAccomplishInput = document.querySelector('#user-accomplish');
var userMinutesInput = document.querySelector('#minutes');
var userSecondsInput = document.querySelector('#seconds');
//errors
var selectionError = document.querySelector('.selection');
var accomplishError = document.querySelector('.accomplish');
var minutesError = document.querySelector('.minutes');
var secondsError = document.querySelector('.seconds');

//event listeners

startActivityButton.addEventListener('click', showTimer);

//functions

function showTimer(element) {
  show(timerView);
  hide(userActivityInputView);
  changeActivityTitle();
};

function changeActivityTitle() {
  activityTitle.innerText = 'Current Activity';
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
