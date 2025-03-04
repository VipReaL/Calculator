let display = document.querySelector('#display');
let digits = document.querySelectorAll('.digits');
let mathButtons = document.querySelectorAll('.mathButtons');
let equalsButton = document.querySelector('.equalsButton');
let clearButton = document.querySelector('#clearButton');


let model = new function () {
  this.arr = [];
  this.all = '';
}

digits.forEach(button => {
  button.addEventListener('click', clickDigits);
})

function clickDigits(event) {
  display.value += event.target.value; // FIXME: del
  model.all = model.all + event.target.value;
}

mathButtons.forEach(button => {
  button.addEventListener('click', clickMathButton);
})

function clickMathButton(event) {
  display.value += event.target.value; // FIXME: del
  model.arr.push(model.all)
  model.arr.push(event.target.value)
}

function view (arr) {

  // arr.forEach(item => {

  //   console.log(item)

  // })

}

view(model.arr);

/*
let i = [];

let j = '';

let k = [];

clearButton.addEventListener('click', () => {
  display.value = '';
  i = [];
  j = '';
  k = [];
});

digits.forEach(digit_btn => {
  digit_btn.addEventListener('click', addDisplay);
})

function addDisplay(event) {
  display.value += event.target.value;

  if (j) {
    k.push(Number(event.target.value));
  } else {
    i.push(Number(event.target.value));
  }

}

mathButtons.forEach(math_btn => {
  math_btn.addEventListener('click', addMath);
})

function addMath(event) {
  j = event.target.value;
  display.value += event.target.value;
}



equalsButton.addEventListener('click', equal);

function equal() {

  switch (j) {
    case "+":
      display.value = Number(i.join('')) + Number(k.join(''));
      break;
    case "-":
      display.value = Number(i.join('')) - Number(k.join(''));
      break;
    case "x":
      display.value = Number(i.join('')) * Number(k.join(''));
      break;
    case "/":
      display.value = Number(i.join('')) / Number(k.join(''));
      break;
  }

}
*/