function Calculator(result) {
  this.value = 0;
  this.stack = 0;
  this.operation = null;
  this.onNumber = v => {
    console.log("onNumber " + v + " " + JSON.stringify(this));
    if (this.stack !=null) {
      this.value = this.value * 10 + parseInt(v);
    } else {
      this.stack = this.value;
      this.value = parseInt(v);
    }
    result.textContent = this.value;
    console.log("state " + JSON.stringify(this));
  };
  result.textContent = 0;
  this.performOperation = () => {
    if (this.operation && (this.stack !=null)) {
      switch (this.operation) {
        case '+':
          this.value = this.stack + this.value;
          this.stack = null;
          break;
        case '-':
          this.value = this.stack - this.value;
          this.stack = null;
          break;
        case '*':
          this.value = this.stack * this.value;
          this.stack = null;
          break;
        case '/':
          this.value = this.stack / this.value;
          this.stack = null;
          break;

      }
    }
  }
  this.onCommand = c => {
    console.log("onCommand " + c + " " + JSON.stringify(this));
    switch (c) {
      case 'ac':
        this.value = 0;
        this.operation = null;
        this.stack = null;
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        this.performOperation()
        this.operation = c;
        this.stack = null;
        break;
      case '=':
        this.performOperation()
        this.operation = null;
        this.stack = null;
        break;
      default:
        break;
    }
    result.textContent = this.value;
    console.log("state " + JSON.stringify(this));
  }
}

const calc = new Calculator(document.querySelector(".result"));

document.querySelectorAll(".operand").forEach(i => i.onclick = () => calc.onNumber(i.getAttribute("value")));
document.querySelectorAll(".operation").forEach(i => i.onclick = () => calc.onCommand(i.getAttribute("value")));