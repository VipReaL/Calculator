let display = document.querySelector('#display');
let digits = document.querySelectorAll('.digits');
let mathButtons = document.querySelectorAll('.mathButtons');
let clearButton = document.querySelector('#clearButton');

class Observable {
  constructor() {
    this.observers = [];
  }
  subscribe(f) {
    this.observers.push(f);
  }
  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }
  notify(data) {
    this.observers.forEach(observer => observer(data));
  }
}

const viewObserver = new Observable();
const viewResultObserver = new Observable();

function view(arr) {
  display.value += arr;
}

function viewResult(arr) {
  display.value = '';
  display.value = arr;
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
});