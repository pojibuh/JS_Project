class Generator {

  constructor(grid) {
    this.grid = grid;
    this.currentCell = grid[randomize(grid.dimX)][randomize(grid.dimY)];
    this.currentCell.visit();
    this.run();
  }

  pickDirection() {
    let guess = randomize(4);
    switch(guess) {
      case 0:
        return this.currentCell.N;
      case 1:
        return this.currentCell.E;
      case 2:
        return this.currentCell.W;
      case 3:
        return this.currentCell.S;
    }
  }

  randomize(num) {
    return Math.floor(Math.random() * num)
  }

  getNeighbors() {
    let neighbors = [];
    let n = this.grid[this.currentCell.N[0]][this.currentCell.N[1]];
    let w = this.grid[this.currentCell.W[0]][this.currentCell.W[1]];
    let e = this.grid[this.currentCell.E[0]][this.currentCell.E[1]];
    let s = this.grid[this.currentCell.S[0]][this.currentCell.S[1]];

    [n, e, w, s].forEach((direction) => {
      if (this.grid.validPosition(direction)) {
        neighbors.push(direction);
      }
    })

    return neighbors;
  }

  hunt(grid) {

  }

  kill(grid) {
    let nextCellCoords = this.pickDirection();
    while(!validPosition(nextCellCoords)) {
      nextCellCoords = this.pickDirection();
    }
    this.currentCell = grid[nextCellCoords[0]][nextCellCoords[1]];
    let neighbors = this.getNeighbors();
    let unvisited = [];
    neighbors.forEach((neighbor) => {
      if(neighbor.visited === false) {
        unvisited.push(neighbor);
      }
    })

  }

  run() {
    while() {
      let kill = kill(this.grid);
      let hunt;
      if (kill === null) {
        let hunt = hunt(this.grid)
      }
      else if (kill === null && hunt === null) {
        break;
      }
    }
  }
}
