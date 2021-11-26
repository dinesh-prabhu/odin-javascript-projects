let input1, input2, currentOperator;

const displayView = document.querySelector(".display-view");
const keyContainer = document.querySelector("#keys-container");
const decimalKey = document.querySelector("#decimal-key");

keyContainer.addEventListener("click", buttonActionHandler);

clearInputValues();

function getDisplayValue() {
    return currentOperator ? input2 : input1;
}
function setDisplayValue(value) {
    if(currentOperator) {
        input2 = value;
    } else {
        input1 = value;
    }
}
function clearInputValues() {
    input1 = "0";
    input2 = currentOperator = null;
}
function addToDisplayView(content) {
    setDisplayValue(content);
    displayView.textContent = content;
}
function clearDisplayView() {
    clearInputValues();
    addToDisplayView(input1);
}
function deleteFromView() {
    let displayContent = getDisplayValue() ?? "0";
    if (displayContent !== "0") {
        let newValue = displayContent.slice(0, -1) || "0";
        addToDisplayView(newValue);
    }
}
function handleConversion(keyValue) {
    if(keyValue === "%") {
        addToDisplayView((getDisplayValue() / 100).toString());
    } else if(keyValue === "+/-") {
        addToDisplayView((getDisplayValue() * -1).toString());
    } else if(keyValue === "=" && currentOperator !== null) {
        operate();
    } else if(keyValue === ".") {
        addToDisplayView((getDisplayValue() ?? 0) + ".");
    }
}
function handleOperation(operator) {
    debugger;
    if(currentOperator !== null) {
        operate();
    }
    currentOperator = operator;
}
function operate() {
    let num1 = Number(input1),
        num2 = Number(input2 ?? input1),
        result;
    switch(currentOperator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "×":
            result = num1 * num2;
            break;
        case "÷":
            if(num2 == 0) {
                return alert("Can't divide by 0!");
            }
            result = num1 / num2;
            break;
        default:
            result = null;
    }
    clearInputValues();
    addToDisplayView(result.toString());
}
function isDecimal(number) {
    return number.toString().includes(".");
}
function handleNumberInput(content) {
    let value = getDisplayValue() || "";
    addToDisplayView((value === "0") ? content : value + content);
}

function buttonActionHandler(event) {
    let actionType = event.target.getAttribute("data-type");
    let content = event.target.textContent;
    switch(actionType) {
        case "number":
            handleNumberInput(content);
            break;
        case "operator":
            handleOperation(content);
            break;
        case "clear":
            clearDisplayView();
            break;
        case "delete":
            deleteFromView();
            break;
        case "converter":
            handleConversion(content);
            break;
    }
    decimalKey.disabled = isDecimal(getDisplayValue() ?? "0");
}