var activityPresenter = document.querySelector('.activity-presenter');
var activityTitle = document.getElementById('newActivity');
var categoryBox = document.getElementById('categoryBox');
//images
var studyImage = document.querySelector('.study-image');
var meditateImage = document.querySelector('.meditate-image');
var exerciseImage = document.querySelector('.exercise-image');
//buttons
var studyButton = document.querySelector('.study');
var meditateButton = document.querySelector('.meditate');
var exerciseButton = document.querySelector('.exercise');
var startActivityButton = document.getElementById('startActivity');
var startTimerButton = document.querySelector('.start');
var logActivityButton = document.querySelector('.log-activity-button');
var createNewActivityButton = document.querySelector('.create-new-activity-button');
//inputs
var userAccomplishInput = document.getElementById('userAccomplish');
var userMinutesInput = document.getElementById('userMinutes');
var userSecondsInput = document.getElementById('userSeconds');
//views
var timerView = document.querySelector('.timer-presenter-view');
var userActivityInputView = document.querySelector('.user-activity-input-view');
var createNewActivityView = document.querySelector('.create-new-activity-view');
//timer
var timerDisplay = document.querySelector('.start-time');
var chosenActivityDisplay = document.querySelector('.chosen-activity');
var circle = document.querySelector('.circle');
//aside
var pastActivitiesText = document.querySelector('.past-activities-paragraphs');
var pastActivitiesBox = document.querySelector('.empty-box');
var pastActivityLog = document.querySelector('#activityLog');
//errors
var categoryError = document.querySelector('.category');
var accomplishError = document.querySelector('.accomplish');
var minutesError = document.querySelector('.minutes');
var secondsError = document.querySelector('.seconds');
//data model
var currentActivity = {};
var savedActivities = [];

//event listeners
startTimerButton.addEventListener('click', beginTimer);
startActivityButton.addEventListener('click', startActivity);
studyButton.addEventListener('click', highlightCategoryStudy);
meditateButton.addEventListener('click', highlightCategoryMeditate);
exerciseButton.addEventListener('click', highlightCategoryExercise);
createNewActivityButton.addEventListener('click', displayHomePage);
logActivityButton.addEventListener('click', function(event) {
  addClass(pastActivitiesText, 'hidden');
  removeClass(pastActivitiesBox, 'hidden')
  displayLoggedActivity();
  displayCreateNewButton();
});
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
  checkCategory(event, meditateIds, 'Meditate');
  checkCategory(event, exerciseIds, 'Exercise');
  checkCategory(event, studyIds, 'Study');
});

//functions
function displayLoggedActivity() {
  completeActivity();
  pastActivitiesBox.innerHTML = '';
  for (var i = 0; i < savedActivities.length; i++) {
    pastActivitiesBox.innerHTML += `
    <section class="past-activities-box">
      <section class="past-activities">
        <p class="category-header">${savedActivities[i].category}</p>
        <p class="logged-timer">${savedActivities[i].minutes} MIN ${savedActivities[i].seconds} SECONDS</p>
        <p class="activity-description">${savedActivities[i].description}</p>
      </section>
      <section class="category-color-box">
        <div class="category-color-bar ${savedActivities[i].color}"></div>
      </section>
    </section>`;
  };
};

function startActivity() {
  if (selectedCategory !== '' && userAccomplishInput.value !== '' && userMinutesInput.value !== '' && userSecondsInput.value !== '') {
    createActivity();
    removeClassTimer();
    refreshTimer();
  } else {
    removeClassErrorMessages();
  }
};

function refreshTimer() {
  startTimerButton.disabled = false;
  startTimerButton.innerText = 'START';
  addClass(logActivityButton, 'visibility')
};

function changeColorBar() {
  for (var i = 0; i < savedActivities.length; i++) {
    if (savedActivities[i].category === 'Study') {
      savedActivities[i].color = 'green-bar';
    } else if (savedActivities[i].category === 'Meditate') {
      savedActivities[i].color = 'purple-bar';
    } else if (savedActivities[i].category === 'Exercise') {
      savedActivities[i].color = 'red-bar';
    }
  };
};

function beginTimer() {
  currentActivity.startTimer(currentActivity.minutes, currentActivity.seconds);
  changeColorBar();
};

function removeClassErrorMessages() {
  validateCategory();
  validateAccomplish();
  validateMinutes();
  validatedSeconds();
};

function validateCategory() {
  if (selectedCategory === '') {
    removeClass(categoryError, 'visibility');
  };
};

function unhighlightCategory(element, element2, rule, icon) {
  element2.src = `./assets/${icon}.svg`;
  element.classList.remove(rule);
};

function createActivity() {
  var color = changeColorBar();
  currentActivity = new Activity(selectedCategory, userAccomplishInput.value, userMinutesInput.value, userSecondsInput.value, color);
  savedActivities.unshift(currentActivity);
};

function checkCategory(event, category, activity) {
  for (var i = 0; i < category.length; i++) {
    if (category[i] === event.target.id) {
      selectedCategory = activity;
    };
  };
};

function displayUserInput() {
  currentActivity.minutes = currentActivity.minutes.toString().padStart(2, '0');
  currentActivity.seconds = currentActivity.seconds.toString().padStart(2, '0');
  timerDisplay.innerText = `${currentActivity.minutes}:${currentActivity.seconds}`;
  chosenActivityDisplay.innerText = `${currentActivity.description}`;
};

function changeCircleColor(element) {
  if (currentActivity.category === 'Study') {
    addClass(element, 'green');
  } else if (currentActivity.category === 'Meditate') {
    addClass(element, 'purple');
  } else if (currentActivity.category === 'Exercise') {
    addClass(element, 'red');
  };
};

function highlightCategoryStudy() {
  highlightCategory(studyButton, studyImage, 'study-click', 'study');
  unhighlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
};

function highlightCategoryMeditate() {
  highlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(studyButton, studyImage, 'study-click', 'study');
  unhighlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
};

function highlightCategoryExercise() {
  highlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
  unhighlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(studyButton, studyImage, 'study-click', 'study');
};

function removeClassTimer() {
  removeClass(timerView, 'hidden');
  addClass(userActivityInputView, 'hidden');
  changeActivityTitle();
  displayUserInput();
  changeCircleColor(circle);
};

function changeActivityTitle() {
  activityTitle.innerText = 'Current Activity';
};

function highlightCategory(element, element2, rule, icon) {
  if (element.classList.contains(rule)) {
    element2.src = `./assets/${icon}.svg`;
    element.classList.remove(rule);
  } else {
    element2.src = `./assets/${icon}-active.svg`;
    element.classList.add(rule);
  };
};

function validateAccomplish() {
  if (userAccomplishInput.value === '') {
    removeClass(accomplishError, 'visibility');
  };
};

function validateMinutes() {
  if (userMinutesInput.value === '') {
    removeClass(minutesError, 'visibility');
  };
};

function validatedSeconds() {
  if (userSecondsInput.value === '') {
    removeClass(secondsError, 'visibility');
  };
};

function displayHomePage() {
  activityTitle.innerHTML = 'New Activity';
  clearInput();
  clearButton();
  clearErrorMessage();
  clearCircle();
  addClass(createNewActivityView, 'hidden');
  removeClass(userActivityInputView, 'hidden');
};

function clearInput() {
  selectedCategory = '';
  userSecondsInput.value = '';
  userAccomplishInput.value = '';
  userMinutesInput.value = '';
};

function clearButton() {
  unhighlightCategory(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlightCategory(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
  unhighlightCategory(studyButton, studyImage, 'study-click', 'study');
};

function clearCircle() {
  removeClass(circle, 'green');
  removeClass(circle, 'purple');
  removeClass(circle, 'red');
};

function clearErrorMessage() {
  addClass(accomplishError, 'visibility');
  addClass(minutesError, 'visibility');
  addClass(secondsError, 'visibility');
};

function displayCreateNewButton() {
  activityTitle.innerText = 'Completed Activity';
  addClass(timerView, 'hidden');
  removeClass(createNewActivityView, 'hidden');
};

function completeActivity() {
  currentActivity.markComplete()
};

function disableButton(element) {
  element.disabled = true;
  addClass(element, 'disabled');
};

function removeClass(element, rule) {
  element.classList.remove(rule);
};

function addClass(element, rule) {
  element.classList.add(rule);
};
