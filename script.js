import { getCalculer } from "./modules/api.mjs";
import { Observable } from "./modules/observ.mjs";

const themeButtons = document.querySelectorAll('.header__theme-menu-button');
const form = document.querySelector('.form');
const display = form.querySelector('#display');
const displayOutput = form.querySelector('#displayOutput');
const digits = document.querySelectorAll('.digits');
const mathButtons = document.querySelectorAll('.mathButtons');
const clearButton = document.querySelector('#clearButton');

themeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.removeAttribute('disabled');
    });
    if (
      [...button.classList].includes('header__theme-menu-button_type_light')
    ) {
      changeTheme('light');
    } else if (
      [...button.classList].includes('header__theme-menu-button_type_dark')
    ) {
      changeTheme('dark');
    } else {
      changeTheme('auto');
    }
    button.classList.add('header__theme-menu-button_active');
    button.setAttribute('disabled', true);
  });
});

function changeTheme(theme) {
  document.body.className = 'page';
  document.body.classList.add(`theme_${theme}`);
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    changeTheme(theme);
    themeButtons.forEach((btn) => {
      btn.classList.remove('header__theme-menu-button_active');
      btn.removeAttribute('disabled');
    });
    document
      .querySelector(`.header__theme-menu-button_type_${theme}`)
      .classList.add('header__theme-menu-button_active');
    document
      .querySelector(`.header__theme-menu-button_type_${theme}`)
      .setAttribute('disabled', true);
  }
}

initTheme();

const viewObserver = new Observable();
const viewResultObserver = new Observable();

function view(arr) {
  display.value = '';
  display.value += arr;
}

function viewResult(arr) {
  displayOutput.value = '';
  displayOutput.value = arr;
}

viewObserver.subscribe(view);
viewResultObserver.subscribe(viewResult);

let model = new function () {
  this.dataForCalculation = [];
  this.result = 0;
}

form.addEventListener('click', clickTracking);

function clickTracking(event) {
  if (event.target.classList.contains('digits')) {
    model.dataForCalculation.push(event.target.value);
    viewObserver.notify(model.dataForCalculation.join(''));
  }

  if (event.target.classList.contains('mathButtons')) {
    if (isNaN(model.dataForCalculation[model.dataForCalculation.length - 1])) {
      model.dataForCalculation.splice((model.dataForCalculation.length - 1), 1, signOperations(event.target.value));
      viewObserver.notify(model.dataForCalculation.join(''));
    } else {
      model.dataForCalculation.push(signOperations(event.target.value))
      viewObserver.notify(model.dataForCalculation.join(''));
    }
  }

  if (event.target.classList.contains('btn_equally')) {
    getCalculer(encodeURIComponent(model.dataForCalculation.join('')))
      .then(data => {
        model.result = data;
        model.dataForCalculation = [];
        model.dataForCalculation.push(String(data));
        viewResultObserver.notify(model.result);

        console.log(model);
      })
  }
}

function signOperations(params) {
  switch (params) {
    case '÷':
      return '/';
      break;
    case 'x':
      return '*';
      break;
    case '-':
      return '-';
      break;
    case '+':
      return '+';
      break;
  }
}