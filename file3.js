const display = document.getElementById('display');
const history = document.getElementById('history');
let currentInput = '';
let historyList = [];

// Append number to the current input and display
function appendNumber(number) {
    currentInput += number.toString();
    updateDisplay();
}

// Append operator to the current input and display
function appendSymbol(symbol) {
    if (currentInput === '' && (symbol === '+' || symbol === '-' || symbol === '*' || symbol === '/')) {
        return;
    }
    currentInput += symbol;
    updateDisplay();
}

// Update the calculator display
function updateDisplay() {
    display.value = currentInput;
}

// Clear the display
function clearDisplay() {
    currentInput = '';
    display.value = '';
}

// Delete the last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Perform the calculation when "=" is pressed
function calculate() {
    try {
        const result = eval(currentInput);
        addToHistory(`${currentInput} = ${result}`);
        display.value = result;
        currentInput = result.toString();
    } catch {
        display.value = 'Error';
    }
}

// Add the calculation to the history
function addToHistory(entry) {
    historyList.push(entry);
    const historyEntry = document.createElement('div');
    historyEntry.classList.add('history-entry');
    historyEntry.textContent = entry;
    historyEntry.onclick = () => {
        display.value = entry.split(' = ')[0];
        currentInput = entry.split(' = ')[0];
    };
    history.appendChild(historyEntry);
}

// Clear all history
function clearHistory() {
    historyList = [];
    history.innerHTML = '';
}

// Display current time in the calculator
function displayTime() {
    const timeElement = document.getElementById('currentTime');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `Time: ${hours}:${minutes}:${seconds}`;
}

// Update time every second
setInterval(displayTime, 1000);
