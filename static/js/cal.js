/* ===== BASIC CALCULATOR ===== */
let display = document.getElementById("calc-display");

function add(value){
    display.value += value;
}

function clearCalc(){
    display.value = "";
}

function removeOne() {
    display.value = display.value.slice(0, -1);
}

function calculate(){
    try{
        display.value = eval(display.value);
    }catch{
        display.value = "Error";
    }
}

/* ===== INTEREST RATE CALCULATOR ===== */
const amount = document.getElementById("amount");
const rate = document.getElementById("rate");
const time = document.getElementById("time");

const amountVal = document.getElementById("amountVal");
const rateVal = document.getElementById("rateVal");
const timeVal = document.getElementById("timeVal");
const totalAmount = document.getElementById("totalAmount");

function calculateInterest(){
    let P = parseFloat(amount.value);
    let R = parseFloat(rate.value);
    let T = parseFloat(time.value);

    // Simple Fixed Deposit formula
    let total = P * Math.pow((1 + R / 100), T);
    totalAmount.innerText = total.toFixed(2);

    amountVal.innerText = P;
    rateVal.innerText = R;
    timeVal.innerText = T;
}

amount.addEventListener("input", calculateInterest);
rate.addEventListener("input", calculateInterest);
time.addEventListener("input", calculateInterest);

// Initial calculation
calculateInterest();

/* ===== KEYBOARD & NUMPAD SUPPORT ===== */
document.addEventListener("keydown", function (e) {

    // Numbers (top row + numpad)
    if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
        display.value += e.key;
    }

    // Operators
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
        display.value += e.key;
    }

    // Enter or Numpad Enter → Calculate
    if (e.key === "Enter") {
        e.preventDefault();
        calculate();
    }

    // Backspace → Remove last character
    if (e.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    // Escape → Clear
    if (e.key === "Escape") {
        clearCalc();
    }
});
