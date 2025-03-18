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

export { signOperations }
