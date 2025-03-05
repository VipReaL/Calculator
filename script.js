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

const headingsObserver = new Observable();

let model = new function () {
  this.arr = [];
  this.all = '';
}

digits.forEach(button => {
  button.addEventListener('click', clickDigits);
})

function clickDigits(event) {
  headingsObserver.notify(event.target.value);

  model.all = model.all + event.target.value;
}

mathButtons.forEach(button => {
  button.addEventListener('click', clickMathButton);
})

function clickMathButton(event) {
  if (event.target.value !== "=") {
    headingsObserver.notify(event.target.value);

    model.arr.push(model.all);
    model.all = '';

    if (event.target.value === "x") {
      model.arr.push("*");
    } else {
      model.arr.push(event.target.value);
    }
  } else {
    model.arr.push(model.all);
    model.all = '';

    display.value = eval(model.arr.join(''));
  }
}

function view(arr) {
  display.value += arr
}

headingsObserver.subscribe(view);
