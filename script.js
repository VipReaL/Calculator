import { getCalculator } from "./modules/api.mjs";
import { Observable } from "./modules/observable.mjs"
import { signOperations } from "./modules/utilities.mjs";
import { initTheme } from "./modules/themeButtons.mjs";

// const themeButtons = document.querySelectorAll('.header__theme-menu-button');
const form = document.querySelector('.form');
const display = form.querySelector('#display');
const displayOutput = form.querySelector('#displayOutput');
// const brackets = form.querySelector('.bracket');
// const digits = document.querySelectorAll('.digits');
// const mathButtons = document.querySelectorAll('.mathButtons');
// const clearButton = document.querySelector('#clearButton');

const viewObserver = new Observable();
const viewResultObserver = new Observable();

initTheme();

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

  if (event.target.classList.contains('bracket')) {
    model.dataForCalculation.push(event.target.value);
    viewObserver.notify(model.dataForCalculation.join(''));
  }

  if (event.target.classList.contains('btn_equally')) {
    getCalculator(encodeURIComponent(model.dataForCalculation.join('')))
      .then(data => {
        model.result = data;
        model.dataForCalculation = [];
        model.dataForCalculation.push(String(data));
        viewResultObserver.notify(model.result);

        console.log('btn_equally ', model);
      })
  }

  if (event.target.classList.contains('btn_del')) {
    model.dataForCalculation.pop();
    viewObserver.notify(model.dataForCalculation.join(''));
  }

  if (event.target.classList.contains('clearButton')) {
    model.dataForCalculation = [];
    model.result = 0;
    viewObserver.notify(model.dataForCalculation.join(''));
    viewResultObserver.notify(model.result)

    console.log('clearButton ', model);
  }
}
