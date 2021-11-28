var activityTitle = document.getElementById('newActivity');
var categoryBox = document.getElementById('categoryBox');
//images
var studyImage = document.getElementById('studyImg');
var meditateImage = document.getElementById('meditateImg');
var exerciseImage = document.getElementById('exerciseImg');
//buttons
var studyButton = document.getElementById('study');
var meditateButton = document.getElementById('meditate');
var exerciseButton = document.getElementById('exercise');
var startActivityButton = document.getElementById('startActivity');
var startTimerButton = document.getElementById('start');
var logActivityButton = document.getElementById('logActivity');
var createNewActivityButton = document.getElementById('createNewActivity');
//inputs
var userAccomplishInput = document.getElementById('userAccomplish');
var userMinutesInput = document.getElementById('userMinutes');
var userSecondsInput = document.getElementById('userSeconds');
//views
var timerView = document.getElementById('timerView');
var userActivityInputView = document.getElementById('userInputView');
var createNewActivityView = document.getElementById('createNewActivityView');
//timer
var timerDisplay = document.getElementById('startTime');
var chosenActivityDisplay = document.getElementById('chosenActivity');
var circle = document.getElementById('circle');
//aside
var pastActivitiesText = document.getElementById('pastParagraphs');
var pastActivitiesBox = document.getElementById('emptyBox');
//errors
var categoryError = document.getElementById('category');
var accomplishError = document.getElementById('accomplish');
var minutesError = document.getElementById('minutesError');
var secondsError = document.getElementById('secondsError');
//data model
var currentActivity = {};
var savedActivities = [];

//functions

const displayLoggedActivity = () => {
  completeActivity();
  pastActivitiesBox.innerHTML = '';
  savedActivities.forEach(item => {
    pastActivitiesBox.innerHTML += `
      <section class="past-activities-box">
      <section class="past-activities">
        <p class="category-header">${item.category}</p>
        <p class="logged-timer">${item.minutes} MIN ${item.seconds} SECONDS</p>
        <p class="activity-description">${item.description}</p>
      </section>
      <section class="category-color-box">
        <div class="category-color-bar ${item.color}"></div>
      </section>
    </section>`
  })
}

const startActivity = () => {
  if (selectedCategory !== '' && userAccomplishInput.value !== '' 
  && userMinutesInput.value !== '' && userSecondsInput.value !== '') {
    createActivity();
    removeClassTimer();
    refreshTimer();
  } else {
    removeClassErrorMessages();
  }
}

const refreshTimer = () => {
  startTimerButton.disabled = false;
  startTimerButton.innerText = 'START';
  addClass([logActivityButton], 'visibility')
}

const changeColorBar = () => {
  savedActivities.forEach(item => {
    if (item.category === 'Study') {
      item.color = 'green-bar';
    } else if (item.category === 'Meditate') {
      item.color = 'purple-bar';
    } else if (item.category === 'Exercise') {
      item.color = 'red-bar';
    }
  })
}

const beginTimer = () => {
  currentActivity.startTimer(currentActivity.minutes, currentActivity.seconds);
  changeColorBar();
}

const removeClassErrorMessages = () => {
  validateCategory();
  validateAccomplish();
  validateMinutes();
  validatedSeconds();
}

const validateCategory = ()  => {
  if (selectedCategory === '') {
    removeClass([categoryError], 'visibility');
  }
}

const unhighlightCategory = (element, element2, rule, icon) => {
  element2.src = `./assets/${icon}.svg`;
  element.classList.remove(rule);
}

const createActivity = () => {
  let color = changeColorBar();
  currentActivity = new Activity(selectedCategory, userAccomplishInput.value, 
    userMinutesInput.value, userSecondsInput.value, color);
  savedActivities.unshift(currentActivity);
}

const checkCategory = (event, category, activity) => {
  category.forEach(item => {
    if (item === event.target.id) {
      selectedCategory = activity;
    }
  })
}

const displayUserInput = () => {
  currentActivity.minutes = currentActivity.minutes.toString().padStart(2, '0');
  currentActivity.seconds = currentActivity.seconds.toString().padStart(2, '0');
  timerDisplay.innerText = `${currentActivity.minutes}:${currentActivity.seconds}`;
  chosenActivityDisplay.innerText = `${currentActivity.description}`;
}

const changeCircleColor = (element) => {
  if (currentActivity.category === 'Study') {
    addClass([element], 'green');
  } else if (currentActivity.category === 'Meditate') {
    addClass([element], 'purple');
  } else if (currentActivity.category === 'Exercise') {
    addClass([element], 'red');
  }
}

const highlightCategoryStudy = () => {
  highlightCategory(studyButton, studyImage, 
    'study-click', 'study');
  unhighlightCategory(meditateButton, meditateImage, 
    'meditate-click', 'meditate');
  unhighlightCategory(exerciseButton, exerciseImage, 
    'exercise-click', 'exercise');
}

const highlightCategoryMeditate = () => {
  highlightCategory(meditateButton, meditateImage, 
    'meditate-click', 'meditate');
  unhighlightCategory(studyButton, studyImage, 
    'study-click', 'study');
  unhighlightCategory(exerciseButton, exerciseImage, 
    'exercise-click', 'exercise');
}

const highlightCategoryExercise = () => {
  highlightCategory(exerciseButton, exerciseImage, 
    'exercise-click', 'exercise');
  unhighlightCategory(meditateButton, meditateImage, 
    'meditate-click', 'meditate');
  unhighlightCategory(studyButton, studyImage, 
    'study-click', 'study');
}

const removeClassTimer = () => {
  removeClass([timerView], 'hidden');
  addClass([userActivityInputView], 'hidden');
  changeActivityTitle();
  displayUserInput();
  changeCircleColor(circle);
}

const changeActivityTitle = () => {
  activityTitle.innerText = 'Current Activity';
}

const highlightCategory = (element, element2, rule, icon) => {
  if (element.classList.contains(rule)) {
    element2.src = `./assets/${icon}.svg`;
    element.classList.remove(rule);
  } else {
    element2.src = `./assets/${icon}-active.svg`;
    element.classList.add(rule);
  }
}

const validateAccomplish = () => {
  if (userAccomplishInput.value === '') {
    removeClass([accomplishError], 'visibility');
  }
}

const validateMinutes = () => {
  if (userMinutesInput.value === '') {
    removeClass([minutesError], 'visibility');
  }
}

const validatedSeconds = () => {
  if (userSecondsInput.value === '') {
    removeClass([secondsError], 'visibility');
  }
}

const displayHomePage = () => {
  activityTitle.innerHTML = 'New Activity';
  clearInput();
  clearButton();
  clearErrorMessage();
  clearCircle();
  addClass([createNewActivityView], 'hidden');
  removeClass([userActivityInputView], 'hidden');
}

const clearInput = () => {
  selectedCategory = '';
  userSecondsInput.value = '';
  userAccomplishInput.value = '';
  userMinutesInput.value = '';
}

const clearButton = () => {
  unhighlightCategory(meditateButton, meditateImage, 
    'meditate-click', 'meditate');
  unhighlightCategory(exerciseButton, exerciseImage, 
    'exercise-click', 'exercise');
  unhighlightCategory(studyButton, studyImage, 
    'study-click', 'study');
}

const clearCircle = () => {
  removeClass([circle], 'green');
  removeClass([circle], 'purple');
  removeClass([circle], 'red');
}

const clearErrorMessage = () => {
  addClass([accomplishError, minutesError, secondsError], 'visibility');
}

const displayCreateNewButton = () => {
  activityTitle.innerText = 'Completed Activity';
  addClass([timerView], 'hidden');
  removeClass([createNewActivityView], 'hidden');
}

const completeActivity = () => {
  currentActivity.markComplete()
}

const disableButton = (element) => {
  element.disabled = true;
  addClass([element], 'disabled');
}

const removeClass = (elements, rule) => {
  elements.forEach(item => item.classList.remove(rule));
}

const addClass = (elements, rule) => {
  elements.forEach(item => item.classList.add(rule));
}

//event listeners
startTimerButton.addEventListener('click', () => {
  beginTimer();
});
startActivityButton.addEventListener('click', () => {
  startActivity();
});
studyButton.addEventListener('click', () => {
  highlightCategoryStudy();
});
meditateButton.addEventListener('click', () => {
  highlightCategoryMeditate();
});
exerciseButton.addEventListener('click', () => {
  highlightCategoryExercise();
});
createNewActivityButton.addEventListener('click', () => {
  displayHomePage();
});
logActivityButton.addEventListener('click', () => {
  addClass([pastActivitiesText], 'hidden');
  removeClass([pastActivitiesBox], 'hidden')
  displayLoggedActivity();
  displayCreateNewButton();
});
userMinutesInput.addEventListener('keydown', (event) => {
  if (keyErrors.includes(event.key)) {
    event.preventDefault();
  }
});
userSecondsInput.addEventListener('keydown', (event) => {
  if (keyErrors.includes(event.key)) {
    event.preventDefault();
  }
});
categoryBox.addEventListener('click', (event) => {
  checkCategory(event, meditateIds, 'Meditate');
  checkCategory(event, exerciseIds, 'Exercise');
  checkCategory(event, studyIds, 'Study');
});