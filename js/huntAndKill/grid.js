const cell = require("./cell");

class Grid  {

  constructor(dimX, dimY) {
    this.dimX = dimX;
    this.dimY = dimY;
  }

  static blankGrid(dimX, dimY) {
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

  render() {
    const grid = Board.blankGrid(this.dimX, this.dimY);

    const rowStrs = [];
    grid.map( row => row.join("") ).join("\n");
  }

  validPosition(coord) {
    return (coord[0] >= 0) && (coord[0] < this.dimX) &&
      (coord[1] >= 0) && (coord[1] < this.dimY);
  }
}

module.exports = Grid;
