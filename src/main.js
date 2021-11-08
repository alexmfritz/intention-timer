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
var logActivityButton = document.querySelector('.log-activity-button');
var createNewActivityButton = document.querySelector('.create-new-activity-button');
//inputs
var userAccomplishInput = document.querySelector('#userAccomplish');
var userMinutesInput = document.querySelector('#userMinutes');
var userSecondsInput = document.querySelector('#userSeconds');
//views
var timerView = document.querySelector('.timer-presenter');
var userActivityInputView = document.querySelector('.user-activity-input');
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
var keyErrors = ['-', '+', 'e', 'E', '.'];
//arrays
var savedActivities = [];
var meditateIds = ['meditate', 'meditateImg', 'meditateText'];
var exerciseIds = ['exercise', 'exerciseImg', 'exerciseText'];
var studyIds = ['study', 'studyImg', 'studyText'];
var selectedCategory= '';

var currentActivity = {};

//event listeners
createNewActivityButton.addEventListener('click', displayHomePage);
startTimerButton.addEventListener('click', beginTimer);
startActivityButton.addEventListener('click', startActivity);
studyButton.addEventListener('click', highlightStudy);
meditateButton.addEventListener('click', highlightMeditate);
exerciseButton.addEventListener('click', highlightExercise);
logActivityButton.addEventListener('click', function(event) {
  hide(pastActivitiesText, 'hidden');
  show(pastActivitiesBox, 'hidden')
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
function displayHomePage() {
  clearInput();
  clearButton();
  clearErrorMessage();
  clearCircle();
  hide(createNewActivityView, 'hidden');
  show(userActivityInputView, 'hidden');
}

function clearInput() {
  selectedCategory = '';
  userSecondsInput.value = '';
  userAccomplishInput.value = '';
  userMinutesInput.value = '';
}

function clearButton() {
  unhighlight(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlight(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
  unhighlight(studyButton, studyImage, 'study-click', 'study');
}

function clearCircle() {
  show(circle, 'green');
  show(circle, 'purple');
  show(circle, 'red');
}

function clearErrorMessage() {
  hide(accomplishError, 'visibility');
  hide(minutesError, 'visibility');
  hide(secondsError, 'visibility');
}

function displayCreateNewButton() {
  activityTitle.innerText = 'Completed Activity';
  hide(timerView, 'hidden');
  show(createNewActivityView, 'hidden');
}

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
    </section>`
  }
}

function completeActivity() {
  currentActivity.markComplete()
};

function highlightStudy() {
  highlight(studyButton, studyImage, 'study-click', 'study');
  unhighlight(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlight(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
};

function highlightMeditate() {
  highlight(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlight(studyButton, studyImage, 'study-click', 'study');
  unhighlight(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
};

function highlightExercise() {
  highlight(exerciseButton, exerciseImage, 'exercise-click', 'exercise');
  unhighlight(meditateButton, meditateImage, 'meditate-click', 'meditate');
  unhighlight(studyButton, studyImage, 'study-click', 'study');
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
    element2.src = `./assets/${icon}-active.svg`;
    element.classList.add(rule);
  };
};

function validateAccomplish() {
  if (userAccomplishInput.value === '') {
    show(accomplishError, 'visibility');
  };
};

function validateMinutes() {
  if (userMinutesInput.value === '') {
    show(minutesError, 'visibility');
  };
};

function validatedSeconds() {
  if (userSecondsInput.value === '') {
    show(secondsError, 'visibility');
  };
};

function startActivity() {
  if (selectedCategory !== '' && userAccomplishInput.value !== '' && userMinutesInput.value !== '' && userSecondsInput.value !== '') {
    createActivity();
    showTimer();
    refreshTimer();
  } else {
    showErrorMessages();
  }
};

function refreshTimer() {
  startTimerButton.disabled = false;
  startTimerButton.innerText = 'START';
  hide(logActivityButton, 'visibility')
}

function beginTimer() {
  currentActivity.startTimer(currentActivity.minutes, currentActivity.seconds);
};

function showErrorMessages() {
  validateCategory();
  validateAccomplish();
  validateMinutes();
  validatedSeconds();
};

function validateCategory() {
  if (selectedCategory === '') {
    show(categoryError, 'visibility');
  }
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
  currentActivity.minutes = currentActivity.minutes.toString().padStart(2, '0');
  currentActivity.seconds = currentActivity.seconds.toString().padStart(2, '0');
  timerDisplay.innerText = `${currentActivity.minutes}:${currentActivity.seconds}`;
  chosenActivityDisplay.innerText = `${currentActivity.description}`;
};

function changeCircleColor(element) {
  if (currentActivity.category === 'Study') {
    hide(element, 'green');
  } else if (currentActivity.category === 'Meditate') {
    hide(element, 'purple');
  } else if (currentActivity.category === 'Exercise') {
    hide(element, 'red');
  }
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

function disableButton(element) {
  element.disabled = true;
  hide(element, 'disabled');
};

function show(element, rule) {
  element.classList.remove(rule);
};

function hide(element, rule) {
  element.classList.add(rule);
};
