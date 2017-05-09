const cell = require("./cell");

class Maze  {

  constructor(dimX, dimY) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.grid = this.blankGrid(dimX, dimY)
  }

  blankGrid(dimX, dimY) {
    const grid = [];
    let swag = document.getElementById("swag");
    let rowUl;
    let rowLi;

    for (let i = 0; i < dimX; i++) {
      const row = [];
      rowUl = document.createElement("ul");
      for (let j = 0; j < dimY; j++) {
        rowLi = document.createElement("li");
        rowLi.className = "unvisited"
        row.push(new Cell(i, j, rowLi));
        rowUl.appendChild(rowLi);
      }
      grid.push(row);
      swag.appendChild(rowUl);
    }

    return grid;
  }

  validPosition(coord) {
    return (coord[0] >= 0) && (coord[0] < this.dimX) &&
      (coord[1] >= 0) && (coord[1] < this.dimY);
  }
}

module.exports = Maze;
