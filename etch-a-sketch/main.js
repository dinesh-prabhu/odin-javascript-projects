const changeGrid = document.querySelector("#change-grid");
const resetGrid = document.querySelector("#reset-grid");
const container = document.querySelector("#container");
let currentGridSize;

changeGrid.addEventListener("click", getGridSize);
resetGrid.addEventListener("click", createGrid);
container.addEventListener("mouseover", gridListener);

function getGridSize() {
    let size = parseInt(window.prompt("Please enter the new grid size between 1 - 64"));
    if(size >= 1 && size <= 64) {
        changeGridSize(size);
    } else {
        getGridSize();
    }
}

function randomColorGenerator() {
    let rgb = [];
    for(let i = 0; i < 3; i++) {
       rgb.push(Math.floor(Math.random() * 255));
    };
    return `rgb(${rgb.toString()})`;
}

function changeGridSize(size) {
    currentGridSize = size;
    createGrid();
}

function gridListener(event) {
    if(event.target.classList.contains("square")) {
        let targetBgColor = event.target.style.backgroundColor;
        if(targetBgColor.length != 0) {
            let [r, g, b, a] = targetBgColor.match(/[\d\.]+/g);
            a = a ?? 1;
            if(a != 0) {
                event.target.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${a - 0.1})`;
            }
        } else {
            event.target.style.backgroundColor = randomColorGenerator();
        }
    }
}

function createGrid() {
    container.textContent = "";
    container.setAttribute("style", `grid-template-columns: repeat(${currentGridSize}, 1fr); grid-template-rows: repeat(${currentGridSize}, 1fr);`);
    let totalSquares = currentGridSize ** 2;
    for(let i = 0; i < totalSquares; i++) {
        let squareElement = document.createElement("div");
        squareElement.className = "square";
        container.appendChild(squareElement);
    }
}

changeGridSize(16);