const cell = require("./cell");

class Maze  {

  constructor(dimX, dimY) {
    this.dimX = dimX;
    this.dimY = dimY;
    this.grid = this.blankGrid(dimX, dimY)
  }

  blankGrid(dimX, dimY) {
    const grid = [];

    for (let i = 0; i < dimX; i++) {
      const row = [];
      for (let j = 0; j < dimY; j++) {
        row.push(new Cell(i, j));
      }
      grid.push(row);
    }

    return grid;
  }

  validPosition(coord) {
    return (coord[0] >= 0) && (coord[0] < this.dimX) &&
      (coord[1] >= 0) && (coord[1] < this.dimY);
  }
}

module.exports = Grid;
