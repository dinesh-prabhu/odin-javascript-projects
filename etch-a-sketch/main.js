const changeGrid = document.querySelector("#change-grid");
const container = document.querySelector("#container");

changeGrid.addEventListener("click", getGridSize)
container.addEventListener("mouseover", gridListener);

function getGridSize() {
    let size = parseInt(window.prompt("Please enter the new grid size between 1 - 36"));
    if(size >= 1 && size <= 36) {
        createGrid(size);
    } else {
        getGridSize();
    }
}

function gridListener(event) {
    let targetClassList = event.target.classList
    if(targetClassList.contains("square")) {
        targetClassList.add("bg-black");
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