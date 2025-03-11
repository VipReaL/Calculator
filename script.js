import { getCalculer } from "./modules/api.mjs";
import { Observable } from "./modules/observable.mjs";

const themeButtons = document.querySelectorAll('.header__theme-menu-button');
const display = document.querySelector('#display');
const displayOutput = document.querySelector('#displayOutput');
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
  display.value += arr;
}

function viewResult(arr) {
  displayOutput.value = '';
  displayOutput.value = arr;
}

viewObserver.subscribe(view);
viewResultObserver.subscribe(viewResult);

let model = new function () {
  this.variable = '';
  this.numbers = [];
  this.operators = [];
  this.result = 0;
}

digits.forEach(button => {
  button.addEventListener('click', clickDigits);
})

function clickDigits(event) {
  viewObserver.notify(event.target.value);
  model.variable += event.target.value;
}

mathButtons.forEach(button => {
  button.addEventListener('click', clickMathButton);
})

function clickMathButton(event) {
  if (event.target.value !== '=') {
    viewObserver.notify(event.target.value);
    model.numbers.push(Number(model.variable));
    model.variable = '';
    model.operators.push(event.target.value)
  } else {

    if (model.variable !== '') {
      model.numbers.push(Number(model.variable));
      model.variable = '';
      model.result = calculate(model.operators, model.numbers);
      viewResultObserver.notify(model.result);
    }

    model.variable = model.result;
    model.numbers = [];
    model.operators = [];
    model.result = 0;
  }
}

function calculate(operators, numbers) {
  try {
    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
      switch (operators[i]) {
        case '+':
          result += numbers[i + 1];
          break;
        case '-':
          result -= numbers[i + 1];
          break;
        case 'x':
          result *= numbers[i + 1];
          break;
        case '/':
          result /= numbers[i + 1];
          break;
        default:
          return "Недопустимая операция!";
      }
    }
    return result;
  } catch (error) {
    return "Недопустимое выражение!";
  }
}

clearButton.addEventListener('click', () => {
  model.variable = '';
  model.numbers = [];
  model.operators = [];
  model.result = 0;
  display.value = '';
  displayOutput.value = '';
});

getCalculer(encodeURIComponent('(2+2)*2-(1*1)')).then(data => console.log(data))
