// Get elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");

let currentInput = "";

// Add event listeners
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (!value) return; // skip buttons without data-value
        currentInput += value;
        display.value = currentInput;
        console.log("Button clicked:", value, "Current input:", currentInput);
    });
});

// Clear button
clearBtn.addEventListener("click", () => {
    currentInput = "";
    display.value = "";
});

// Equals button
equalsBtn.addEventListener("click", () => {
    try {
        if(currentInput === "") return;
        let result = eval(currentInput); // simple calculation
        display.value = result;
        currentInput = result.toString(); // continue calculation with result
    } catch (error) {
        display.value = "Error";
        currentInput = "";
        console.error("Calculation error:", error);
    }
});
