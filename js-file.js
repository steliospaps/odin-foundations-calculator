function Calculator(result) {
  this.size = 16;
  this.maxVal=Math.pow(10,this.size);
  this.value = 0;
  this.stack = 0;
  this.operation = null;
  this.scale = 0;
  this.scaledValue = () => this.scale ? this.value / this.scale : this.value;
  this.display = () => {
    const val = this.scaledValue();
    //console.log(`display ${val} isNaN(val)=${isNaN(val)} Math.abs(val)=${Math.abs(val)} (10 ^ this.size)=${this.maxVal}`)
    if (isNaN(val) || (Math.abs(val) >this.maxVal)) {
      result.textContent = "E";
      this.value = NaN;
    } else {
      result.textContent = val;
    }

    console.log("state " + JSON.stringify(this));
  }
  this.onNumber = v => {
    console.log("onNumber " + v + " " + JSON.stringify(this));
    if(isNaN(this.value)){
      return;
    }
    if (this.scaledValue().toString().length < this.size) {
      if (this.stack != null) {
        if (this.scale) {
          this.scale *= 10;
        }
        this.value = this.value * 10 + parseInt(v);
      } else {
        this.stack = this.scaledValue();
        this.value = parseInt(v);
        this.scale = 0;
      }
      this.display();
    }
  };
  result.textContent = 0;
  this.performOperation = () => {
    if (this.operation && (this.stack != null)) {
      switch (this.operation) {
        case '+':
          this.value = this.stack + this.scaledValue();
          break;
        case '-':
          this.value = this.stack - this.scaledValue();
          break;
        case '*':
          this.value = this.stack * this.scaledValue();
          break;
        case '/':
          this.value = this.stack / this.scaledValue();
          break;

      }
      this.stack = null;
      this.scale = 0;
    }
  }
  this.onCommand = c => {
    console.log("onCommand " + c + " " + JSON.stringify(this));
    if(isNaN(this.value) && c!='ac'){
      return;
    }
    switch (c) {
      case 'ac':
        this.value = 0;
        this.operation = null;
        this.stack = null;
        this.scale = 0;
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        this.performOperation()
        this.operation = c;
        this.stack = null;
        break;
      case 'pc':
        if (this.operation && this.operation != '/') {
          if (this.operation != '*') {
            this.value *= this.stack;
          }
          this.value /= 100;
          this.performOperation();
          this.operation = null;
          this.stack = null;
        }
        break;
      case '=':
        this.performOperation()
        this.operation = null;
        this.stack = null;
        break;
      case 'sign':
        this.value *= -1;
        break;
      case 'del':
        if (this.stack != null) {
          this.value = (this.value - this.value % 10) / 10;
          this.scale /= 10;
          if (this.scale < 1) {
            this.scale = 0;
          }
        } else {
          this.value = 0;
        }
        break;
      case '.':
        if (this.scale === 0) {
          if (this.stack == null) {
            this.onNumber("0");
          }
          this.scale = 1;
        } else if (this.scale === 1) {
          this.scale = 0;
        }
      default:
        break;
    }
    this.display();
  }
}

const calc = new Calculator(document.querySelector(".result"));

document.querySelectorAll(".operand").forEach(i => i.onclick = () => calc.onNumber(i.getAttribute("value")));
document.querySelectorAll(".operation").forEach(i => i.onclick = () => calc.onCommand(i.getAttribute("value")));