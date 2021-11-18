const changeGrid = document.querySelector("#change-grid");
const container = document.querySelector("#container");

changeGrid.addEventListener("click", getGridSize)
container.addEventListener("mouseover", gridListener);

function getGridSize() {
    let size = parseInt(window.prompt("Please enter the new grid size between 1 - 64"));
    if(size >= 1 && size <= 64) {
        createGrid(size);
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

function gridListener(event) {
    if(event.target.classList.contains("square")) {
        let targetBgColor = event.target.style.backgroundColor;
        if(targetBgColor.length != 0) {
            let [r, g, b, a] = targetBgColor.match(/[\d\.]+/g);
            a = a ?? 1;
            if(a != 0) {
                event.target.style.backgroundColor = `rgba(${r}, ${b}, ${g}, ${a - 0.1})`;
            }
        } else {
            event.target.style.backgroundColor = randomColorGenerator();
        }
    }
}

function createGrid(size) {
    container.textContent = "";
    container.setAttribute("style", `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`)
    let totalSquares = size ** 2;
    for(let i = 0; i < totalSquares; i++) {
        let squareElement = document.createElement("div");
        squareElement.className = "square";
        container.appendChild(squareElement);
    }
}

createGrid(16);