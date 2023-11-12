function Calculator(result) {
  this.value = 0;
  this.stack = 0;
  this.operation = null;
  this.onNumber = v => {
    console.log("this " + JSON.stringify(this));
    if(this.stack || this.stack === 0){
      this.value = this.value * 10 + parseInt(v);
    }else{
      this.stack=this.value;
      this.value=parseInt(v);
    }
    result.textContent = this.value;
  };
  result.textContent = 0;
  this.performOperation = () => {
    if (this.operation && (this.stack || this.stack === 0)) {
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
    console.log("onCommand " + c)
    switch (c) {
      case 'ac':
        this.value = 0;
        this.operation = null;
        this.stack=null;
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        this.performOperation()
        this.operation = c;
        break;
      default:
        break;
    }
    result.textContent = this.value;
  }
}

const calc = new Calculator(document.querySelector(".result"));

document.querySelectorAll(".operand").forEach(i => i.onclick = () => calc.onNumber(i.getAttribute("value")));
document.querySelectorAll(".operation").forEach(i => i.onclick = () => calc.onCommand(i.getAttribute("value")));